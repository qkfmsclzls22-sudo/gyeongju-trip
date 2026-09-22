BEGIN;
CREATE TABLE IF NOT EXISTS gj_members (
  id uuid PRIMARY KEY,
  provider text NOT NULL CHECK (provider IN ('naver','google')),
  provider_account_id text NOT NULL,
  name text NOT NULL DEFAULT '',
  email text,
  terms_version text,
  consent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_account_id)
);
CREATE TABLE IF NOT EXISTS gj_sessions (
  id uuid PRIMARY KEY,
  tour_id text NOT NULL CHECK (tour_id IN ('museum','night','bulguksa')),
  starts_at timestamptz NOT NULL,
  capacity integer NOT NULL CHECK (capacity BETWEEN 1 AND 1000),
  min_people integer NOT NULL CHECK (min_people BETWEEN 1 AND 1000),
  adult_price integer NOT NULL CHECK (adult_price BETWEEN 100 AND 1000000),
  child_price integer NOT NULL CHECK (child_price BETWEEN 100 AND 1000000),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed','confirmed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(tour_id, starts_at)
);
CREATE TABLE IF NOT EXISTS gj_bookings (
  id uuid PRIMARY KEY,
  member_id uuid NOT NULL REFERENCES gj_members(id),
  session_id uuid NOT NULL REFERENCES gj_sessions(id),
  request_id uuid NOT NULL,
  adult_count integer NOT NULL CHECK (adult_count BETWEEN 0 AND 20),
  child_count integer NOT NULL CHECK (child_count BETWEEN 0 AND 20),
  amount integer NOT NULL CHECK (amount > 0),
  name text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirming','paid','cancel_requested','refund_pending','refunded','cancelled')),
  payment_key text UNIQUE,
  paid_at timestamptz,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '15 minutes'),
  cancel_reason text,
  refund_amount integer CHECK (refund_amount >= 0 AND refund_amount <= amount),
  consent_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (adult_count + child_count BETWEEN 1 AND 20),
  UNIQUE(member_id, request_id)
);
CREATE INDEX IF NOT EXISTS gj_bookings_session_idx ON gj_bookings(session_id, status);
CREATE INDEX IF NOT EXISTS gj_bookings_member_idx ON gj_bookings(member_id, created_at DESC);
CREATE TABLE IF NOT EXISTS gj_booking_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  booking_id uuid REFERENCES gj_bookings(id),
  actor_id uuid REFERENCES gj_members(id),
  event text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMIT;
