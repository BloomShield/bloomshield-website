# C07 migration and runtime grant verification

**26 October update: PASS — actual Neon staging for migrations/runtime permissions and fictional persistence.** Project `long-bar-21726499`, London `aws-eu-west-2`, database `neondb`, synthetic-only branch `br-hidden-violet-zaboc8g7` verified empty before migrations 001–007 committed. See [current acceptance](c07-acceptance.md) and [migration register/runtime setup](c07-neon-staging.md). Backup restoration and protected website/email acceptance remain BLOCKED. The procedure below also applies to future fresh staging setups; do not rerun against this now-populated database.

## Operator migration procedure

1. Record the approved synthetic-only project ID, fresh branch ID, database name, endpoint, region and authorised schema owner in restricted evidence. Verify these in the Neon console and with `SELECT current_database(), current_user, session_user;` over TLS. Compare endpoint/project/branch to the approved inventory, not merely an environment variable label. Do not inspect/import live contact records. Stop on identity mismatch or any unexpected data.
2. Confirm a fresh empty database, or establish synthetic provenance of an existing staging database and review schema/migration history. Back up only that synthetic staging database before changes. A branch copied from production is not acceptable isolation.
3. As schema owner only, review and execute 001_vcse_eoi.sql → 002_vcse_international_interest.sql → 003_vcse_declaration_audit.sql → 004_vcse_structured_answers.sql → 005_admin_auth.sql → 006_admin_management.sql → 007_admin_grants.psql. Use psql with ON_ERROR_STOP and its normal protected connection configuration, never a connection URI in retained command output. Supply the approved existing `admin_runtime_role` to 007. Do not blindly rerun one-time migrations. Skip only where ledger plus actual schema/constraint/function/grant inspection prove application; file presence is insufficient.
4. Record file SHA-256, application time, operator, database identity, transaction outcome and verification result in a restricted migration register. Migration files 005/006 are not an automatic idempotent runner. Do not manufacture ledger entries for historical migrations.
5. Create independent non-owner public-intake and admin runtime roles using SQL, not Neon's Console/API/CLI role creation (those grant neon_superuser membership). Use LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS with independently generated passwords supplied privately. No schema ownership or inherited owner membership. Review PUBLIC/default/schema privileges and role inheritance. Apply the public writer grants from the EOI handover only after reviewing their actual table operations; 007 configures admin grants, not the intake role. Avoid broad default grants to future auth/management tables.
6. Connect separately using each actual runtime credential and execute the matrix below. SET ROLE by an owner alone is insufficient evidence of runtime connection identity. Keep source fixtures and expected results synthetic; roll back destructive negative probes. Recheck source rows and audit after tests.

## Required live permission matrix

Current executed results are in c07-acceptance.md. Actual Neon credential, source/audit denial, reviewer DAL, concurrency and audit rollback probes passed. Browser/admin MFA and mail delivery parts of this matrix remain BLOCKED; do not infer them from database checks.

| Principal | Positive operation | Required denial / invariant |
| --- | --- | --- |
| Intake | Submit both routes, rate buckets, atomic source/outbox insertion, delivery claim/update/reconciliation | Cannot SELECT auth users/accounts/sessions, access grants, management or audit; cannot change schema or acquire owner role |
| Intake | Insert with owner-controlled management trigger | Trigger creates exactly one management row without direct management grants |
| Admin runtime | Read source and limited delivery columns; auth and scoped management operations | Cannot INSERT/UPDATE/DELETE/TRUNCATE original EOI, declarations or source history; cannot change schema |
| Both normal runtimes | Authorised operations only | Cannot UPDATE/DELETE/TRUNCATE audit or disable its trigger; cannot inherit ownership |
| Administrator via application | Assign reviewer and final selection/user management | Requires active grant and administrator MFA |
| Reviewer via application | Assigned UUID read/update and scoped reports | Unassigned UUID, aggregate counts/search, reassignment, final selection and user management denied |
| Management service | Concurrent update with same version | Exactly one commit; loser conflict; no source change |
| Management service | Inject isolated audit-insert failure inside test transaction | Management change rolls back; no orphan mutation or misleading audit |

Reviewer restriction is application SQL scoping, not a separate database identity per reviewer. The shared admin runtime is trusted server infrastructure; never expose its credential to reviewers or claim database RLS isolation. Inspect table/column privileges, role memberships and schema CREATE permissions in addition to executing probes. 007 cannot erase privileges inherited through an unrelated role; any such membership must be removed before acceptance. Preserve source answers and receipts. Do not use runtime credentials for migrations.

Backup/restore tests and RPO/RTO require [governance approval](c07-governance.md).

## Reviewed migration file identities

These hashes identify reviewed source files, not applied live migrations.

- `001_vcse_eoi.sql` — `162e3e6a1c489592d05ffc21a3341a9a06a3882f86073e4f8d0e8ae1737a633f`
- `002_vcse_international_interest.sql` — `5f736c03398d226c97c7bc25571185f30a2347859cfaff08e07c3bb960d4717e`
- `003_vcse_declaration_audit.sql` — `5aaddd404744fbb3f98531bd106489b55c22f40f57bf9b436f1a978f4cbc1311`
- `004_vcse_structured_answers.sql` — `02b5c1ead68cafbe4661996af86be45a6096d9524717988868c4b5fc93d11e0e`
- `005_admin_auth.sql` — `80cfd92c6019f14225969f1896d6d22309b59e483b42f20f98859f6f3dd988f2`
- `006_admin_management.sql` — `3328fdfb384fddc73948703460e8906948465b03de876ed0643f85d0320c3680`
- `007_admin_grants.psql` — `b4a4634eb0050f0f874434b682df934606e6f641a4904f724061c38058225d92`
