-- Generated from pinned Better Auth 1.7.12 schema. Isolated dummy staging only.
BEGIN;
CREATE TABLE "user" (
 id text PRIMARY KEY,
 "name" text NOT NULL,
 "email" text NOT NULL UNIQUE,
 "emailVerified" boolean NOT NULL DEFAULT false,
 "image" text,
 "createdAt" timestamptz NOT NULL,
 "updatedAt" timestamptz NOT NULL,
 "twoFactorEnabled" boolean DEFAULT false
);
REVOKE ALL ON "user" FROM PUBLIC;
CREATE TABLE "session" (
 id text PRIMARY KEY,
 "expiresAt" timestamptz NOT NULL,
 "token" text NOT NULL UNIQUE,
 "createdAt" timestamptz NOT NULL,
 "updatedAt" timestamptz NOT NULL,
 "ipAddress" text,
 "userAgent" text,
 "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);
CREATE INDEX "session_userId_idx" ON "session"("userId");
REVOKE ALL ON "session" FROM PUBLIC;
CREATE TABLE "account" (
 id text PRIMARY KEY,
 "accountId" text NOT NULL,
 "providerId" text NOT NULL,
 "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
 "accessToken" text,
 "refreshToken" text,
 "idToken" text,
 "accessTokenExpiresAt" timestamptz,
 "refreshTokenExpiresAt" timestamptz,
 "scope" text,
 "password" text,
 "createdAt" timestamptz NOT NULL,
 "updatedAt" timestamptz NOT NULL
);
CREATE INDEX "account_userId_idx" ON "account"("userId");
REVOKE ALL ON "account" FROM PUBLIC;
CREATE TABLE "verification" (
 id text PRIMARY KEY,
 "identifier" text NOT NULL,
 "value" text NOT NULL,
 "expiresAt" timestamptz NOT NULL,
 "createdAt" timestamptz NOT NULL,
 "updatedAt" timestamptz NOT NULL
);
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");
REVOKE ALL ON "verification" FROM PUBLIC;
CREATE TABLE "twoFactor" (
 id text PRIMARY KEY,
 "secret" text NOT NULL,
 "backupCodes" text NOT NULL,
 "userId" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
 "verified" boolean DEFAULT true,
 "failedVerificationCount" integer DEFAULT 0,
 "lockedUntil" timestamptz
);
CREATE INDEX "twoFactor_secret_idx" ON "twoFactor"("secret");
CREATE INDEX "twoFactor_userId_idx" ON "twoFactor"("userId");
REVOKE ALL ON "twoFactor" FROM PUBLIC;
CREATE TABLE "rateLimit" (
 id text PRIMARY KEY,
 "key" text NOT NULL UNIQUE,
 "count" integer NOT NULL,
 "lastRequest" bigint NOT NULL
);
REVOKE ALL ON "rateLimit" FROM PUBLIC;
COMMIT;
