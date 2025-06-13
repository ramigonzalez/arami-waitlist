/*
  # Add referral system to waitlist subscribers

  1. New Columns
    - `ref_code` (text, unique) - Unique referral code for each subscriber
    - `ref_by` (text, nullable) - Referral code of the user who referred this subscriber
    - `referrals_count` (integer, default 0) - Count of successful referrals made by this user

  2. Functions
    - `generate_ref_code()` - Function to generate unique 8-character referral codes
    - `update_referral_count()` - Trigger function to increment referral count

  3. Triggers
    - Automatically generate ref_code on insert
    - Automatically update referrals_count when someone is referred

  4. Indexes
    - Index on ref_code for fast lookups
    - Index on ref_by for referral analytics
    - Index on referrals_count & created_at for leaderboards and ranking

  5. Security
    - Update existing RLS policies to handle new columns
    - Add policy for public ref_code lookups (for validation)
*/

-- Add new columns to waitlist_subscribers table
ALTER TABLE waitlist_subscribers 
ADD COLUMN IF NOT EXISTS ref_code text UNIQUE,
ADD COLUMN IF NOT EXISTS ref_by text references waitlist_subscribers (ref_code),
ADD COLUMN IF NOT EXISTS referrals_count integer DEFAULT 0;

-- Create function to generate unique referral codes
CREATE OR REPLACE FUNCTION generate_ref_code()
RETURNS text AS $$
DECLARE
    chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result text := '';
    i integer;
    code_exists boolean;
BEGIN
    LOOP
        result := '';
        -- Generate 8-character code
        FOR i IN 1..8 LOOP
            result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
        
        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM waitlist_subscribers WHERE ref_code = result) INTO code_exists;
        
        -- Exit loop if code is unique
        IF NOT code_exists THEN
            EXIT;
        END IF;
    END LOOP;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create function to update referral count
CREATE OR REPLACE FUNCTION update_referral_count()
RETURNS trigger AS $$
BEGIN
    -- If new subscriber has a ref_by code, increment the referrer's count
    IF NEW.ref_by IS NOT NULL THEN
        UPDATE waitlist_subscribers 
        SET referrals_count = referrals_count + 1 
        WHERE ref_code = NEW.ref_by;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate ref_code on insert
CREATE OR REPLACE FUNCTION set_ref_code()
RETURNS trigger AS $$
BEGIN
    -- Generate ref_code if not provided
    IF NEW.ref_code IS NULL THEN
        NEW.ref_code := generate_ref_code();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_set_ref_code ON waitlist_subscribers;
CREATE TRIGGER trigger_set_ref_code
    BEFORE INSERT ON waitlist_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION set_ref_code();

DROP TRIGGER IF EXISTS trigger_update_referral_count ON waitlist_subscribers;
CREATE TRIGGER trigger_update_referral_count
    AFTER INSERT ON waitlist_subscribers
    FOR EACH ROW
    EXECUTE FUNCTION update_referral_count();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_subscribers_ref_code 
    ON waitlist_subscribers(ref_code);

CREATE INDEX IF NOT EXISTS idx_waitlist_subscribers_ref_by 
    ON waitlist_subscribers(ref_by);

create INDEX IF NOT EXISTS idx_waitlist_referrals_created
  ON waitlist_subscribers (referrals_count DESC, created_at ASC);

-- Add policy for public ref_code validation (needed for edge function)
CREATE POLICY "Allow public ref_code lookup"
    ON waitlist_subscribers
    FOR SELECT
    TO anon
    USING (true);

-- Update existing data with ref_codes (for existing subscribers)
UPDATE waitlist_subscribers 
SET ref_code = generate_ref_code() 
WHERE ref_code IS NULL;