# C07 acceptance evidence and operating checklist

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
