# APP-001B-C05 architecture assessment

24 October 2026. Development only; no deployment, DNS, database connection or email delivery authorised by this implementation.

## Evidence and decision

PR #7 is OPEN. GitHub head `2707bff851f808981a368838b852179a4db93123` matches the starting checkout. C05 branches from that dependency, not main. The public application is Next.js 15/React 19; Neon HTTP SQL stores EOIs and a Resend outbox. Migrations 001–004 preserve JSON submissions, add route/country, authoritative declarations/timestamps and nullable v2 structured codes. Existing rows must retain unknown metadata. There is no administrative identity provider, session implementation or user directory. The retry bearer secret is machine authentication and must never become an administrator login. Vercel configuration declares only the Next.js framework; an admin project/domain, protection, regions, database grants and recovery facilities are unverified. No cloud credentials or production records were inspected.

## Safe implementation boundary

`admin/` is a separate Next application, with its own root layout and build output. It never imports the public layout, analytics, email services or Neon client. It shares only immutable question definitions. It runs only with explicit synthetic-preview opt-in, outside production/Vercel; otherwise its page returns 404. There are no live management endpoints. Preview role switching demonstrates workflow permissions, not authentication. Browser changes are disposable memory and disappear on reload. Do not put real applicant information into this preview.

Live authentication, sessions, authorised reads/writes, user administration, retention execution and production deployment are BLOCKED pending operator decisions. Do not interpret the preview or domain-policy tests as a secure live service. No ad hoc passwords, shared bearer login or trusted browser role claims are introduced.

## Proposed live model and access

Read the existing `vcse_eoi` by UUID using a dedicated admin runtime role with SELECT only on approved source columns. Never copy submissions into a second applicant table or update payloads, declarations or recorded versions. Preserve `submitted_at` and show legacy `created_at` separately when authoritative timestamp is absent. Interpret codes only for the exact supported answer schema and applicable route; display legacy raw values as unclassified. International paid-discussion answers are not UK funding positions and neither constitutes validated intent.

Add separate management records keyed by application UUID: recruitment status, independent commercial route, reviewer assignment, next action/due date, WTP evidence and research learning. Use versioned optimistic updates. Add authorised users bound to stable provider subject IDs, role and active state, per-application reviewer grants, and an append-only chronological audit stream containing actor, timestamp, action and changed management fields. No source payloads or contact details in audit events. Record management update and audit atomically in one transaction. No migration is shipped for an unapproved identity/access model; finalise it after subject format, route scopes, retention and audit ownership are approved.

Administrator can see all records, manage users, approve final selections and oversee retention. Reviewers can see only explicitly granted records, record assessments and follow-ups, and use permitted statuses; final Selected and reversals of final selection require an administrator. Apply permissions before counts, search, detail, reports and pagination. Unknown and inaccessible UUIDs must yield identical responses. Reporting denominators must identify current filters and unknowns; selection and commercial classification are independent.

## Authentication and session contract (not implemented)

Select an organisation-controlled OIDC provider with MFA and invitation-only provisioning. Verify signature, issuer, audience, state, nonce and PKCE server-side; bind identities to active local grants. Use an opaque, revocable, short-lived server session in Secure/HttpOnly/SameSite cookies, rotate on login/privilege changes, enforce idle and absolute expiry and revoke on deactivation. Recheck active role and record scope on every server operation. Mutations require same-origin and CSRF protection, bounded schema validation, parameterised SQL and transactional audit. Never trust a submitted role/reviewer ID. Test expiry, revocation, denied enumeration and concurrent updates before connecting applicants.

## Deployment isolation

Create an independently approved private Vercel project rooted at `admin/` only after verifying shared-file build access (Next externalDir), region, custom admin.bloomshield.org ownership, preview protection and session callback URLs. No public-site admin routes. No analytics/session replay in admin. Separate preview/production secrets, identities and databases; disable synthetic mode for any Vercel runtime. Fail closed until auth/access checks pass. Add noindex, no-store, framing/CSP/referrer controls. Keep public recruitment OPEN/LISTED false; do not alter approved commercial wording.

## Management screens

Overview, searchable/filterable/paginated register, complete synthetic source detail and declaration/version display, separate recruitment/commercial controls, screening/assignment/follow-up, explicit WTP evidence, research fields, scoped reports and chronological activity. Preview includes loading, empty and denied states and labelled keyboard controls. Error handling for live network operations remains part of the blocked integration.

## Privacy, recovery and launch tests

Agree controller, access owner, retention period, lawful basis and international handling before collection. No automatic marketing, exports or destructive deletion. Retention is an administrator review queue; source deletion and backups require approved policy. Verify Neon recovery window, encrypted backups, restore into an isolated database, restore permissions and audit consistency; document RPO/RTO and deletion expiry with an owner. A backup feature is not claimed here.

Run existing PR #7 tests alongside domain/report tests, typecheck, lint and builds. Live acceptance additionally requires OIDC/session/CSRF tests, real PostgreSQL grants with attempted source UPDATE/DELETE denied, every endpoint's scope/role enforcement, audit atomicity and concurrency, recovery drill, dummy-only staging flow and responsive/assistive-technology review. No live acceptance can be claimed from synthetic tests.
