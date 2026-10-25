-- DUMMY STAGING ONLY. Apply as schema owner, after 001–004 and Better Auth schema.
BEGIN;
CREATE TABLE admin_access (
 user_id text PRIMARY KEY REFERENCES "user"(id),
 role text NOT NULL CHECK(role IN ('Administrator','Programme Reviewer')),
 active boolean NOT NULL DEFAULT true
);
CREATE TABLE admin_session_activity (
 session_id text PRIMARY KEY REFERENCES session(id) ON DELETE CASCADE,
 last_seen timestamptz NOT NULL
);
CREATE TABLE admin_auth_attempt (
 key text PRIMARY KEY,
 count integer NOT NULL,
 expires_at timestamptz NOT NULL
);
CREATE TABLE admin_management (
 application_id uuid PRIMARY KEY REFERENCES vcse_eoi(id),
 reviewer_id text REFERENCES admin_access(user_id),
 version integer NOT NULL DEFAULT 0,
 data jsonb NOT NULL DEFAULT '{"status":"New","classification":"Not yet classified","reviewer":"","nextAction":"","due":"","notes":"","research":{},"wtp":{},"history":[]}'
);
CREATE TABLE admin_audit (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 at timestamptz NOT NULL DEFAULT now(),
 actor text,
 action text NOT NULL,
 application_id uuid,
 fields jsonb NOT NULL DEFAULT '[]'
);
CREATE FUNCTION admin_no_audit_mutation() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Audit is append only'; END $$;
CREATE TRIGGER admin_audit_immutable BEFORE UPDATE OR DELETE ON admin_audit
 FOR EACH ROW EXECUTE FUNCTION admin_no_audit_mutation();
CREATE FUNCTION admin_initialize_management() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
BEGIN INSERT INTO public.admin_management(application_id) VALUES(NEW.id); RETURN NEW; END $$;
REVOKE ALL ON FUNCTION admin_initialize_management() FROM PUBLIC;
CREATE TRIGGER admin_new_eoi AFTER INSERT ON vcse_eoi FOR EACH ROW EXECUTE FUNCTION admin_initialize_management();
INSERT INTO admin_management(application_id) SELECT id FROM vcse_eoi ON CONFLICT DO NOTHING;
REVOKE ALL ON admin_access,admin_management,admin_audit,admin_session_activity,admin_auth_attempt FROM PUBLIC;
-- Runtime role must not own tables. Grant source SELECT only, no source mutation.
-- Runtime may SELECT/INSERT/UPDATE management/access; SELECT/INSERT audit only.
-- Apply concrete grants with an approved role name; never use public EOI writer.
COMMIT;
