-- Re-enable Row Level Security on both tables
-- This ensures the tables are NOT publicly accessible via the API

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that use auth.uid() (Supabase Auth)
DROP POLICY IF EXISTS "Users can delete their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can insert their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can read their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can update their own submissions" ON public.submissions;

DROP POLICY IF EXISTS "Users can insert their own assignments" ON public.assignments;
DROP POLICY IF EXISTS "Users can read their own assignments" ON public.assignments;
DROP POLICY IF EXISTS "Users can update their own assignments" ON public.assignments;
DROP POLICY IF EXISTS "Users can delete their own assignments" ON public.assignments;

-- Create restrictive policies that block all direct access
-- Your API routes will use the service role key which bypasses RLS
-- This prevents any direct access to the tables via Supabase client

CREATE POLICY "Block all direct access to assignments"
    ON public.assignments
    FOR ALL
    TO PUBLIC
    USING (false)
    WITH CHECK (false);

CREATE POLICY "Block all direct access to submissions"
    ON public.submissions
    FOR ALL
    TO PUBLIC
    USING (false)
    WITH CHECK (false);

-- These policies ensure that:
-- 1. No one can access these tables directly via Supabase API
-- 2. Only your server-side code using SUPABASE_SERVICE_ROLE_KEY can access the data
-- 3. Your Clerk authentication in API routes controls who can see what
-- 4. Student data remains FERPA compliant and private
