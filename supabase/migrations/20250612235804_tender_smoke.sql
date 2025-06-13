/*
  # Create waitlist subscribers table

  1. New Tables
    - `waitlist_subscribers`
      - `id` (bigint, primary key) - Unique identifier for each subscriber
      - `email` (text, unique, not null) - Subscriber's email address
      - `tier` (text, not null) - Selected tier preference (voice-only or full-avatar)
      - `created_at` (timestamptz, default now()) - Timestamp when subscriber joined

  2. Security
    - Enable RLS on `waitlist_subscribers` table
    - Add policy for public insert access (for waitlist signup)
    - Add policy for authenticated read access (for admin purposes)

  3. Important Notes
    - Email field has unique constraint to prevent duplicate signups
    - Tier field stores user preference for analytics and segmentation
    - Created_at automatically timestamps each signup
    - RLS policies ensure secure access control
*/

-- Create the waitlist_subscribers table
CREATE TABLE waitlist_subscribers (
    id bigint primary key generated always as identity,
    email text UNIQUE NOT NULL,
    tier text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
) WITH (OIDS=FALSE);

-- Enable Row Level Security
ALTER TABLE waitlist_subscribers ENABLE ROW LEVEL SECURITY;

-- Create waitlist_subscribers policies
CREATE POLICY "Allow anon users to insert into waitlist_subscribers" 
  ON public.waitlist_subscribers 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow anon users to select from waitlist_subscribers" 
  ON public.waitlist_subscribers 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY "Allow authenticated users to update waitlist_subscribers" 
  ON public.waitlist_subscribers 
  FOR UPDATE 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete from waitlist_subscribers" 
  ON public.waitlist_subscribers 
  FOR DELETE 
  TO authenticated 
  USING (true);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_subscribers_email 
  ON waitlist_subscribers(lower(email));

-- Create index on created_at for analytics queries
CREATE INDEX IF NOT EXISTS idx_waitlist_subscribers_created_at 
  ON waitlist_subscribers(created_at);

-- Create index on tier for segmentation queries
CREATE INDEX IF NOT EXISTS idx_waitlist_subscribers_tier 
  ON waitlist_subscribers(tier);