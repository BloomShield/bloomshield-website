# APP-001B-C06 — authentication decision and operational handover

25 October 2026. Development and isolated dummy staging only. The email/password correction supersedes C05/C06 recommendations for Microsoft Entra/OIDC. No Entra, Microsoft tenancy, social sign-in, SSO or enterprise onboarding is used.

## Decision, costs and limitations

Use **Better Auth 1.7.12**, its PostgreSQL/Kysely adapter and built-in two-factor plugin. It fits the existing Next.js/Vercel/Neon application and avoids another managed identity service. Better Auth is MIT licensed, with no library licence fee or per-user charge. Hosting, Neon storage/compute, Resend mail and any Vercel protection plan remain subject to the organisation's existing plans and usage; no paid service or subscription was provisioned. See [library source/licence](https://github.com/better-auth/better-auth), [email/password](https://better-auth.com/docs/authentication/email-password), [MFA](https://better-auth.com/docs/plugins/2fa), [session management](https://better-auth.com/docs/concepts/session-management) and [options](https://better-auth.com/docs/reference/options).

Trade-off: BloomShield operates authentication data, backups, patching, email delivery and recovery. There is no managed-provider SLA. Administrator TOTP and one-use backup codes are supported without a paid MFA add-on. Administrators cannot access records, reports, staff APIs or audit until MFA is enrolled. Password-only sessions may access the account-enrollment screen, which contains no applicant records. MFA disable and alternate sign-in endpoints are not exposed. Lost authenticator plus lost backup codes require an identity-verified, audited operator recovery procedure; agree its owner before launch. Password reset does not remove MFA.

## Implementation

Separate `admin/` Next application and branding retained. Default runtime is closed. Only explicit dummy staging with an HTTPS origin, independent database URL and strong secret can enable the persistent application. Vercel production is always denied. Local synthetic preview remains visibly separate and cannot run in production/Vercel. No cloud deployment or domain change was made.

Email/password public signup is disabled in the library and omitted from the route allowlist. An MFA-authenticated administrator invites an individual account in `/staff`. The server creates a randomly generated, unknowable initial password using Better Auth's password hashing and sends a 30-minute single-use password setup link through its reset flow. No password is communicated by administrators or stored in plaintext. Reset revokes existing sessions transactionally. Reset and invitations can only send to `ADMIN_TEST_EMAILS` in staging. Mail failures leave an inaccessible account; request a fresh reset after fixing delivery.

Secure, HttpOnly, SameSite=Lax cookies contain server-verified sessions. Cookie caching is disabled. Every application API rechecks current active staff grants. Sessions have an eight-hour absolute lifetime and a separate 30-minute idle clock; offboarding and role changes revoke sessions in the same transaction as the access change and audit. Logout uses the library revocation flow. Better Auth applies database-backed IP limits. Login and reset additionally use atomic, HMAC-keyed account counters (5 login / 3 reset requests per 15 minutes), including unknown email addresses. The frontend displays generic failures. Same-origin checks and library CSRF/origin checks protect mutations; only the configured HTTPS origin is trusted.

Records are scoped in SQL before leaving the server. Reviewers receive only explicit UUID assignments, and cannot reassign, select or reverse a final selection. Browser roles never grant access. Search, overview and reports operate on that server-authorised result set. Source answers/declarations remain in `vcse_eoi`; management is separate and keyed to its UUID. An additive owner-controlled trigger initializes management when a new EOI arrives, including either enquiry route. Delivery status and chronological field-only audit are read separately. Management updates lock the row, compare a version and atomically append audit, rolling back on any failure. Unknown/unassigned UUIDs return the same denial. No export endpoint exists.

Audit stores stable user IDs, action, timestamp, record UUID and changed field names; it excludes passwords, tokens, emails and applicant/note values. Session create/revoke events carry actor IDs; failed/pending auth attempts carry endpoint/status only. Runtime grants forbid audit UPDATE/DELETE/TRUNCATE; a trigger also prevents UPDATE/DELETE. Schema owners remain trusted operators and must not be the runtime role. Neither request bodies nor library errors are logged.

## Preflight evidence and migration order

PR #7 head: `2707bff851f808981a368838b852179a4db93123`. PR #8 head: `c9fd20c53fc2708b137b3cfa22065418b2f71cad`. Both were open/draft; PR #8 retains PR #7 as base. C06 branches from that latest PR #8 head. Existing unrelated public editorial edits were excluded from C06.

No configured `ADMIN_*`, `BETTER_AUTH_*`, `VERCEL_*`, `NEON_*` or `RESEND_*` process variables were found. Only the example environment file was present. No connected Vercel/Neon provisioning tools were available. No secrets, live applicant data or cloud database were read. Consequently migration status, grants, project ownership, branch isolation, domain and regions remain **BLOCKED** for external staging.

Before applying anything, an operator must verify the Neon project/branch/database hostname is an independent dummy-only environment, inspect migration status 001–004, confirm no real EOIs are present, take an appropriate snapshot and record the chosen region/runtime role. Never use the public intake writer or production URL as admin credentials.

Apply as staging schema owner, in order: existing 001–004 only if needed, `005_admin_auth.sql`, `006_admin_management.sql`, then `007_admin_grants.psql` with an existing **non-owner** `admin_runtime_role`. 005 is generated from the pinned Better Auth schema (`node scripts/generate-admin-auth-schema.mjs`); review diffs when upgrading. New migrations are intentionally one-time, fail-on-conflict scripts, not silently repeatable migrations. Do not apply to production. The grants file does not create roles or passwords. Verify the runtime cannot UPDATE/DELETE/INSERT source EOIs or change/truncate audit and does not inherit owner/writer privileges. The public writer must receive no SELECT/grants on staff, sessions or management. Confirm the source-insert trigger works under the public staging writer. Database grants must be verified in real Neon before acceptance.

## Required operator configuration

1. Verify a separate **private** admin Vercel project rooted at `admin/`, with repository-root dependency installation/lockfile, external shared definitions, independent preview secrets, preview access protection and region. Do not deploy without approval. Verify ownership of the eventual target `admin.bloomshield.org`; make no DNS or production changes in C06.
2. Copy `admin/.env.example` names into the isolated admin preview environment. Set `ADMIN_STAGING_ENABLED=true`, `ADMIN_DATA_CLASSIFICATION=synthetic`, isolated non-owner `ADMIN_DATABASE_URL`, exact HTTPS `ADMIN_AUTH_ORIGIN`, a freshly generated random `BETTER_AUTH_SECRET` of at least 32 characters, a staging-only Resend key/from address and explicit comma-separated dummy `ADMIN_TEST_EMAILS`. Never commit secret values. Same-origin cookies do not need a public domain setting or OAuth callback registration.
3. Apply/verify staging migrations and grants. Keep owner credentials out of Vercel runtime. Use a dedicated Neon pooled endpoint, verify TLS, and keep pool size small (3 per warm instance). Confirm Vercel runtime/region connectivity and capacity before load testing. Development uses Node 24; verify the hosting runtime supports the lockfile dependencies.
4. In a trusted operator shell with those staging variables, set `ADMIN_BOOTSTRAP_EMAIL` to one approved dummy mailbox and run `node scripts/bootstrap-admin.cjs`. This CLI refuses to create another bootstrap administrator if one exists. It is not a public route. Receive the email, set an individual password (15–128 characters), sign in, enroll TOTP and privately save backup codes. Then invite reviewers at `/staff` and assign records by staff UUID. Do not send shared credentials or test passwords to real users.
5. Configure the **separate protected public staging** intake with its existing staging variables, test sender/recipient accounts and signing/retry/webhook secrets. Production remains `VCSE_EOI_OPEN=false` and `VCSE_EOI_LISTED=false`. No real applicant mailbox or data may enter staging.
6. Run the external acceptance checklist below and retain redacted evidence. Do not equate embedded PostgreSQL transport tests with real Neon, Vercel or Resend verification.

## Acceptance and GO/NO-GO

**NO-GO for production and real applicant data.** Configuration and policy approval are still required. All external checks below are **BLOCKED**, not PASSED:

- Protected public staging UK and international dummy submission, authoritative versions/declarations and Neon persistence.
- Actual applicant/team/reset/invitation email delivery, signed delivery callbacks, retry scheduling and duplicate receipt handling against isolated mailboxes.
- Real HTTPS admin cookie behaviour, password setup/reset, TOTP, logout/re-login persistence, idle/absolute expiry and offboarding.
- Reviewer assignment, direct UUID denial, filtered counts/reports, final-selection restrictions and admin audit inspection across two real staging identities.
- Actual PostgreSQL runtime/writer grants, conflicting updates, audit rollback, public staging trigger permissions and source immutability.
- Private Vercel project/protection, region, custom-domain ownership, external shared-file build, mail/domain verification and deployment logs with credentials redacted.
- Backup restore into an isolated branch, permissions/audit consistency, expiry of deleted backups and agreed RPO/RTO.

Local automated checks and browser evidence are recorded in `c06-validation.md`. These checks do not satisfy the real-staging acceptance gate. No production launch recommendation is implied by a passing build.

## Management decisions and operations

BloomShield must identify the controller/privacy contact, approve lawful basis and processor agreements, hosting regions/transfers, reviewer access owner and least-privilege assignments, retention/deletion owner and backup expiry, recovery objectives and restore owner, staff invitation/offboarding and MFA recovery procedure, and email retry/exception monitoring owner. These legal and organisational choices were not self-approved.

Onboarding: invite only a named individual, verify role, require administrator MFA, assign only necessary UUIDs. Offboarding: deactivate at `/staff`; session deletion and audit are transactional and every read rechecks active status. Role changes revoke sessions and require re-login. MFA recovery must verify identity outside the compromised channel, revoke all sessions, audit the intervention and require re-enrollment before administrator data access. Never provide a temporary shared bypass.

Monitor delivery exceptions and failed auth/management actions without applicant values or secrets. Agree an approved retention period for audit and auth metadata. Schedule bounded deletion of expired verification/rate-limit/activity data and expired sessions using a dedicated maintenance role only after policy approval; do not implement source retention deletion ad hoc. Keep dependency/security advisory review and secret rotation under an identified owner. Secret rotation affects encrypted MFA material and sessions; rehearse it with backups and staged key rotation before production.

Before publishing the C06 branch, root and admin `vercel.json` explicitly disable automatic Git deployments for `codex/app-001b-c06-email-auth`, following Vercel's documented `git.deploymentEnabled` branch setting. This prevents publishing the review branch from requesting a Vercel deployment. No deployment CLI was run. Any later staging deployment still requires approval and infrastructure preflight.

## C07 staging execution supplement

For current infrastructure classifications, isolated migration/grant procedure, email/scheduler acceptance, recovery approvals and operator actions, begin with [C07 infrastructure](c07-infrastructure.md) and [C07 acceptance](c07-acceptance.md). C07 does not supersede approved commercial terms, change released declaration versions or authorise production launch. Staging and production remain NO-GO until the recorded gates are satisfied.
