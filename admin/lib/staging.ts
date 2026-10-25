export function stagingAllowed(env: NodeJS.ProcessEnv = process.env) {
  try { return env.ADMIN_STAGING_ENABLED === "true" && env.ADMIN_DATA_CLASSIFICATION === "synthetic"
    && env.VERCEL_ENV !== "production" && !!env.ADMIN_DATABASE_URL
    && !!env.BETTER_AUTH_SECRET && env.BETTER_AUTH_SECRET.length >= 32
    && !!env.ADMIN_AUTH_ORIGIN && new URL(env.ADMIN_AUTH_ORIGIN).protocol === "https:";
  } catch {return false;}
}
