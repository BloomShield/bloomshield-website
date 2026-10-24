# VCSE Digital Workspace — pre-campaign handover

Status: local implementation for review, recruitment CLOSED by default. No production deployment or migration has been performed. This replaces the earlier handover's delivery-flag description: this implementation uses a separate durable delivery outbox and signed delivery-event processing.

## Routes and presentation

- `/research/vcse-digital-workspace`: responsive HTML offer, clickable EOI anchor and native form.
- `/research/vcse-digital-workspace/privacy`: programme privacy DRAFT, pending operational approval.
- `POST /api/vcse-eoi`: validated, bounded, same-origin submissions.
- `POST /api/vcse-eoi/retry`: bearer-authenticated retry/maintenance endpoint; no applicant data returned.
- `POST /api/vcse-eoi/webhook`: signed Resend delivery events; no applicant data returned.

The supplied banner is retained as an asset and its photograph is cropped visually with CSS, keeping the offer text and CTA in real HTML. No founder portrait is used. The Research card is conditional on `VCSE_EOI_LISTED=true` and uses full-document navigation. Sitemap and search remain unchanged. Both new pages explicitly disallow indexing; listing alone does not remove noindex.

## Environment and isolation

See `.env.example`. All secrets are server-only. No production secrets were found or used.

1. Create a dedicated staging Neon project/database and a least-privilege runtime role. Do not reuse the contact database or production connection string. Set an approved hosting region and restrict console access to authorised reviewers. Disable any anonymous/public Data API access.
2. Run migrations 001, 002 and 003 in that order in staging as schema owner; for an existing schema run only the unapplied additive migrations. Use a separate production database later; apply the migration there only after approval. Runtime requests never create tables.
3. Set `VCSE_EOI_ENVIRONMENT=staging` in Preview/local and `production` only in Production. The configuration gate rejects a mismatch with `VERCEL_ENV`; it cannot prove that operators supplied different database URLs, so verify this in the hosting dashboard.
4. Set the exact browser origin in `VCSE_EOI_ORIGIN` (scheme, host and port, with no path or trailing slash), database URL, Resend API key, verified `VCSE_EOI_FROM_EMAIL`, authorised `VCSE_EOI_TO_EMAIL`, independent high-entropy `VCSE_EOI_RATE_SALT`, `VCSE_EOI_RETRY_SECRET`, and endpoint-specific `VCSE_EOI_WEBHOOK_SECRET`, and independent `VCSE_EOI_DECLARATION_SECRET`. The explicit origin avoids internal Next.js proxy-origin mismatches while retaining strict same-origin validation.
5. Use an isolated Resend testing key/domain and dummy applicant/team inboxes. Never exercise email tests with real applicants. Register the staging webhook against the staging endpoint and its own signing secret.
6. Keep `VCSE_EOI_OPEN=false` and `VCSE_EOI_LISTED=false` in Production. Enable OPEN only in a protected staging environment for acceptance testing. Use Vercel Deployment Protection; noindex does not provide access control. The code never enables recruitment on its own.

Required webhook events: `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.failed`, `email.complained`, `email.suppressed`. Disable email open/click tracking in the sending service; it is not used by this programme.

References: [Resend event types](https://resend.com/docs/webhooks/event-types), [Svix verification specification](https://docs.svix.com/receiving/verifying-payloads/how-manual).

## Submission and delivery

The server accepts at most 24,000 streamed bytes, validates field lengths, enum choices, email/URL shape, one to three distinct challenges and three required boolean acknowledgements. Unknown fields are not stored. Names/organisation details are plain text; emails contain no applicant-entered HTML. A honeypot rejects automated entries, and same-origin checking rejects cross-site submissions.

Shared hourly database buckets allow ten valid attempts per network identifier and per email. Network identifiers use Vercel's platform-supplied forwarding header; outside Vercel the network bucket is global. Keys are salted hashes and expire after two hours. This is a baseline shared limiter, not comprehensive distributed bot defence. Before public traffic, configure and test Vercel firewall/bot rules and verify the forwarded-header trust boundary. Invalid requests do not touch the database. No in-memory rate limiter is used.

A deterministic fingerprint of normalised, fixed-order fields gives identical retries the same UUID receipt. An atomic PostgreSQL statement inserts the record and both email jobs. No email is attempted until that statement succeeds. Concurrent identical requests produce one application and two jobs. Differently worded submissions remain separate; there is no identity verification or deduplication of all enquiries from one organisation.

A success receipt means the record is saved. It does not promise email delivery. Applicant email acknowledges the EOI; team email contains the receipt only, for review in the restricted database console. Marketing is never enabled. There is no internal screening UI or public record lookup endpoint.

Delivery jobs are claimed with database leases. Send failures remain recorded with a generic error and are eligible after 30 minutes. There are at most eight attempts within 23 hours of the first attempt, using the same Resend idempotency key. Expired five-minute leases recover abandoned attempts. Provider acceptance is stored as `sent`; signed events record actual `delivered`, `delayed`, `bounced`, `provider_failed`, `complained` or `suppressed` states. Permanent delivery failures are not automatically resent. Early webhook events are retained briefly and reconciled when the provider ID is saved. Unrelated shared-account events store only provider ID/status/time, never message bodies or addresses, and expire after two days.

## Retry scheduling and operational follow-up

An authenticated endpoint is implemented; a scheduler has NOT been provisioned. Before opening, assign an owner and configure a trusted scheduler to POST `/api/vcse-eoi/retry` every 15 minutes with `Authorization: Bearer <VCSE_EOI_RETRY_SECRET>` from secret storage. Do not put the secret in a URL, client code, committed schedule or public log. Allow a five-minute function duration on the chosen hosting plan; lower the batch size if its limit is shorter. The endpoint processes up to ten jobs and clears expired rate/event records. Restrict scheduler concurrency. Alert on endpoint failures or an increasing `outstanding` count.

At least daily, an authorised reviewer must inspect unresolved jobs and Resend's dashboard, including webhook failures and accepted messages without a delivery event. Do not automatically resend a bounced/complained/suppressed message. Confirm contact information or use an agreed alternative channel. For exhausted or old unconfirmed attempts, check the provider before any manual resend; do not reset attempts blindly outside the provider's idempotency window.

```sql
SELECT d.application_id, d.kind, d.status, d.attempts, d.next_attempt_at,
       d.last_error, d.provider_id, d.sent_at
FROM vcse_eoi_delivery d
WHERE d.status NOT IN ('sent', 'delivered')
   OR (d.status = 'sent' AND d.sent_at < now() - interval '1 day')
ORDER BY d.next_attempt_at;

SELECT id, created_at, retention_review_at
FROM vcse_eoi WHERE retention_review_at <= now();
```

The second query is a review queue, not automatic deletion. Appoint the retention owner, approve the proposed 12-month review, implement a scheduled review/removal process and verify backup expiry and deletion handling before collection. Deletion of an application cascades to delivery jobs. Do not export applicant records into the public repository, support tickets or PRs.

## Privacy and analytics

The notice explicitly labels its lawful basis, provider arrangements and 12-month review as proposals needing approval. Confirm controller contact, legitimate-interest assessment, processor agreements, actual regions and transfer safeguards. Replace draft wording and privacy version with approved text before launch. A notice acknowledgement is not marketing consent.

Workspace pages suppress Clarity initialisation and the form has `data-clarity-mask=true`. The conditional Research link performs a full document load to prevent a replay session started on another page from following the applicant into the form. Preserve that property when adding future links; any future SPA entry must be checked for replay exclusion. No form contents or field values are sent as analytics events. Optional aggregate analytics still follows existing consent controls.

## Checks and remaining decisions

Run `pnpm test:vcse`, `pnpm typecheck`, `pnpm build`.

The automated suite executes the migration and production SQL in embedded PostgreSQL (PGlite) while replacing only Neon transport and the external email network. It covers validation, closure/isolation gates, malformed/oversized/origin/bot rejection, persistence before email, concurrent deduplication, API failure and retry, shared limiting, abandoned leases, retry exhaustion and signed bounce events. It does not verify Neon network behaviour or actual Resend inbox delivery.

Before opening, run live staging tests for valid dummy EOI, one record on duplicate retries, both inboxes, rejection/timeout and provider-bounce scenarios, webhook signatures/retries, scheduler alerts and expiry cleanup. Verify that staging and production accounts/recipients are isolated. Agree VAT and total payable, technical costing, proposed storage, backup/recovery/maintenance terms, participant communication timing and the operational review owner.

Only after explicit launch approval: enable OPEN/LISTED, update the approved privacy version, remove noindex, add sitemap/search entries and set actual campaign dates. Do not merge or deploy this branch for public recruitment during preparation.

## International-interest extension

The UK hero and current offer remain unchanged. A quieter invitation links directly to `#country` in the same form. Country of base is selected explicitly from a native keyboard-accessible country selector; countries of operation use a native multiple selector with keyboard instructions. No country is inferred from a network identifier.

The server derives `uk_early_adopter` for base country GB and `international_interest` otherwise, regardless of any client-supplied route. UK organisations operating overseas stay on the UK route. International respondents see the separate-availability notice, route-specific offer information and Yes / Potentially / Funded access needed / Need more information for willingness to discuss paid implementation. No UK-price affordability assessment is required from them. On-screen receipts and transactional emails acknowledge international interest and make no selection or delivery-date promise.

Apply migrations **001 then 002** for a new database. If 001 is already applied, apply **002 only**. Migration 002 adds country, operating countries and enquiry route without replacing existing payloads, receipts or delivery jobs. Legacy records retain NULL countries where these were not collected; their original UK-programme enquiry route is backfilled explicitly. Do not manufacture operating-country data for legacy submissions. Migration 002 is safe to rerun.

Reporting example (restricted console only):

```sql
SELECT enquiry_route, country, count(*) AS enquiries
FROM vcse_eoi GROUP BY enquiry_route, country ORDER BY enquiry_route, country;
```

International participation, any exploratory conversation, pricing and availability are assessed individually. The UK subsidy, complete free-discovery offer and deployment availability do not apply automatically. Review cross-border privacy arrangements before international data collection. Country selections and route are described in the privacy draft. Automated tests cover UK, non-UK, UK-based international operations, route spoofing, invalid countries, international commercial choices and preservation of legacy records by the additive migration.

## Versioned declarations and audit extension

Apply **003_vcse_declaration_audit.sql after 001 and 002**, or apply 003 alone where those two are already present. It adds three nullable individual boolean columns, UTC `submitted_at` (`timestamptz`), declaration-set/privacy/offer version references, presented route and the authoritative declaration snapshot. Existing combined acknowledgement fields and original payloads are untouched. Historical individual values and versions remain NULL; even an old `privacy_version` is retained in its original field rather than invented as a new audit acceptance. The submission-time default is set only after adding the column, so it does not fabricate historical timestamps.

The exact three required declarations are defined in `lib/vcse-declarations.ts`. Released wording/version keys must remain immutable. Changes to declaration wording, privacy wording or either route's offer require a new corresponding version. The three fields are `selectionAcknowledged`, `purchaseBoundaryAcknowledged` and `privacyAcknowledged`; each must be JSON boolean true. Old combined `acknowledgements`, truthy strings and client wording are never a substitute.

Set an independent `VCSE_EOI_DECLARATION_SECRET` in each environment before test submissions. The server signs a route-specific snapshot when rendering the form. It includes the displayed declaration/privacy/offer versions, route and UTC issue time. Signature verification binds the submission to that snapshot, checks it against the currently accepted definitions and expires it after 24 hours. The server derives the route from selected base country and checks that it matches the signed offer. No signing secret is exposed to the browser. Rotating the key invalidates outstanding forms and requires re-review.

Invalid, forged, expired or superseded snapshots receive HTTP 409 with a clear review message and fresh server-defined presentations. The form keeps organisation/contact/workflow entries, disables resubmission until the applicant chooses “Review updated declarations”, displays the new offer/declarations and clears all three checks for explicit re-acknowledgement. Changing the base country also clears the checks. Newly issued snapshots with the same content/versions do not defeat deduplication: render time/token are excluded from the fingerprint. Changed accepted versions deliberately form a different audited application.

Only the selected route's offer version and privacy reference are recorded. The international offer snapshot contains separate availability/pricing wording and does not bind the respondent to UK prices. No submission takes payment, accepts a purchase contract or subscribes anyone to marketing.

Audit verification covers individual missing/false/invalid declarations, legacy combined-only input, forged/stale/expired/wrong-route snapshots, authoritative exact wording, UTC timestamps, ignored forged labels, duplicate submissions across refreshed snapshots and non-destructive legacy migration.

## Verification results — 24 October 2026

- 15 automated tests passed against embedded PostgreSQL, including the UK/international extension and declaration audit cases.
- TypeScript and targeted ESLint passed; the final production build result is recorded in the PR.
- Browser checks used dummy records on a loopback-only preview with placeholder credentials. No real Neon or Resend account was contacted.
- Observed: the UK headline/HTML button and approved three-colleague photograph; noindex; labelled controls; three initially unticked declarations; route-specific international notice and commercial choices; country selection clearing all three declarations; retained organisation/contact/country entries after validation errors and a simulated database outage; focus moving to the error summary.
- No horizontal overflow at widths 320, 390, 768 and 1440. The international invitation brought the selector into view in the desktop check. Browser access was subsequently disabled in Work settings; the final instant-scroll refinement needs a fresh mobile browser check, and stale-terms review interaction still needs browser acceptance testing (its API rejection and audit behaviours are automated).
- `docs/qa/vcse-desktop.jpg` shows the desktop hero. `docs/qa/vcse-mobile-invitation.jpg` shows the mobile invitation below the UK scope. These are local preview captures, not evidence of deployment.
- Final closed-state HTTP checks and build outcome are recorded in the PR. Live Neon persistence/Resend inbox/webhook tests and scheduler provisioning remain outstanding; no migration or production deployment was performed.

Runtime-role grant example after the operator creates an appropriate role (substitute the approved role name):

```sql
GRANT USAGE ON SCHEMA public TO vcse_eoi_runtime;
GRANT SELECT, INSERT, UPDATE ON vcse_eoi, vcse_eoi_delivery,
  vcse_eoi_rate, vcse_eoi_events TO vcse_eoi_runtime;
GRANT DELETE ON vcse_eoi_rate, vcse_eoi_events TO vcse_eoi_runtime;
```

Keep schema ownership, application-record deletion/retention review and migration privileges with the authorised operational role. Verify actual role grants and network access in staging before opening.

Final verification: production build passed with all 57 routes generated. Closed-state HTTP checks passed against `next start`: both pages returned 200 with noindex, the form fieldset was disabled, POST submissions returned 503, unauthorised retry returned 401 and GET record lookup returned 405. Research listing and sitemap omitted the workspace route. To reproduce after building, run `pnpm start --hostname 127.0.0.1 --port 3104` in one terminal and `node tests/vcse-closed-http.cjs` in another, with recruitment flags unset/false.

## Commercial clarity refinement — UK version 2

The UK cards now read £2,500 standard implementation cost, 50% selected early-adopter discount and £1,250 discounted early-adopter implementation price. Shared, server-controlled `ukCommercial` content drives the page and UK form presentation. It explains that free discovery and workflow mapping precede any implementation commitment, that selected organisations can review scope/costs and decline, and that payment options apply only after independent agreement to paid implementation. The provisional £20/month infrastructure charge remains; support, VAT treatment and total payable require confirmation before agreement.

A plain-English explanation immediately precedes the three required, initially unticked declarations. EOI is free/non-binding, shortlisted organisations may be invited to free UK discovery/mapping, selection/deployment are not guaranteed, the discount requires separate implementation agreement, and EOI creates no payment or purchase contract.

Current UK versions: `vcse-declarations-2026-10-24-v2` and `vcse-uk-2026-10-24-v2`. Released v1 declaration wording and UK offer remain intact in `DECLARATION_SETS` and `OFFER_VERSIONS`. No database migration or historical-record update is needed. Signing and verification now select the declaration version by enquiry route. Superseded UK presentations still return 409 and require explicit review plus all three fresh acknowledgements.

International pricing/availability are unchanged: international interest retains `vcse-declarations-2026-10-24-v1` and `vcse-international-2026-10-24-v1`, including its existing purchase-boundary declaration. This deliberately avoids promising free UK discovery/mapping internationally. The privacy notice/version is unchanged.

17 automated tests passed, including rendered page/form copy matching the signed UK offer, exact new version references, all three acknowledgements, superseded UK snapshots, preserved historical audit snapshots and unchanged international terms/routing. Embedded PostgreSQL and mocked email transport were used. The existing responsive three-card layout is retained; browser use is disabled in Work settings, so the longer copy and stale-review interaction still require a fresh mobile browser acceptance check. Existing pre-launch service, scheduler, privacy/retention and final technical/commercial decisions remain outstanding. Recruitment stays closed/unlisted, both pages stay noindexed, and PR #7 remains draft. No live emails, production migrations, merges or production settings changes are authorised by this refinement.

Commercial-refinement final checks: TypeScript, targeted ESLint, production build and closed-state HTTP smoke tests passed. The rebuilt loopback preview was checked for all three new card labels, the non-binding EOI explanation and the v2 UK purchase-boundary declaration. Both recruitment flags were explicitly false; form submission returned 503, the fieldset was disabled, both programme pages were noindexed, and Research/sitemap listing stayed hidden. No live email or production migration was run.

## Commercial terms UX refinement — UK offer version 3

Only the commercial section was redesigned, through `components/vcse-commercial-terms.tsx` and the section reference in the landing page. It uses the approved headline and explanatory hierarchy, three equally treated off-white cards, consistent decorative Lucide receipt/percentage/check icons, dark labels and deeper orange figures. Cards are single-column below the tablet breakpoint, three-column from tablet, with payment/infrastructure blocks stacking until desktop. No text truncation, clipping, selection restriction or colour-dependent meaning is introduced.

All opaque text/icon/card-border colour pairs are checked mathematically against the requested WCAG thresholds (normal text >=4.5:1, large figures also >=4.5:1, icons/boundaries >=3:1). This verifies the authored colour palette, not a complete browser accessibility audit.

New immutable UK offer: `vcse-uk-2026-10-24-v3`. Previous v1/v2 definitions and historical audits are untouched. Standard price £2,500, selected discount 50%, selected implementation price £1,250 and provisional hosting £20/month are unchanged. Both instalment plans still total £1,250. The signed UK offer and displayed section derive from the same v3 definition. Older UK offer snapshots require the existing explicit re-review process. UK declarations remain v2; international offer/declarations remain v1; form behaviour, the pre-declaration explanation, routing, privacy version and migrations are unchanged.

19 automated tests pass, including rendered copy/signed-offer consistency, semantic card/icon structure, contrast, payment-plan totals, stale v2 rejection and preservation of v2 historical audit snapshots. Existing routing/individual-acknowledgement tests remain in the suite. Browser access was disabled in Work settings when screenshot capture was attempted; no new before/after screenshots or 320/390/768/1440 visual checks can be claimed unless browser access is restored. Earlier screenshots do not depict this redesign. Live staging services, scheduler/bot setup, privacy/retention and final support/VAT decisions remain pre-launch prerequisites. Recruitment and listing stay closed; no production action is included.

UX final verification: production build, TypeScript, targeted lint and all 19 automated tests passed. Closed-state HTTP checks passed with OPEN/LISTED explicitly false. Local comparison endpoints were checked for old/new headings and labels, disabled forms, and a script-free baseline: before at `http://127.0.0.1:3106/#commercial-terms` (read-only rendering from d994e68 with the same site assets), after at `http://127.0.0.1:3104/research/vcse-digital-workspace#commercial-terms`. Actual screenshot capture and 320/390/768/1440 viewport verification remain outstanding: browser inventory still reported “Local browser use is disabled in Work settings”, including after reconnecting following the user's intention to enable it. No before/after screenshot is claimed. Measured palette contrast: figures/card 5.71:1, labels/card 14.24:1, icons/card 7.22:1, borders/card 3.64:1 and secondary text/dark background 9.92:1.
