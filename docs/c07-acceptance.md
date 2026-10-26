# C07 acceptance evidence and operating checklist

## Current Neon result — 26 October 2026, after operator authentication

**Database integration success criterion achieved. Protected website/email acceptance remains BLOCKED; production NO-GO.** This section supersedes the earlier unauthenticated attempt and historical 25 October evidence below. No deployment or merge occurred.

| Check | Result and evidence |
| --- | --- |
| Project / organisation / region | PASS — actual Neon staging. Authenticated API verified `bloomshield-app001b-staging`, `long-bar-21726499`, `org-jolly-moon-22982519`, London `aws-eu-west-2`, PostgreSQL 18. |
| Branch / database identity | PASS — actual Neon staging. Default branch `br-hidden-violet-zaboc8g7`, named `production`, is used exclusively for synthetic staging. SQL verified `neondb`, `current_user=session_user=neondb_owner`. Owner URI obtained for that exact project/branch, held only in memory, TLS verify-full. |
| Pre-migration emptiness | PASS — actual Neon staging. Independent pg_class/pg_proc inspection returned zero non-system relations/functions. Rechecked immediately before writes at 2026-10-26T03:25:14.979Z. |
| Reviewed migrations | PASS — actual Neon staging. 001–007 committed individually at 03:25:15Z. All seven SHA-256 values matched c07-database.md. 007 executed its unchanged SQL body with the fixed admin role substituted for the psql variable; no psql client installed. See c07-neon-staging.md for the register. |
| Runtime setup | PASS — actual Neon staging. SQL-created `bloomshield_intake_staging` and `bloomshield_admin_staging`, separate random passwords, no privileged flags/inherited roles/object ownership/schema CREATE. Independent actual credential connections verified. Public schema CREATE revoked from PUBLIC. |
| Ignored configuration | PASS — local/simulated only. Root `.env.local` contains `VCSE_EOI_DATABASE_URL`; `admin/.env.local` contains `ADMIN_DATABASE_URL`. Exclusive file writes; owner credential never stored. Both apps remain closed; no Vercel environment writes. |
| Expected source, Better Auth and admin schema | PASS — actual Neon staging. All 15 expected tables present, including Better Auth user/session/account/verification/twoFactor/rateLimit; no managed authentication added. |
| Fictional UK persistence / admin retrieval | PASS — actual Neon staging. Receipt `2875d61f-ad7b-41a5-a366-47398f6977ee`; existing validateApplication/signing/persist code with real Neon HTTP transport; existing records/saveRecord DAL with real Better Auth reviewer session and admin runtime. |
| Fictional international persistence / admin retrieval | PASS — actual Neon staging. Nigeria fixture receipt `682353c5-a5a2-42e9-b787-d7ab2e6b5b12`; route-specific structured funding/declaration data retained. |
| Deduplication / source-management separation | PASS — actual Neon staging. Same submission returned same receipt and exactly two outbox jobs; owner-controlled trigger created one management row. Intake denied management/auth/audit access; admin denied source INSERT/UPDATE/DELETE/TRUNCATE. Intake limited to fingerprint UPDATE required by deduplication, not payload UPDATE. |
| Authorisation | PASS — actual Neon staging. Real password login through existing Better Auth, anonymous and unassigned reads denied, assigned reviewer reads allowed, reviewer selection/reassignment rejected. No mocked principal or database transport. Synthetic reviewer disabled and sessions deleted in cleanup. This does not establish HTTPS/browser or administrator MFA acceptance. |
| Management / audit transactions | PASS — actual Neon staging. Two committed management/audit updates per fixture; actor/action/field metadata verified without notes in audit. Same-version race had exactly one winner and one 409. Temporarily revoking audit INSERT caused management rollback; grant restored in finally. Source rows remained byte-for-value unchanged. Both runtimes denied audit mutation/truncation and schema CREATE. |
| Persistence across connections | PASS — actual Neon staging. Fresh independent admin connection retrieved both committed source rows. |
| Live database test | PASS — actual Neon staging. `C07_RUN_LIVE=long-bar-21726499 node --test tests/c07-neon-integration.cjs`: 1/1 integration test passed; no skipped tests, duration 30.690s. Final rerun using unmodified application database/authentication factories also passed 1/1 in 22.948s; latest UK receipt `ba1f4d43-6267-44ee-864b-9bdae101e1ec`, international receipt `791e7d4c-156c-4d81-abec-36e65f4c4d66`. Both successful runs retained as fictional evidence. |
| First live test attempt | FAIL, corrected. Expected-table assertion omitted the existing Better Auth verification table. Database migration was correct; assertion fixed. Failure occurred before EOI fixtures were inserted. Final rerun above passed. |
| No email sent | PASS — actual Neon staging. Test invoked persistence without deliver(); no mail API keys supplied. All eight fictional outbox jobs from the two successful runs set suppressed to prevent later worker delivery. Website/Resend acceptance remains BLOCKED. |
| Local regression suite after integration tooling | PASS — local/simulated only. 22 EOI + 6 dashboard + 12 auth tests = 40/40, zero failed/skipped. Public/admin TypeScript commands exited 0. Final lint/build results follow below. |
| Vercel / Resend / remote production flags / GitHub update | BLOCKED. No protected deployment or mail integration configured. Remote flags not verified; local/build OPEN/LISTED false. GitHub token invalid, so changes remain local. |

### Final lint/build results after Neon configuration

PASS — local/simulated only. With the ignored Neon runtime configuration present, `pnpm build` and `pnpm build:admin` both exited 0 (`BUILD_RESULTS public=0 admin=0`), generating 57 and six pages respectively. OPEN/LISTED explicitly false; admin staging enable remains false. The existing nested-worktree root-inference warning remains. No application code or dependency change was needed. `pnpm lint` exited 0 alongside the current regression/typecheck run; final test-only cleanup lint and git diff --check rechecks also exited 0 before commit.

## Earlier unauthenticated Neon integration attempt — 26 October 2026 (superseded)

**BLOCKED — staging integration incomplete; production NO-GO.** Work performed in the existing `codex/app-001b-c07-staging` worktree at `e6de7aa`, preserving #7 → #8 → #9 → #10. No migration or external application write was performed. See [exact operator resume commands](c07-neon-staging.md).

| Check | Result and evidence |
| --- | --- |
| Reviewed migration dependency order 001–007 | PASS — local/simulated only. 001–004 source/outbox/declarations/structured answers; 005 pinned Better Auth; 006 management/audit and owner-controlled insert trigger; 007 parameterised admin grants. Existing files unchanged. |
| CLI access | PASS — local/simulated only. `npx --yes neon@latest --help` succeeded after network-enabled retry; downloaded Neon 8.11.4. Initial sandbox attempts failed with registry EACCES. |
| Authenticated Neon access | BLOCKED. `neon --no-analytics me` exited 1: DEFAULT profile has no stored credential. No NEON_API_KEY or database environment variable names were present. Operator browser authentication requested. |
| Database identity, organisation, branch ID, endpoint and region | BLOCKED. Supplied target `long-bar-21726499`, `org-jolly-moon-22982519`, `neondb`, branch name `production` is not yet independently verified. |
| Empty application schema and migration privileges | BLOCKED. No SQL connection established; no independent schema inspection possible. |
| Migrations 001–007 applied to Neon | BLOCKED. None ran against Neon. |
| Runtime credentials / environment variables | BLOCKED. Existing expected names confirmed: root `VCSE_EOI_DATABASE_URL`, admin `ADMIN_DATABASE_URL`; ignored local files verified with git check-ignore. No values written. SQL-created restricted roles required; provider-created roles inherit neon_superuser. |
| Neon init/deploy suitability | PASS — local/simulated only. Documentation/CLI review: unnecessary tooling/config/service application and environment refresh for the existing two-app architecture. Neither command run; existing Better Auth retained. |
| Automated EOI tests | PASS — local/simulated only. `pnpm test:vcse`: 22/22, zero failed/skipped. Embedded PGlite and stubbed mail. |
| Automated dashboard tests | PASS — local/simulated only. `pnpm test:admin`: 6/6, zero failed/skipped. |
| Auth/database integration tests | PASS — local/simulated only. `pnpm test:auth`: 12/12, zero failed/skipped, including UK/international production SQL/DAL integration, transactional audit/concurrency and mutation grant denials in embedded PostgreSQL. |
| TypeScript public/admin | PASS — local/simulated only. `pnpm typecheck` and `pnpm typecheck:admin` both exit 0. |
| ESLint | PASS — local/simulated only. `pnpm lint` exit 0. |
| Initial public production build | FAIL. Sandbox blocked Google Fonts downloads (EACCES); build exited 1. Network-enabled retry recorded below. |
| Public production build retry | PASS — local/simulated only. Network-enabled `pnpm build` exit 0; 57 pages generated, OPEN/LISTED explicitly false. Nested-worktree root-inference warning remains; no deployment performed. |
| Admin production build | PASS — local/simulated only. Network-enabled `pnpm build:admin` exit 0; six pages generated. Combined command reported `BUILD_RESULTS public=0 admin=0`. |
| Actual Neon runtime connections, source protection and management/audit persistence | BLOCKED. Embedded PostgreSQL results do not verify real Neon credentials, inherited grants or connectivity. |
| Fictional UK/international EOI persisted in Neon and retrieved through authorised admin DAL | BLOCKED. Success criterion not achieved against Neon. |
| Live website/email acceptance | BLOCKED. Vercel and Resend not connected; no website/email acceptance claimed. |
| Remote PR #10 update | BLOCKED. `gh auth status` reports invalid BloomShield token. Local documentation changes only; no merge. |

No actual Neon staging PASS is recorded. No APP-001A access, production applicant data, real emails, DNS/deployment change, authentication service activation, billing change or merge occurred. Production OPEN/LISTED remain false in repository defaults and build process; remote production settings remain unverified.

25 October 2026. **Staging NO-GO. Production NO-GO.** The success criterion has not been achieved against protected live services. No actual-staging-service PASS is recorded. Existing C06 screenshots are historical local evidence, not C07 live acceptance.

## Result vocabulary

- PASS — tested against actual staging services: requires identified protected deployment, synthetic database identity and restricted evidence. None yet.
- PASS — local or simulated test only: cannot satisfy a live acceptance gate.
- BLOCKED — not testable without configuration/credentials: no invented service result.
- FAIL — test executed and failed: retain failure and any later remediation result separately.

## Local validation

The C06 source was tested in the C07 worktree using Node's test runner: **40/40 passed** (22 EOI, 6 dashboard, 12 authentication). PASS — local or simulated test only. PostgreSQL is PGlite; email network is stubbed. Tests cover UK/international source-to-dashboard persistence, receipt deduplication, authoritative declarations/versions, SQL reviewer scope, final-selection restrictions, concurrent updates, audit rollback, source/audit mutation denial, TOTP challenge, reset single use and session revocation, deactivation, absolute/idle expiry and outbox/webhook/retry handling. These are not live Neon permission or browser tests.

Production dependency audit: no known vulnerabilities, PASS — local or simulated test only (registry audit of locked production dependencies). First ESLint attempt: FAIL — test executed and failed; parent dependency tree lacked fast-glob. Fresh frozen-lockfile installation and final rerun results are appended below. No dependency versions were deliberately changed.

## End-to-end live acceptance matrix

Every row is currently **BLOCKED — not testable without configuration/credentials**. Record tester, commit/deployment, UTC time, fictional receipt, expected/actual result and restricted redacted evidence reference for each execution. Do not put passwords, tokens, cookies, TOTP secrets or recovery codes in evidence.

| Step | Required live observation |
| --- | --- |
| A | Protected public HTTPS staging accepts a valid fictional UK EOI |
| B | Source contains authoritative declaration booleans, exact snapshot and approved offer/privacy/answer versions |
| C | Neon source persists across requests and returns stable receipt |
| D | Applicant/team provider IDs and mailbox receipts correlate to durable jobs |
| E | Individually invited Administrator signs in and passes MFA |
| F | Register contains the fictional EOI |
| G | Administrator assigns it to an approved Programme Reviewer |
| H | Reviewer sees assigned record; unrelated UUID, search and report counts do not leak records |
| I | Screening, recruitment, classification and willingness-to-pay evidence persist without altering source |
| J | Follow-up and research observation persist |
| K | Logout/login/reload preserve authorised management state |
| L | Audit identifies actual actor, action and UTC timestamp with no secret/applicant values |
| M | Same-version conflict gives one winner; deliberate isolated audit failure rolls back management |
| N | Repeat route/version/receipt/email/register checks for international interest; UK prices not imposed |
| O | Concurrent identical submissions create one source application and no extra acknowledgement jobs |
| Recovery | Validation rejection, temporary database/mail failure and recovery preserve source and receipt invariants |

## Authentication/session acceptance report

All actual HTTPS checks below remain BLOCKED. Local tests above verify only their covered server behaviours. No browser session acceptance is implied.

Use separate authorised dummy administrator, assigned reviewer and unrelated reviewer accounts. Verify disabled public signup; invitation-only initial setup; correct/incorrect login and generic errors; Administrator TOTP enrolment/challenge; privately generated recovery codes and one-use recovery; Secure/HttpOnly/SameSite cookies; logout invalidating old cookie; session persistence after reload; 30-minute idle and eight-hour absolute expiry; one-use/expired password reset; old-session denial after reset and deactivation; offboarding; reviewer direct/aggregate denial; Administrator-only selection and staff management. Verify denied MFA-disable/alternate-login endpoints. Never capture setup/reset URLs, passwords, cookies or codes. Recovery approval procedure is in c07-governance.md. Recovery-code browser use remains unverified.

## Browser, responsive and deployment acceptance

C07 protected-staging end-to-end browser tests and responsive checks at 320, 390, 768 and 1440 pixels: BLOCKED by absent protected deployment and accounts. Capture redacted login/form/register/assigned-reviewer screens only after service configuration; verify no horizontal overflow, keyboard operation, error retention and stale-declaration re-review. Historical C06 captures are not new evidence. No C07 screenshots were produced, because no configured staging screen was available.

Production closed-state local HTTP tests and builds are recorded in the final validation addendum. Remote production environment flags, deployment protection and HTTP state remain unverified; local HTTP checks cannot prove remote configuration. Do not activate public recruitment to test it.

## Operator actions in execution order

1. Name infrastructure/access owner; connect approved Vercel, Neon and Resend staging access through secure mechanisms. Never send credentials in chat or commit them.
2. Approve synthetic project identity and region/processor proposal. Provision a fresh empty Neon target and non-owner roles; verify backup entitlement. Follow c07-database.md before migrations.
3. Configure separate protected public/admin Preview projects, roots, supported Node runtime, HTTPS origins, regions and independent secrets. Verify machine callbacks without public bypass. If plan/account permissions are insufficient, stop for operator action.
4. Verify dummy sender/recipient controls, tracking/replay disabled and logs redacted. Provision scheduler/alerts per c07-email.md. Keep production OPEN/LISTED false.
5. Bootstrap one authorised dummy Administrator using scripts/bootstrap-admin.cjs in a trusted operator shell. Complete password setup and MFA privately; invite individual reviewers through the staff interface.
6. Execute all A–O, permission, auth, mail, browser and failure/recovery checks. Record actual evidence and distinguish each PASS category.
7. Perform isolated restore drill and obtain named governance decisions. Review all failures and blockers before changing staging verdict. Production remains NO-GO until separate explicit launch approval and all organisational gates pass.

Do not merge C07 or its dependencies as part of this work. A protected synthetic staging GO would not authorise public recruitment, production deployment, production DNS or use of applicant data.

## Read-only remote production observations

On 25 October 2026, HTTPS GETs to https://www.bloomshield.org returned 404/noindex for /research/vcse-digital-workspace and /research/vcse-digital-workspace/privacy. /research-innovation and /sitemap.xml returned 200 and contained no programme link/entry. This is a limited live production closure observation, not an actual-staging PASS or proof of remote flags, POST behaviour or account settings. No production form submission was made. An initial inline check failed to parse because of shell quoting; the corrected stdin script completed and produced these observations.

## Final local static checks

Fresh worktree installation: pnpm install --frozen-lockfile --ignore-scripts completed successfully; 449 lockfile entries passed the package manager's supply-chain policy check. pnpm typecheck, pnpm typecheck:admin and pnpm lint then completed successfully (exit 0). PASS — local or simulated test only. Node v24.19.0 and pnpm v12.15.0 were used. Builds initially invoked through the parent's Next installation failed (public async-storage invariant; admin manifest errors). Fresh worktree builds are reported separately; the first admin rerun overlapped the earlier failed admin build, so any resulting output must be checked before acceptance.


## Final build and loopback HTTP results

- Public production build: PASS — local or simulated test only. Fresh worktree pnpm build exited 0, 57 pages generated, OPEN/LISTED explicitly false.
- Admin production build: PASS — local or simulated test only. Fresh worktree pnpm build:admin exited 0, six pages generated; auth/record/user APIs remain dynamic. No staging service configuration was needed to build closed artifacts.
- Closed public production-mode HTTP: PASS — local or simulated test only. Existing tests/vcse-closed-http.cjs ran against the completed artifact on loopback port 3124 (only the test base port substituted in memory). Programme/privacy pages 200/noindex, disabled fieldset, submission 503, retry without bearer 401, lookup 405, no Research/sitemap listing.
- Closed admin production-mode HTTP: PASS — local or simulated test only. Existing tests/c06-closed-http.cjs ran on loopback port 3121 (base port substituted in memory). All 16 GET/POST probes returned 404, no-store and Workspace unavailable, with ADMIN_STAGING_ENABLED=true and synthetic classification. No live auth was enabled.
- Both Vercel JSON files parsed successfully and explicitly disable C07 automatic Git deployments. PASS — local or simulated test only; remote account policy remains unverified.

The nested worktree produced a Next.js multiple-lockfile/root-inference warning. Fresh builds succeeded; this does not verify the Vercel admin project root, external shared sources, runtime, region or cloud build. Verify those settings before staging deployment. Initial failed build/lint attempts remain recorded above; final local reruns passed without changing dependency versions or application source.

Actual protected staging service tests, live Neon grant/migration verification, external mail/webhooks/scheduler, HTTPS authentication/browser/recovery-code tests, responsive staging captures and isolated backup restoration remain BLOCKED. There are no actual-staging-service PASS results. Staging and production remain NO-GO.
