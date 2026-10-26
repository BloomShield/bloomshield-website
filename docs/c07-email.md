# C07 email, webhook and retry verification

All external email checks: **BLOCKED — not testable without configuration/credentials**. No messages were sent to real or dummy external recipients during C07. No authenticated retry scheduler was provisioned. Local outbox/webhook tests passed; this is not Resend delivery evidence.

## Operator acceptance procedure

Use an isolated Resend key/account configuration with verified sender domain and approved individually controlled dummy applicant/team/staff mailboxes. Do not reuse the contact-form recipient defaults. Verify sender ownership, test restrictions, webhook endpoint and tracking disabled in the provider console. Do not assume mailbox delivery from a successful send API response.

For a fictional UK and international EOI, correlate receipt/application ID, outbox job IDs, provider IDs and redacted mailbox evidence. Verify applicant acknowledgement and internal notification wording/route, one source application and two jobs for concurrent identical submissions, and stable receipt/idempotency keys on repeated attempts. Verify persistent outbox on service failure and recovery. Record expected versus actual state and UTC timestamps without addresses, bodies or secrets in public evidence.

Invite an authorised dummy staff account and verify setup/reset messages and single-use/expired links. Current C06 staff invitations/resets use direct Better Auth email delivery, not the EOI durable outbox. A failed invitation leaves an inaccessible account; correct service configuration and request a fresh reset. Do not claim durable staff-email retries from the EOI outbox tests.

Configure a dedicated signed webhook for email.delivered, email.delivery_delayed, email.bounced, email.failed, email.complained and email.suppressed. Use provider-supported synthetic events/addresses and current provider instructions; do not deliberately harm real recipient reputation. Verify valid signature, invalid signature, stale/tampered payload, replay, early event reconciliation and unknown event handling. Confirm stored delivered/delayed/bounced/provider_failed/complained/suppressed states. Provider acceptance is only sent, not delivered. Verify HTTPS protection allows only authorised callbacks without opening the application.

## Retry scheduler specification (not provisioned)

Preserve C04/C06 policy from vcse-eoi-handover.md: trusted server-side scheduler POSTs /api/vcse-eoi/retry every 15 minutes, Authorization bearer secret resolved from secure server-side storage. No token in URL, browser, committed scheduler file or logs. Use an independent staging secret and any separate narrowly scoped deployment-protection credential. Restrict to one concurrent execution, bound timeouts and verify hosting function-duration allowance before enabling; endpoint processes at most ten jobs. The existing recommendation allows five minutes; if unavailable on the approved plan, review batch/runtime fit before scheduling. Do not purchase a plan.

Transient send failures become eligible after 30 minutes. Five-minute expired leases recover abandoned work; maximum eight attempts within 23 hours using the same provider idempotency key. Verify overlapping scheduler calls cannot double claim. Test disabled/wrong bearer, normal run, endpoint failure alert, backlog/outstanding alert, recovered lease and exhausted attempt. Permanent bounce, complaint, suppression and provider-failure outcomes must not be automatically resent. Review old unconfirmed sends with provider evidence before any manual resend; never reset attempts blindly outside the idempotency window.

An assigned operator checks unresolved jobs and provider/webhook failures at least daily. Alert messages must exclude applicant content. Record actual scheduler identity, schedule, secret-store reference (not value), concurrency control, last successful execution and alert receipt before acceptance.
