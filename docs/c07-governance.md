# C07 governance, backup and recovery register

No organisational/legal/contractual decision is self-approved. All decisions below are pending named management approval. Backup restoration is **BLOCKED — not testable without configuration/credentials**; no live backup, restore or recovery objective is verified.

| Decision | Required owner/approver | Evidence required before production |
| --- | --- | --- |
| Controller and privacy contact | BloomShield management/privacy lead | Named controller/contact and approved public wording |
| Lawful basis and privacy notice | Privacy lead/management | Approved purpose, lawful basis, notice/version and international route review |
| Processor terms and transfers | Management/privacy lead | Vercel/Neon/Resend agreements, subprocessors, actual regions and transfer assessment |
| Reviewer access | Programme access owner | Named role owner, least-privilege assignment approval and periodic review |
| Invitations and offboarding | Staff access owner | Identity verification, individual accounts, timely deactivation and session revocation |
| MFA recovery | Management-designated recovery owner | Independent identity verification and approved recovery authority |
| Retention/deletion | Privacy/data owner | Source/auth/audit/mail/log/backup periods and authorised deletion workflow |
| Backup/restoration | Technical recovery owner | Scope, encryption, access, restore drill and backup expiry |
| RPO and RTO | Management with recovery owner | Explicit approved objectives and measured restore result; neither assumed zero |
| Email retries, alerts and exceptions | Campaign operations owner | Scheduler, daily delivery review, escalation and permanent-failure process |
| Support and monitoring | Campaign lead/technical owner | Coverage, incident contacts, severity/escalation and dependency review |

## Lost administrator authenticator procedure

If a privately held unused recovery code exists, the individual may use the supported recovery flow; verify single use in staging and privately replace recovery material according to the approved procedure. Never collect codes in tickets or screenshots. A password reset does not remove MFA.

If authenticator and codes are lost, deny a shared bypass. An independently verified identity, role entitlement and management-approved recovery decision are required before a trusted operator intervention. Record approver, actor, reason and time without secret material. Revoke all sessions, perform a reviewed provider/library-supported recovery operation in a transaction where appropriate, require fresh MFA enrolment before records access, invalidate old recovery material, and test old-session denial. No unreviewed SQL recovery recipe or alternate public sign-in endpoint is authorised here. If no functioning administrator remains, escalate to the designated owner; do not bootstrap over the existing account restriction. Exact operator tooling must be rehearsed in synthetic staging before approval.

## Isolated restore drill

After confirming synthetic project identity, record configured backup/PITR retention and entitlement; do not assume paid capabilities. Create a synthetic marker/EOI, management change and audit entry with UTC time. Take the approved backup/restore point. Restore only into a new isolated synthetic target, never over production or the working staging source. Record restore start/end, recovered-through time, data-loss interval and access controls. Reconcile source receipt/version/declarations, outbox state, management version/assignment and audit actor/action/time; rerun actual runtime permission probes.

Keep restored app mail/scheduler disabled to avoid duplicate sends. Revoke copied sessions and reset isolated test credentials before exposing a restored application. Check secrets/encrypted MFA compatibility and provider-idempotency windows. Compare measured recovery with approved RPO/RTO. Confirm original source unchanged, restored target access restricted and disposal/backup expiry approved. No restore PASS until actual provider evidence exists.
