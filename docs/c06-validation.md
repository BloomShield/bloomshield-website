# C06 local validation — 25 October 2026

Local evidence only. External Vercel/Neon/Resend acceptance is **BLOCKED** by missing configured infrastructure and credentials. Production is **NO-GO**. See [handover](c06-handover.md) for configuration, costs, limitations, policy owners and the external acceptance checklist.

## Automated tests

- `pnpm test:auth`: **12 passed**. Uses the real pinned Better Auth handlers with an embedded PostgreSQL transport; no live database or mail is contacted. Covers disabled signup, anonymous and CSRF denial, Secure/HttpOnly/SameSite cookies, database sessions, SQL reviewer scope, final-selection and reassignment denial, immutable source values, optimistic conflict handling, field-only audit, audit failure rollback, real TOTP enrollment/challenge, one-use/expired password reset, reset session revocation, deactivation, absolute/idle expiry, invitation password hashing, IP and atomic account throttling, PostgreSQL source/audit mutation denial and UK/international intake-to-dashboard persistence with duplicate receipts and stubbed mail.
- `pnpm test:admin`: **6 passed**, preserving existing synthetic management, route/answer and scoped-report behaviour.
- `pnpm test:vcse`: **22 passed**, preserving existing intake, immutable declaration/version data, duplicates, outbox/retries and both routes.
- `pnpm lint`: **passed**.
- Production dependency audit after patching: **0 advisories** (0 critical/high/moderate/low). Better Auth is pinned to 1.7.12. Next.js was updated within major 15 to 15.5.28; existing resolved React 19.2.7 retained. Matching ESLint configuration and patched PostCSS/nanoid/source-map-js/sharp are locked. Native build scripts were initially reported blocked; patch installs used `--ignore-scripts`. Build verification checks that required prebuilt binaries are available.

These are test transport and local database-grant checks, not verification of actual Neon identities, regional hosting, staging mail delivery or private Vercel access.

## Browser evidence

Actual local browser captures at 320, 390, 768 and 1440px width, height 900px. Login and the explicitly labelled synthetic preview each showed no horizontal overflow (content width equalled layout width; scrollbar occupied 15px). Mobile login and dashboard plus desktop login were visually inspected. No passwords, setup secrets, tokens or applicant data appear in these screenshots.

| Width | Account screen | Dashboard preview |
| --- | --- | --- |
| 320 | [Login](qa/c06-login-320.jpg) | [Preview](qa/c06-preview-320.jpg) |
| 390 | [Login](qa/c06-login-390.jpg) | [Preview](qa/c06-preview-390.jpg) |
| 768 | [Login](qa/c06-login-768.jpg) | [Preview](qa/c06-preview-768.jpg) |
| 1440 | [Login](qa/c06-login-1440.jpg) | [Preview](qa/c06-preview-1440.jpg) |

The preview screenshots demonstrate responsive presentation only. They are not evidence of real authenticated staging or persistent browser workflow acceptance. Such checks remain BLOCKED; no bypass was used to simulate them.

## Build and HTTP verification

- Public production build: **passed**, 58 routes in the current working tree. The initial network-sandbox run failed solely while fetching the existing Google Fonts; the network-enabled rerun passed. The working tree includes pre-existing editorial work, which is excluded from the C06 commit.
- Admin production build: **passed**; authentication/API routes are dynamic and no staging database is needed to build the closed application.
- Public and admin TypeScript: **passed**.
- Production-mode admin HTTP: **16 GET/POST requests** across dashboard, login, staff, records, users, signup, login and reset paths returned 404/no-store before rendering, with synthetic opt-in enabled. The six existing C05 closed-state requests also passed.
- Public closed-recruitment HTTP: **passed**. Preparation pages remain noindex with a disabled form, submissions return 503, retry is unauthorized, record lookup is unavailable and recruitment stays absent from research listing/sitemap.
- No live staging integration, email delivery, deployment, production migration, DNS change, merge or recruitment activation was performed.
