-- Additive upgrade: run after 001, including where 001 already holds submissions.
-- Earlier versions collected UK enquiries. Do not invent their operating countries.
BEGIN;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS operating_countries text[];
ALTER TABLE vcse_eoi ADD COLUMN IF NOT EXISTS enquiry_route text;
UPDATE vcse_eoi SET country = COALESCE(country, payload->>'country'),
  enquiry_route = COALESCE(enquiry_route, payload->>'enquiryRoute', 'uk_early_adopter')
WHERE country IS NULL OR enquiry_route IS NULL;
-- Existing NULL operating_countries means not collected; preserve original payload.
-- Country remains NULL for legacy records where it was not collected.
ALTER TABLE vcse_eoi ALTER COLUMN enquiry_route SET NOT NULL;
CREATE INDEX IF NOT EXISTS vcse_eoi_route_country ON vcse_eoi(enquiry_route, country);
COMMIT;
