-- Create submissions table
create table if not exists public.submissions (
    id uuid primary key default gen_random_uuid(),
    assignment_id uuid not null references public.assignments(id) on delete cascade,
    user_id text not null, -- clerk user id of the teacher who graded this
    student_name text not null,
    submitted_code text not null,
    language text not null,
    
    -- Grading results from GPT
    grade numeric not null, -- The total score earned
    total_points numeric not null, -- The total points possible (from assignment)
    feedback jsonb not null, -- Store the full GradeResponse from GPT API
    
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.submissions enable row level security;

-- Allow users to insert their own submissions
create policy "Users can insert their own submissions"
    on public.submissions
    for insert
    to authenticated
    with check (auth.uid()::text = user_id);

-- Allow users to read their own submissions
create policy "Users can read their own submissions"
    on public.submissions
    for select
    to authenticated
    using (auth.uid()::text = user_id);

-- Allow users to update their own submissions
create policy "Users can update their own submissions"
    on public.submissions
    for update
    to authenticated
    using (auth.uid()::text = user_id)
    with check (auth.uid()::text = user_id);

-- Allow users to delete their own submissions
create policy "Users can delete their own submissions"
    on public.submissions
    for delete
    to authenticated
    using (auth.uid()::text = user_id);

-- Create indexes for better performance
create index if not exists idx_submissions_assignment_id on public.submissions(assignment_id);
create index if not exists idx_submissions_user_id on public.submissions(user_id);
create index if not exists idx_submissions_created_at on public.submissions(created_at desc);

-- Create updated_at trigger
create or replace function public.handle_submissions_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_submissions_updated_at
    before update on public.submissions
    for each row
    execute function public.handle_submissions_updated_at();
