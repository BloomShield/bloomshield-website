-- Run with the schema owner in the dedicated STAGING database first.
BEGIN;
CREATE TABLE IF NOT EXISTS vcse_eoi (
  id uuid PRIMARY KEY,
  fingerprint text NOT NULL UNIQUE,
  payload jsonb NOT NULL,
  privacy_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  retention_review_at timestamptz NOT NULL DEFAULT now() + interval '12 months'
);
CREATE TABLE IF NOT EXISTS vcse_eoi_delivery (
  id uuid PRIMARY KEY,
  application_id uuid NOT NULL REFERENCES vcse_eoi(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('applicant', 'team')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sending','sent','failed','delivered','bounced','complained','provider_failed','delayed','suppressed')),
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  last_error text,
  provider_id text,
  sent_at timestamptz,
  first_attempt_at timestamptz,
  delivery_event_at timestamptz,
  UNIQUE(application_id, kind)
);
CREATE INDEX IF NOT EXISTS vcse_eoi_delivery_due ON vcse_eoi_delivery(next_attempt_at) WHERE status IN ('pending','sending','failed');
CREATE TABLE IF NOT EXISTS vcse_eoi_rate (
  key text PRIMARY KEY,
  count integer NOT NULL DEFAULT 1,
  expires_at timestamptz NOT NULL
);
-- Minimal signed delivery events tolerate a webhook arriving before the send
-- response is saved. No address or message content is stored here.
CREATE TABLE IF NOT EXISTS vcse_eoi_events (
  provider_id text PRIMARY KEY,
  status text NOT NULL,
  event_at timestamptz NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);
-- No browser-facing API or anonymous database role is granted access.
REVOKE ALL ON vcse_eoi, vcse_eoi_delivery, vcse_eoi_rate, vcse_eoi_events FROM PUBLIC;
COMMIT;
