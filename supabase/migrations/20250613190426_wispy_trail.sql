/*
  # Earlybird System Implementation

  1. Schema Changes
    - Add `early_bird` boolean column to `waitlist_subscribers` table
    - Create `waitlist_meta` table to store configuration (early bird cap)
    - Backfill existing subscribers: mark first 250 as early birds

  2. Automation
    - Create `wl_flag_early_bird()` function to automatically set early bird status
    - Add `trg_early_bird` trigger on INSERT to execute the function
    - Future subscribers will be marked as early birds if under the cap

  3. Performance Optimization
    - Create `v_waitlist_rank` view for efficient ranking queries
    - Add composite index `idx_waitlist_rank` for optimal ORDER BY performance
    - Ranking logic: early birds first, then by referrals, then FIFO

  4. Configuration
    - Early bird cap set to 250 subscribers
    - Configurable via `waitlist_meta.early_bird_cap`
    - Can be adjusted without code changes

  5. Ranking System
    - Position calculated by: early_bird DESC, referrals DESC, created_at ASC
    - Early birds get priority positions regardless of join date
    - Referral count acts as secondary ranking factor
    - Created timestamp provides FIFO tie-breaking
*/

-- 1 Schema change & backfill

-- 1.1 Add the column (if not yet)
ALTER TABLE public.waitlist_subscribers
  ADD COLUMN IF NOT EXISTS early_bird boolean DEFAULT FALSE;

-- 1.2 Mark the first 250 sign-ups as early birds
WITH first_n AS (
  SELECT id
  FROM   public.waitlist_subscribers
  ORDER  BY created_at    -- or id
  LIMIT  250
)
UPDATE public.waitlist_subscribers
SET    early_bird = TRUE
WHERE  id IN (SELECT id FROM first_n);

-- 2 Trigger to set early_bird for future inserts
CREATE TABLE IF NOT EXISTS waitlist_meta (
  early_bird_cap int default 250
);
INSERT INTO waitlist_meta DEFAULT VALUES ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION wl_flag_early_bird()
RETURNS trigger AS $$
DECLARE cap int;
BEGIN
  SELECT early_bird_cap INTO cap FROM waitlist_meta LIMIT 1;
  -- still room?
  IF (SELECT COUNT(*) FROM public.waitlist_subscribers WHERE early_bird) < cap THEN
      NEW.early_bird := TRUE;
  ELSE
      NEW.early_bird := FALSE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_early_bird
BEFORE INSERT ON public.waitlist_subscribers
FOR EACH ROW EXECUTE PROCEDURE wl_flag_early_bird();

-- 3 Fast ranking view
CREATE OR REPLACE VIEW v_waitlist_rank AS
SELECT
  id,
  email,
  tier,
  early_bird,
  referrals_count as referrals,
  ROW_NUMBER() OVER (
      ORDER BY
        early_bird DESC,   -- bucket first
        referrals_count DESC,    -- top referrers next
        created_at         -- FIFO tie-break
  ) AS position
FROM public.waitlist_subscribers;

-- 4 Helpful indexes
-- One composite index covers the ORDER BY
CREATE INDEX IF NOT EXISTS idx_waitlist_rank
  ON public.waitlist_subscribers
      (early_bird DESC, referrals_count DESC, created_at);