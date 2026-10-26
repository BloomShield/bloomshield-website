# C07 infrastructure configuration and isolation report

26 October update: Neon project/organisation/region, empty neondb, migrations 001–007 and restricted runtime connections have now been verified against actual synthetic staging. See [current database evidence](c07-neon-staging.md) and [acceptance](c07-acceptance.md). No Vercel/Resend/deployment work occurred. The 25 October inventory below is historical and superseded for Neon only.

25 October 2026. Isolated synthetic staging only. **Staging NO-GO; production NO-GO.** No external infrastructure was provisioned or verified. No live database migrations, mail, deployments, DNS changes, merges or recruitment activation occurred.

## Source and evidence boundary

GitHub fetch and PR inspection confirmed open dependencies: #7 `2707bff851f808981a368838b852179a4db93123` → #8 `c9fd20c53fc2708b137b3cfa22065418b2f71cad` → #9 `9460070f060c0a00ee4791c5eda6a68e797bf2bd`. C07 starts at #9 and targets its C06 branch. Existing editorial changes were excluded using a separate worktree. Root/admin Git deployment configuration disables automatic deployments for C06 and C07; account-side enforcement is unverified. A PR is not a staging deployment approval bypass.

Preflight inspected configuration files, command availability and relevant process-variable **names only**. Only `.env.example` was present; no `.vercel` project link or relevant configured process variables were found. GitHub read access works. No connected Neon, Vercel or Resend account tools, Vercel CLI or psql client were available. Absence of local configuration does not prove the organisation has no cloud accounts. Secret stores and production data were not inspected.

| Item | Classification | Evidence / required resolution |
| --- | --- | --- |
| GitHub dependency heads and source | VERIFIED | Remote fetch and PR metadata; hashes above |
| Public and `admin/` application configuration | VERIFIED | Separate Next apps and closed gates in repository; cloud deployment unverified |
| Vercel project IDs, environments, protection and restrictions | BLOCKED | No account connection/link; operator must identify two independent protected Preview projects and account permissions |
| Vercel provisioning/protection entitlement | REQUIRES OPERATOR ACTION | Verify existing entitlement and authorised access; if a plan change is needed, stop for explicit billing approval |
| Neon project/branch/database/roles/region | BLOCKED | No credentials or connected account; no database identity verified |
| Neon dedicated synthetic project | REQUIRES OPERATOR ACTION | Prefer fresh project rather than a branch copied from production/contact data |
| Resend account, sender-domain verification and dummy recipients | BLOCKED | No isolated API key, sender or recipient configuration |
| Runtime/owner/mail/webhook/retry secret slots | AVAILABLE BUT UNCONFIGURED | Root and admin `.env.example`; secret values must be supplied through approved secure storage |
| Authenticated retry endpoint | VERIFIED | Source exists; no external scheduler configured or exercised |
| Scheduler, delivery alerting and exception owner | REQUIRES OPERATOR ACTION | Configure and verify per email runbook |
| DNS target `admin.bloomshield.org` | REQUIRES OPERATOR ACTION | Eventual production address only; do not configure during C07 |
| Backups, restoration and processor arrangements | BLOCKED | Account evidence and organisational decisions unavailable |

## Proposed hosting and transfer decision (unapproved)

Prefer a UK London region for both server execution and a fresh Neon project if supported by the existing account; otherwise propose an EU region such as Frankfurt for approval. This is a proposal, not a verified provider capability or configured region. Keep compute near the database; confirm actual region identifiers in each console before configuration. UK/EU placement alone does not settle transfers: support access, subprocessors, telemetry, email processing, logs and backup locations must be reviewed in processor terms. Management/privacy owner must approve contractual arrangements and any required transfer mechanism. No legal approval is inferred.

## Configuration inventory

Public Preview only: `VCSE_EOI_ENVIRONMENT=staging`, exact HTTPS `VCSE_EOI_ORIGIN`, isolated non-owner `VCSE_EOI_DATABASE_URL`, `RESEND_API_KEY`, staging `VCSE_EOI_FROM_EMAIL` and dummy team `VCSE_EOI_TO_EMAIL`, independent `VCSE_EOI_RATE_SALT`, `VCSE_EOI_DECLARATION_SECRET`, `VCSE_EOI_RETRY_SECRET`, endpoint-specific `VCSE_EOI_WEBHOOK_SECRET`. Enable `VCSE_EOI_OPEN` only after protection, isolation and recipient controls are verified. Keep staging unlisted. **Production must retain `VCSE_EOI_OPEN=false` and `VCSE_EOI_LISTED=false`.** Remote production values are not verified by local defaults.

Admin Preview only: `ADMIN_STAGING_ENABLED=true`, `ADMIN_DATA_CLASSIFICATION=synthetic`, separate non-owner `ADMIN_DATABASE_URL`, exact HTTPS `ADMIN_AUTH_ORIGIN`, random `BETTER_AUTH_SECRET` (minimum 32 characters), isolated `ADMIN_RESEND_API_KEY`, verified `ADMIN_MAIL_FROM`, explicit individually authorised dummy `ADMIN_TEST_EMAILS`. `ADMIN_BOOTSTRAP_EMAIL` is operator-shell-only. Owner credentials never enter either runtime. No secrets may use a `NEXT_PUBLIC_` prefix or appear in build output, screenshots, commands retained as evidence, PRs or logs.

## Vercel preparation gate

Create/identify separate protected public and admin staging projects. Admin Root Directory is `admin/`; framework Next.js; build `next build`; install from the repository-root pnpm lockfile and enable outside-root shared source access. Verify account-specific install command and root handling with a protected Preview build before accepting it. Development previously used Node 24; confirm a supported runtime and dependency engines against the actual account before selecting it. Pin the approved runtime in project settings. Repository builds do not verify Vercel root handling or connectivity.

Record project IDs, Preview deployment IDs, commit, HTTPS origins, runtime, regions, protection policy and authorised testers in restricted operational evidence. Verify protection on HTML, APIs, auth endpoints and webhook/retry paths, including unauthenticated direct URLs. Machine callbacks require a narrowly scoped provider-supported protection mechanism held in secret storage; do not exempt the whole app. If callbacks cannot reach protected staging safely, stop and record the limitation. Protect both apps before any fictional submission.

Disable replay and analytics integrations in staging project settings; leave public analytics IDs unset. Verify browser requests and server/integration logs contain no applicant values. Source already excludes Clarity on the EOI journey and does not import analytics into admin; that is not proof of deployed integration settings. Test direct and navigated entry. Confirm disabled/missing configuration denies access and production admin remains closed even with staging flags set.

See [acceptance](c07-acceptance.md), [database procedure](c07-database.md), [email procedure](c07-email.md), and [governance/recovery](c07-governance.md). No actual-service PASS is recorded in this delivery.

## Provider documentation checked during C07

The public [Neon region list](https://neon.com/docs/introduction/regions) lists London `aws-eu-west-2` and Frankfurt `aws-eu-central-1`; project region is fixed at creation. The [Vercel region list](https://vercel.com/docs/regions) lists London `lhr1` and Frankfurt `fra1`; it documents a US default for functions, so do not leave region selection implicit. These public capabilities are verified documentation only, not verification of BloomShield account configuration or entitlements. Proposed pairing: London/London subject to approval and actual console availability; EU fallback requires an explicit approved pairing. Self-hosted Better Auth remains the approved library; no Neon managed auth switch is proposed.

[Vercel deployment protection methods](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) describe available mechanisms; confirm the actual account policy and authorised testers before deployment. [Resend event types](https://resend.com/docs/webhooks/event-types) distinguish API acceptance from delivery and include suppression events. Provider documentation does not establish actual inbox delivery, contract approval or transfer compliance.
