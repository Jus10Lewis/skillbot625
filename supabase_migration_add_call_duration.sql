-- Migration: Add call_duration_seconds column to session_history table
-- This column tracks the actual duration of VAPI calls in seconds for usage limiting

-- Add the call_duration_seconds column to session_history table
ALTER TABLE session_history 
ADD COLUMN IF NOT EXISTS call_duration_seconds INTEGER DEFAULT 0;

-- Add an index on user_id and created_at for efficient usage queries
CREATE INDEX IF NOT EXISTS idx_session_history_user_created 
ON session_history(user_id, created_at DESC);

-- Add a comment to document the column
COMMENT ON COLUMN session_history.call_duration_seconds IS 
'Duration of the VAPI call in seconds. Used for tracking free tier usage limits.';
