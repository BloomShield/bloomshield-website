# C05 development handover

Development preview only. Live applicant access is deliberately blocked. See [architecture assessment](c05-architecture.md) for the evidence and required security design.

## Local preview (PowerShell)

Use the repository's installed dependencies, or `pnpm install --frozen-lockfile` at the repository root. Do not create an independent lockfile under admin. No secrets or database are needed.

```powershell
$env:ADMIN_SYNTHETIC_PREVIEW = 'true'
pnpm dev:admin
```

Open http://127.0.0.1:3110. The sidebar and header identify the application as **BloomShield CIC — VCSE Campaign Dashboard**, with the supplied round teal-and-gold shield logo. Use `next dev`, not `next start`: production mode always returns 404, even with the opt-in. Vercel preview and production also return 404. Bind to loopback only. To clear all edits, reload. To stop, press Ctrl+C and remove the opt-in with `Remove-Item Env:ADMIN_SYNTHETIC_PREVIEW`.

The role selector is a demonstration only. Administrator sees 18 fictional records; Programme Reviewer sees the nine assigned to Programme Lead. Open the register, choose an organisation, record screening/research/WTP evidence, save, and inspect activity history. Reviewers cannot assign users or approve/reverse final selection. Filters affect all overview/report totals. Pipeline counts are current status, not historical conversion. Reference date is fixed at 24 October 2026 so synthetic workload counts remain reproducible.

## Delivered and deferred

Delivered: isolated application/layout, teal/gold responsive styling, overview, register search/country/route/readiness/funding/status/date filters, sorting and six-row pagination, full fictional source/declarations, independent recruitment/commercial fields, reviewer assignment, notes/actions/due date, WTP and research forms, session activity and scoped reporting. No source record edits, data exports or mail actions exist. Synthetic declarations are explicitly examples, not replicas of accepted real wording.

Deferred under the handover's explicit stop condition: identity provider/MFA/login/session storage and revocation, every live server endpoint and record scope, durable updates/audit, concurrency, user administration, retention execution, database role/migrations and infrastructure verification. No database migration is needed for a memory-only prototype; an identity-dependent migration is intentionally deferred. This is not a launch-ready internal service.

## Operator decisions / launch blockers

1. Approve organisation-controlled OIDC provider, MFA policy, bootstrap administrator, session duration/revocation and provisioning owner.
2. Approve reviewer grants: explicit application assignment versus programme/country route access; define final selection/withdrawal policy and audit owner.
3. Verify separate private Vercel project, admin domain ownership, region, protected previews, callback origins and shared question-file availability from the admin root. No resources were provisioned.
4. Create and verify isolated staging Neon runtime role with SELECT-only source access; agree management writes and immutable transactional audit ownership. Never reuse the public writer or retry secret.
5. Approve retention, deletion review, backup expiry and restore process; assign owners and test RPO/RTO. Approve privacy/provider/international arrangements.
6. Complete live implementation and staging acceptance for sessions, CSRF, role/scope/UUID denial, optimistic concurrency, audit atomicity, database grants, recovery and accessibility. Browser-only role checks cannot satisfy this gate.
7. Review and merge dependencies only through separate authorised decisions. C05 draft PR targets PR #7's branch while it remains open. Do not merge either PR, deploy, run production migrations, change DNS or activate recruitment. Keep production VCSE_EOI_OPEN=false and VCSE_EOI_LISTED=false.

## Checks

```powershell
pnpm test:admin
pnpm test:vcse
pnpm typecheck
pnpm typecheck:admin
pnpm lint
pnpm build:admin
pnpm build
```

Tests exercise the preview gate and management model, scope restrictions, final selection, source preservation, structured/legacy answers and routes, filters/report denominators, and the PR #7 SQL/migrations in embedded PostgreSQL. These are not live authentication or database-grant tests. No production applicant data or real email is used.

The lint configuration ignores existing untracked `.qa` scripts and generated nested build output, and allows the established CommonJS test harness in `tests/*.cjs`; application rules remain enabled. Public TypeScript checks exclude the isolated admin tree, which has its own check. Development uses `.next-dev` so a preview cannot overwrite the production build.

## Validation evidence — 24 October 2026

- 28 tests passed: 6 dashboard model tests and 22 PR #7 regression tests. The latter run migrations 001–004 and application SQL in embedded PostgreSQL without live Neon or Resend.
- Repository ESLint, public TypeScript and admin TypeScript checks passed.
- Public and admin production builds passed. The initial public build could not fetch its existing Google fonts under the network sandbox; a network-enabled rerun passed with 57 public routes generated.
- Admin production HTTP checks passed with the preview flag deliberately enabled: GET and POST to root, an applicant API path and a record UUID all returned explicit 404/no-store/noindex with no data. Middleware rejects before streaming; a page-level notFound alone was insufficient for HTTP status and was corrected.
- Local development returned HTTP 200 with the synthetic banner and no Clarity script. Role switching and edits remain synthetic browser-memory demonstrations, not live security verification.
- Initial implementation browser attachment timed out. The subsequent branding review below records the responsive and interaction checks now completed; full screen-reader and complete form-workflow acceptance remain outstanding.
- No production resources, DNS, database migrations, applicant records, recruitment flags, approved terms or emails were changed.

## Approved branding refinement — draft PR #8

The application title, sidebar lockup, header and footer now use BloomShield CIC / VCSE Campaign Dashboard. Recruitment & commercial validation remains a functional header label. A pale teal sidebar, teal navigation and gold selection/top accents reinforce the existing identity without changing the dashboard structure.

`admin/public/brand/bloomshield-hero-shield.jpeg` is a byte-identical copy of the user-supplied BloomShield Hero Shield Logo.jpeg, SHA-256 `23077c9823189e0d5a953db749277448c10421572dbda1e285281cdd35ed0444`. The original artwork is preserved; CSS gives its display a circular outline at 64 × 64 pixels. The adjacent text supplies the accessible link name, so the image has empty alternative text to avoid repeating it. Public-site assets are untouched.

Browser review confirmed the logo loads and the shell has no horizontal overflow at 320, 768 and 1440 pixels. Screenshots: `docs/qa/c05-brand-320.png`, `docs/qa/c05-brand-768.png`, `docs/qa/c05-brand-1440.png`. Reviewer scope remained nine records, administrator scope 18; register navigation, empty search and reset worked; the skip link navigated to #main. No snapshots required updates and no fixtures, filters, role logic or security gates were changed. Broader screen-reader/full workflow acceptance and the live-service blockers above remain unchanged. PR #8 stays draft; no merge or deployment.

Branding regression checks passed: all 28 tests, ESLint, public/admin TypeScript checks and both production builds (57 public routes). Six admin production GET/POST denial checks and the public closed-recruitment HTTP checks passed again. The served development JPEG matched the supplied asset checksum; the same asset URL returned 404 in production mode with preview opt-in enabled. No test or snapshot source changes were necessary for this presentation-only update.
