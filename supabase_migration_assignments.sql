-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    class TEXT,
    due_date DATE,
    total_points INTEGER NOT NULL CHECK (total_points > 0),
    instructions TEXT NOT NULL,
    rubric TEXT NOT NULL,
    language TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_assignments_user_id ON assignments(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_assignments_created_at ON assignments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own assignments
CREATE POLICY "Users can view their own assignments"
    ON assignments
    FOR SELECT
    USING (auth.jwt() ->> 'sub' = user_id);

-- Create policy to allow users to insert their own assignments
CREATE POLICY "Users can insert their own assignments"
    ON assignments
    FOR INSERT
    WITH CHECK (auth.jwt() ->> 'sub' = user_id);

-- Create policy to allow users to update their own assignments
CREATE POLICY "Users can update their own assignments"
    ON assignments
    FOR UPDATE
    USING (auth.jwt() ->> 'sub' = user_id);

-- Create policy to allow users to delete their own assignments
CREATE POLICY "Users can delete their own assignments"
    ON assignments
    FOR DELETE
    USING (auth.jwt() ->> 'sub' = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_assignments_updated_at
    BEFORE UPDATE ON assignments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
