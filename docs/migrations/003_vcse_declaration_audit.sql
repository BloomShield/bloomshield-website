-- Additive audit migration. Historical values stay unknown: no acceptance or
-- version is inferred from a combined legacy acknowledgement or other fields.
BEGIN;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS selection_acknowledged boolean;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS purchase_boundary_acknowledged boolean;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS privacy_acknowledged boolean;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS submitted_at timestamptz;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS declaration_set_version text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS privacy_notice_version text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS offer_version text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS presented_enquiry_route text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS declaration_snapshot jsonb;
-- Default applies only to future inserts, not to existing rows.
ALTER TABLE vcse_eoi ALTER COLUMN submitted_at SET DEFAULT now();
COMMIT;
