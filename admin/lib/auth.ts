import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";
import { database } from "./db";
import { PostgresDialect } from "kysely";
import type { Pool } from "pg";

let instance: ReturnType<typeof createAuth> | undefined;
export function createAuth(pool: Pool = database()) {
  return betterAuth({
    appName: "BloomShield CIC",
    baseURL: process.env.ADMIN_AUTH_ORIGIN!,
    secret: process.env.BETTER_AUTH_SECRET!,
    database: { dialect: new PostgresDialect({pool}), type:"postgres", transaction:true },
    trustedOrigins: [process.env.ADMIN_AUTH_ORIGIN!],
    emailAndPassword: {
      enabled: true, disableSignUp: true, minPasswordLength: 15, maxPasswordLength: 128,
      autoSignIn: false, resetPasswordTokenExpiresIn: 1800,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, url }) => {
        // Staging mail can only reach explicitly approved dummy test mailboxes.
        const recipients = (process.env.ADMIN_TEST_EMAILS ?? "").split(",").map(s => s.trim().toLowerCase());
        if (!recipients.includes(user.email.toLowerCase())) throw new Error("Recipient unavailable");
        if (!process.env.ADMIN_RESEND_API_KEY || !process.env.ADMIN_MAIL_FROM) throw new Error("Mail unavailable");
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST", headers: { Authorization: `Bearer ${process.env.ADMIN_RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from: process.env.ADMIN_MAIL_FROM, to: [user.email], subject: "BloomShield dashboard password setup / reset", text: `Set your password using this single-use link within 30 minutes:\n${url}\nIf you did not request access, ignore this email.` }),
        });
        if (!response.ok) throw new Error("Mail unavailable");
      },
    },
    session: { expiresIn: 60 * 60 * 8, updateAge: 60 * 15, cookieCache: { enabled: false } },
    advanced: { useSecureCookies: true, defaultCookieAttributes: { httpOnly: true, secure: true, sameSite: "lax" } },
    rateLimit: { enabled: true, storage: "database", window: 60, max: 30,
      customRules: { "/sign-in/email": { window: 900, max: 5 }, "/request-password-reset": { window: 900, max: 3 }, "/reset-password": { window: 900, max: 5 }, "/two-factor/*": { window: 900, max: 5 } } },
    plugins: [twoFactor({ issuer: "BloomShield CIC" })],
    databaseHooks: { user: { update: { after: async user => {
      if(user.twoFactorEnabled) {
        // Retire every password-only session created before MFA enrollment.
        // The plugin creates a fresh session after verifying the enrollment code.
        await pool.query('DELETE FROM session WHERE "userId"=$1',[user.id]);
        await pool.query("INSERT INTO admin_audit(actor,action,fields) VALUES($1,'mfa.enrolled','[]')",[user.id]);
      }
    } } }, session: {
      create: { after: async session => { await pool.query("INSERT INTO admin_audit(actor,action,fields) VALUES($1,'session.create','[]')",[session.userId]); } },
      delete: { after: async session => { await pool.query("INSERT INTO admin_audit(actor,action,fields) VALUES($1,'session.revoke','[]')",[session.userId]); } },
    } },
    // Never log library request context: it may contain tokens or credentials.
    logger: { disabled: true },
  });
}
export function authentication() { return instance ??= createAuth(); }
