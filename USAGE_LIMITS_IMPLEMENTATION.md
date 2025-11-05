# VAPI Usage Limits Implementation

This document describes the usage limit system implemented to prevent excessive spending on VAPI for free tier users.

## Overview

The system implements usage limits for free accounts:

-   **Daily Limit**: 30 minutes per day
-   **Monthly Limit**: 150 minutes per month
-   **Max Call Duration**: 60 minutes per single call (prevents 3-hour calls)
-   **Pro Users**: Unlimited usage (no limits enforced)

**Active Call Monitoring**: The system checks usage every 30 seconds during active calls and automatically terminates calls that exceed limits.

## Implementation Details

### 1. Database Schema

**New Column Added to `session_history` table:**

```sql
call_duration_seconds INTEGER DEFAULT 0
```

This column tracks the actual duration of each VAPI call in seconds.

**Migration File:** `supabase_migration_add_call_duration.sql`

To apply this migration, run the SQL in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase_migration_add_call_duration.sql`
4. Execute the query

### 2. Backend Functions (`lib/actions/tutor.actions.ts`)

#### New Functions:

**`updateSessionDuration(sessionHistoryId, durationSeconds)`**

-   Updates the `call_duration_seconds` field after a call ends
-   Called automatically when VAPI call disconnects

**`getUserUsageMinutes(userId)`**

-   Calculates daily and monthly usage for a user
-   Returns:
    ```typescript
    {
      dailyMinutes: number,      // Minutes used today
      monthlyMinutes: number,    // Minutes used this month
      dailyLimit: 30,            // Daily limit
      monthlyLimit: 150          // Monthly limit
    }
    ```

**`canStartVapiCall()`**

-   Checks if the current user can start a new VAPI call
-   Checks both daily and monthly limits
-   Pro users automatically pass
-   Returns:
    ```typescript
    {
      canStart: boolean,         // Can start call
      reason: "daily" | "monthly" | null,  // Why blocked
      usage: UsageData | null    // Current usage stats
    }
    ```

### 3. Frontend Integration (`components/TutorComponent.tsx`)

#### Call Duration Tracking:

-   Tracks call start time when VAPI call begins
-   Calculates duration when call ends
-   Automatically saves duration to database

#### Limit Enforcement:

-   Checks limits before allowing call to start
-   **Monitors usage every 30 seconds during active calls**
-   **Automatically terminates call if:**
    -   Daily or monthly limit is reached
    -   Single call exceeds 60 minutes (max call duration)
-   Displays appropriate error message if limit reached
-   Button disabled when limit is reached

#### User Experience:

-   Yellow warning message shows when limit reached
-   Message indicates whether daily or monthly limit was hit
-   Encourages users to upgrade to Pro plan

### 4. Usage Display (`app/ai-tutors/history/page.tsx`)

Free tier users see two additional cards on their history page:

-   **Daily Minutes Used**: Shows `X/30` minutes used today
-   **Monthly Minutes Used**: Shows `X/150` minutes used this month

Pro users don't see these cards (they have unlimited usage).

## How It Works

### Call Flow:

1. **User clicks "Start Session"**

    - System calls `canStartVapiCall()`
    - Checks if user is Pro (unlimited)
    - If free tier, checks daily and monthly usage
    - If limits exceeded, shows error and blocks call

2. **Call Starts**

    - Records start time
    - Creates session history record in database
    - Saves session history ID for later update

3. **During Call (Every 30 Seconds)**

    - Checks if call has exceeded 60 minutes
    - Checks if user has reached daily/monthly limits
    - If any limit exceeded, automatically terminates call
    - Shows appropriate warning message to user

4. **Call Ends**

    - Calculates duration (end time - start time)
    - Calls `updateSessionDuration()` to save duration
    - Duration is now tracked for future limit checks

5. **Usage Tracking**
    - Daily usage resets at midnight local time
    - Monthly usage resets on the 1st of each month
    - All calculations happen server-side for security
    - Active calls are monitored in real-time to prevent abuse

## Testing

### To Test the Implementation:

1. **Apply the database migration** first (required!)

2. **Test as Free User:**

    ```
    - Create a tutor
    - Start a session and let it run for 2-3 minutes
    - End the session
    - Check your history page - should see minutes tracked
    - Repeat until you hit 30 minutes in a day
    - Try to start another session - should be blocked
    ```

3. **Test as Pro User:**
    ```
    - Upgrade to Pro in Clerk dashboard
    - Should have no limits regardless of usage
    ```

## Clerk Plan Configuration

Make sure your Clerk pricing table includes these features:

-   Free tier: Should have `3_tutor_limit` or `10_tutor_limit` feature
-   Pro tier: Should have `pro` plan identifier

## Environment Variables

No new environment variables required. Uses existing:

-   `NEXT_PUBLIC_SUPABASE_URL`
-   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
-   Clerk authentication tokens

## Security Considerations

✅ **Server-side enforcement**: All limit checks happen on the server via server actions
✅ **Database-backed**: Usage is tracked in Supabase, not just in memory
✅ **Protected endpoints**: Uses Clerk authentication for all operations
✅ **Automatic cleanup**: No manual tracking needed - happens automatically

## Future Enhancements

Potential improvements for the future:

-   Email notifications when users approach limits
-   Grace period for users who slightly exceed limits
-   Different tier levels (e.g., 50 min, 100 min, unlimited)
-   Analytics dashboard showing usage trends
-   Webhook to VAPI to enforce limits at their API level

## Support

If users report issues:

1. Check Supabase logs for errors
2. Verify migration was applied: `SELECT column_name FROM information_schema.columns WHERE table_name = 'session_history' AND column_name = 'call_duration_seconds';`
3. Check Clerk plan configuration
4. Verify user's actual usage in database

## Files Modified

-   `lib/actions/tutor.actions.ts` - Added usage tracking functions
-   `components/TutorComponent.tsx` - Added limit checks and duration tracking
-   `app/ai-tutors/history/page.tsx` - Added usage display
-   `supabase_migration_add_call_duration.sql` - Database migration (NEW)

## Rollback

If you need to rollback:

```sql
-- Remove the column
ALTER TABLE session_history DROP COLUMN IF EXISTS call_duration_seconds;

-- Remove the index
DROP INDEX IF EXISTS idx_session_history_user_created;
```

Then revert the code changes in the files listed above.
