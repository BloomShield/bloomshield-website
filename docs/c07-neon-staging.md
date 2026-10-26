# Neon staging integration — 26 October 2026

PASS — actual Neon staging database integration. After operator authentication, API and TLS SQL independently verified `bloomshield-app001b-staging`, project `long-bar-21726499`, organisation `org-jolly-moon-22982519`, London `aws-eu-west-2`, PostgreSQL 18, database `neondb`, branch `br-hidden-violet-zaboc8g7` named `production`. That name is synthetic staging only. Schema inspection found zero application objects/functions before migrations. No production deployment was authorised or performed.

## Applied migration register and runtime arrangement

All file SHA-256 values matched the reviewed identities in c07-database.md immediately before execution. Connection principal was neondb_owner, with its connection string held only in memory. Each existing file committed separately:

| Migration | Commit time UTC, 26 October 2026 |
| --- | --- |
| 001_vcse_eoi.sql | 03:25:15.108 |
| 002_vcse_international_interest.sql | 03:25:15.135 |
| 003_vcse_declaration_audit.sql | 03:25:15.159 |
| 004_vcse_structured_answers.sql | 03:25:15.183 |
| 005_admin_auth.sql | 03:25:15.262 |
| 006_admin_management.sql | 03:25:15.328 |
| 007_admin_grants.psql | 03:25:15.655 |

007's unchanged BEGIN-through-COMMIT SQL body was executed through pg with its quoted psql role variable resolved to `bloomshield_admin_staging`. Native psql was unavailable. No unreviewed schema migration was introduced. Execution agent: Codex under operator-authorised browser-authenticated account, using the verified staging owner solely for setup/inspection and isolated failure injection.

SQL-created LOGIN roles `bloomshield_intake_staging` and `bloomshield_admin_staging` have no superuser, CREATEDB, CREATEROLE, replication, BYPASSRLS, inherited owner membership, application-object ownership or schema CREATE rights. PUBLIC schema CREATE was revoked. Intake has source SELECT/INSERT and only fingerprint UPDATE for existing deduplication; delivery/rate/event permissions follow the existing code. Admin grants are exactly 007. Passwords are independent random 256-bit values, stored only in ignored local root/admin .env.local files with the existing expected variable names. Owner credentials were not saved. No application/auth code was changed or weakened.

Root OPEN/LISTED remain false; admin staging enable remains false. Authentication secret/origins/mail settings are still unconfigured for deployment. The DB integration test uses temporary process-only synthetic auth configuration, real Better Auth login, and the existing application database/authentication factories without replacement. Each fixture reviewer is disabled and sessions removed after the test. The two successful runs retained four fictional EOI records, their management/audit evidence and eight suppressed outbox jobs as synthetic acceptance evidence. No real emails were sent.

The scripts are a lean alternative to Neon init/deploy, with no new package dependencies:

```powershell
# C07_NEON_CLI is the local path to the installed neon/dist/cli.js, not a secret.
node scripts/c07-neon.cjs
# ONLY for another verified fresh empty target matching the fixed approved inventory:
# node scripts/c07-neon-setup.cjs --apply-empty-staging
$env:C07_RUN_LIVE='long-bar-21726499'
node --test tests/c07-neon-integration.cjs
```

Do not rerun setup here: it refuses existing local configuration, objects or runtime roles. It is intentionally not an incremental migration runner. On partial failure inspect committed-file output before any manual recovery; never delete objects or overwrite credentials to force a rerun. Live test requires this exact target, generates new fictional records, and temporarily removes/restores admin audit INSERT to verify rollback. Run it only when staging apps are closed and no other acceptance job is running. Keep the seven reviewed migrations unchanged.

## Historical operator resume procedure

The authentication/migration commands below document the earlier blocked state. Authentication and migration are now complete; do not execute these migration commands again against this database. Next operator work is protected Vercel/Resend configuration and authorised dummy administrator bootstrap, subject to the existing C07 gates. GitHub authentication is still needed to publish these local changes.

## Resume at the authentication boundary

Run these commands in the C07 worktree, in a trusted operator terminal. Complete browser authentication privately. Do not paste credentials or connection strings into chat.

```powershell
npx --yes neon@latest auth
npx --yes neon@latest projects get long-bar-21726499 --output json
npx --yes neon@latest branches list --project-id long-bar-21726499 --output json
```

Verify returned project name, organisation, region, default branch ID and endpoint against the target above. Stop on mismatch. Do not enumerate unrelated projects or access APP-001A. These commands perform authentication/metadata inspection only; they do not apply migrations.

Using the verified endpoint and the owner's protected PostgreSQL connection configuration (TLS certificate verification enabled), run the following read-only inspection with psql. A native psql client was not found on this workstation; use an approved PostgreSQL client installation/operator terminal for the commands below. Migration 007 uses psql metacommands, so do not feed it unchanged to a generic SQL client. Never put a URI/password in a command argument or retained output. `PGSERVICE` may identify a privately configured service; `PGPASSFILE` may identify its protected password file.

```sql
SELECT current_database(), current_user, session_user;
SELECT nspname FROM pg_namespace
 WHERE nspname NOT LIKE 'pg_%' AND nspname <> 'information_schema';
SELECT n.nspname, c.relname, c.relkind
 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
 WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema'
 ORDER BY 1,2;
SELECT n.nspname, p.proname FROM pg_proc p
 JOIN pg_namespace n ON n.oid=p.pronamespace
 WHERE n.nspname NOT LIKE 'pg_%' AND n.nspname <> 'information_schema';
SELECT rolname, rolsuper, rolcreatedb, rolcreaterole, rolreplication, rolbypassrls
 FROM pg_roles WHERE rolname=current_user;
```

Confirm `neondb`, approved owner, endpoint-to-project/branch mapping, empty application schema, and absence of unexpected application objects/data before any write. Do not query source rows in an unexpected database. Record redacted identity evidence and migration SHA-256 hashes. Follow c07-database.md for role setup and grants before accepting runtime use.

Once identity/emptiness and ownership are verified, the existing migration commands are:

```powershell
# PGSERVICE identifies the verified owner connection; no runtime uses this identity.
psql -X -v ON_ERROR_STOP=1 -f docs/migrations/001_vcse_eoi.sql
psql -X -v ON_ERROR_STOP=1 -f docs/migrations/002_vcse_international_interest.sql
psql -X -v ON_ERROR_STOP=1 -f docs/migrations/003_vcse_declaration_audit.sql
psql -X -v ON_ERROR_STOP=1 -f docs/migrations/004_vcse_structured_answers.sql
psql -X -v ON_ERROR_STOP=1 -f docs/migrations/005_admin_auth.sql
psql -X -v ON_ERROR_STOP=1 -f docs/migrations/006_admin_management.sql
# Create the restricted SQL runtime roles before applying 007.
psql -X -v ON_ERROR_STOP=1 -v admin_runtime_role=bloomshield_admin_staging -f docs/migrations/007_admin_grants.psql
```

Execute one at a time and stop on the first failure. Each file contains its own transaction. Do not blindly retry 005/006 or claim that all files ran atomically together. Record each successful transaction separately. No new migration or auth schema is needed.

Apply the reviewed public writer grants in vcse-eoi-handover.md to a separate SQL-created intake role. Verify neither runtime owns database/schema/objects, inherits privileged membership, nor has schema CREATE permission (including via PUBLIC). Revoke PUBLIC CREATE on public if present in this isolated database. Connect independently with each runtime credential and execute the live permission matrix in c07-database.md. Verify UK/international persistence through the existing intake and admin DAL with fictional data and stubbed mail before accepting connectivity.

Only after verification, store the intake URI as `VCSE_EOI_DATABASE_URL` in ignored root `.env.local` and the separate admin URI as `ADMIN_DATABASE_URL` in ignored `admin/.env.local`, or approved Vercel Preview secret settings. Existing example files already declare both names. No credentials were written in this attempt. Keep production `VCSE_EOI_OPEN=false` and `VCSE_EOI_LISTED=false`; remote values remain unverified.

## Generated workflow decision

Do not run `neon init`, `neon deploy`, `neon checkout`, or `neon env pull` for this integration. Init installs agent tooling and writes project/config files. Deploy applies Neon service configuration and may refresh environment files. The existing two Next.js apps already use explicit database variables and self-hosted Better Auth 1.7.12. Direct PostgreSQL migrations and two restricted runtime connections are sufficient. No Neon Auth, Data API, Entra, additional service, account or subscription is needed.

Provider references: [init](https://github.com/neondatabase/website/blob/main/content/docs/cli/init.md), [Neon configuration/deploy](https://neon.com/blog/introducing-neon-ts), [SQL-created restricted roles](https://github.com/neondatabase/website/blob/main/content/docs/manage/roles.md).

GitHub authentication also needs operator repair (`gh auth login -h github.com`) before a remote PR update. No PR was merged, deployment activated, real mail sent or production setting changed.
