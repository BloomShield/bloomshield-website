-- Additive only. Legacy payloads/choice labels remain untouched, with NULL v2
-- metadata/codes. Do not classify legacy records using guesses or text matching.
BEGIN;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS answer_schema_version text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS discovery_readiness_code text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS expenditure_approver_code text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS implementation_timing_code text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS uk_funding_code text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS international_paid_discussion_code text;
COMMIT;
