-- Apply with the database owner's SQL editor before enabling social sign-in.
-- No schedules or customer records are seeded. Payments support test mode only.
BEGIN;
CREATE TABLE IF NOT EXISTS members (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 provider text NOT NULL CHECK(provider IN ('naver','google')),
 subject_hash text NOT NULL,
 display_name text NOT NULL,
 email text,
 consent_version text NOT NULL,
 consented_at timestamptz NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 last_login_at timestamptz NOT NULL DEFAULT now(),
 revoked_at timestamptz,
 UNIQUE(provider,subject_hash)
);
CREATE TABLE IF NOT EXISTS tour_sessions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 tour_id text NOT NULL CHECK(tour_id IN ('museum','night','bulguksa')),
 travel_date date NOT NULL,
 travel_time text NOT NULL CHECK(travel_time IN ('10:00','14:00','18:30','19:00')),
 capacity integer NOT NULL CHECK(capacity BETWEEN 1 AND 20),
 reserved integer NOT NULL DEFAULT 0 CHECK(reserved BETWEEN 0 AND capacity),
 active boolean NOT NULL DEFAULT false,
 is_test boolean NOT NULL DEFAULT true CHECK(is_test=true),
 UNIQUE(tour_id,travel_date,travel_time)
);
CREATE TABLE IF NOT EXISTS orders (
 id text PRIMARY KEY,
 member_id uuid NOT NULL REFERENCES members(id),
 session_id uuid NOT NULL REFERENCES tour_sessions(id),
 tour_id text NOT NULL,
 tour_name text NOT NULL,
 travel_date date NOT NULL,
 travel_time text NOT NULL,
 adult_count integer NOT NULL CHECK(adult_count BETWEEN 1 AND 20),
 child_count integer NOT NULL CHECK(child_count BETWEEN 0 AND 19),
 amount integer NOT NULL CHECK(amount>0),
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirming','paid','failed','expired')),
 payment_key text UNIQUE,
 is_test boolean NOT NULL DEFAULT true CHECK(is_test=true),
 created_at timestamptz NOT NULL DEFAULT now(),
 expires_at timestamptz NOT NULL DEFAULT now()+interval '15 minutes',
 paid_at timestamptz,
 CHECK(adult_count+child_count<=20)
);
CREATE INDEX IF NOT EXISTS orders_member_created ON orders(member_id,created_at DESC);
CREATE INDEX IF NOT EXISTS orders_pending_expiry ON orders(expires_at) WHERE status='pending';

CREATE OR REPLACE FUNCTION release_order_capacity() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF OLD.status IN ('pending','confirming') AND NEW.status IN ('failed','expired') THEN
  UPDATE tour_sessions SET reserved=reserved-OLD.adult_count-OLD.child_count WHERE id=OLD.session_id;
 END IF;
 RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS release_capacity ON orders;
CREATE TRIGGER release_capacity AFTER UPDATE OF status ON orders FOR EACH ROW EXECUTE FUNCTION release_order_capacity();

CREATE OR REPLACE FUNCTION create_test_order(
 p_order_id text,p_member_id uuid,p_tour_id text,p_tour_name text,p_date date,p_time text,p_adults integer,p_children integer,p_amount integer
) RETURNS SETOF orders LANGUAGE plpgsql AS $$
DECLARE slot_id uuid;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM members WHERE id=p_member_id AND revoked_at IS NULL) THEN RAISE EXCEPTION 'MEMBER_UNAVAILABLE'; END IF;
 IF p_adults<1 OR p_children<0 OR p_adults+p_children>20 OR p_amount<=0 THEN RAISE EXCEPTION 'INVALID_ORDER'; END IF;
 -- Only untouched pending orders can expire. An uncertain confirmation is held for reconciliation.
 UPDATE orders SET status='expired' WHERE status='pending' AND expires_at<now();
 UPDATE tour_sessions SET reserved=reserved+p_adults+p_children
 WHERE tour_id=p_tour_id AND travel_date=p_date AND travel_time=p_time AND active=true AND is_test=true
 AND capacity-reserved>=p_adults+p_children RETURNING id INTO slot_id;
 IF slot_id IS NULL THEN RAISE EXCEPTION 'SLOT_UNAVAILABLE'; END IF;
 RETURN QUERY INSERT INTO orders(id,member_id,session_id,tour_id,tour_name,travel_date,travel_time,adult_count,child_count,amount)
 VALUES(p_order_id,p_member_id,slot_id,p_tour_id,p_tour_name,p_date,p_time,p_adults,p_children,p_amount) RETURNING *;
END;
$$;
COMMIT;
