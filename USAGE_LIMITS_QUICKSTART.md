# Quick Start Guide: VAPI Usage Limits

## ⚠️ IMPORTANT: Run Migration First!

Before testing, you **MUST** apply the database migration:

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase_migration_add_call_duration.sql`
4. Paste and execute

## What's Been Implemented

✅ **30 minutes per day** limit for free users  
✅ **150 minutes per month** limit for free users  
✅ **Unlimited usage** for Pro users  
✅ **Automatic tracking** of call durations  
✅ **Usage display** on history page  
✅ **Limit enforcement** prevents calls when exceeded

## Free Tier Limits

| Limit Type | Amount       |
| ---------- | ------------ |
| Daily      | 30 minutes   |
| Monthly    | 150 minutes  |
| Pro Plan   | ♾️ Unlimited |

## User Experience

### When Starting a Call:

-   ✅ **Under limit**: Call starts normally
-   ⚠️ **Limit reached**: Shows warning message and blocks call
-   💎 **Pro user**: No limits, always allowed

### On History Page:

Free users see additional cards:

-   **Daily Minutes Used**: 15/30
-   **Monthly Minutes Used**: 87/150

### Limit Messages:

-   **Daily**: "You've reached your daily limit of 30 minutes. Resets tomorrow!"
-   **Monthly**: "You've reached your monthly limit of 150 minutes. Upgrade to Pro for unlimited usage!"

## Testing

1. **Apply migration** (see above)
2. **Start a tutoring session** as a free user
3. **Let it run for 2-3 minutes**
4. **End the session**
5. **Check history page** - should see minutes tracked
6. **Repeat** until you hit 30 minutes
7. **Try to start another** - should be blocked with message

## Files Changed

-   ✏️ `lib/actions/tutor.actions.ts` - Backend logic
-   ✏️ `components/TutorComponent.tsx` - Call tracking & limits
-   ✏️ `app/ai-tutors/history/page.tsx` - Usage display
-   📄 `supabase_migration_add_call_duration.sql` - Database migration
-   📖 `USAGE_LIMITS_IMPLEMENTATION.md` - Full documentation

## Need Help?

See `USAGE_LIMITS_IMPLEMENTATION.md` for complete technical details.
