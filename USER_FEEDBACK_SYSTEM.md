# User Feedback & Notifications for Usage Limits

## Overview

Complete user feedback system that keeps users informed about their usage limits at every step of their journey.

## Feedback Scenarios

### 1. **Before Starting a Call** (Proactive Warning)

**When:** User loads the tutor page with low remaining minutes
**Condition:**

-   ≤ 5 minutes remaining daily, OR
-   ≤ 20 minutes remaining monthly

**What User Sees:**

```
┌────────────────────────────────────────────┐
│ ⏰ Only 5 minutes remaining today          │
└────────────────────────────────────────────┘
```

**Styling:** Blue info box (non-blocking)
**Action:** User can still start a call, but they're warned

---

### 2. **Trying to Start When Over Limit** (Pre-call Block)

**When:** User clicks "Start Session" but has reached their limit
**Condition:** Already at daily or monthly limit

**What User Sees - Daily Limit:**

```
┌────────────────────────────────────────────────────────┐
│ ⚠️  Usage Limit Reached                                │
│                                                         │
│ You've reached your daily limit of 30 minutes.         │
│ Resets tomorrow!                                        │
│                                                         │
│ 💡 Your limit resets tomorrow, or upgrade to Pro for   │
│    unlimited usage. [Link]                              │
└────────────────────────────────────────────────────────┘

         [ Limit Reached ]  ← Button disabled
```

**What User Sees - Monthly Limit:**

```
┌────────────────────────────────────────────────────────┐
│ ⚠️  Usage Limit Reached                                │
│                                                         │
│ You've reached your monthly limit of 150 minutes.      │
│ Upgrade to Pro for unlimited usage!                    │
│                                                         │
│ 💡 Upgrade to Pro for unlimited voice tutoring         │
│    sessions. [Link]                                     │
└────────────────────────────────────────────────────────┘

         [ Limit Reached ]  ← Button disabled
```

**Styling:** Red alert box with warning icon
**Action:** Button is disabled, can't start call

---

### 3. **During Active Call - Auto Terminated** (In-call Limit Reached)

**When:** Call is automatically ended because limit was reached during the session
**Condition:** System detects limit exceeded during 30-second check

**What User Sees - Daily:**

```
┌────────────────────────────────────────────────────────┐
│ ⚠️  Usage Limit Reached                                │
│                                                         │
│ Your call was ended because you reached your daily     │
│ limit of 30 minutes.                                    │
│                                                         │
│ 💡 Your limit resets tomorrow, or upgrade to Pro for   │
│    unlimited usage. [Link]                              │
└────────────────────────────────────────────────────────┘

         [ Limit Reached ]  ← Button disabled
```

**What User Sees - Monthly:**

```
┌────────────────────────────────────────────────────────┐
│ ⚠️  Usage Limit Reached                                │
│                                                         │
│ Your call was ended because you reached your monthly   │
│ limit of 150 minutes.                                   │
│                                                         │
│ 💡 Upgrade to Pro for unlimited voice tutoring         │
│    sessions. [Link]                                     │
└────────────────────────────────────────────────────────┘

         [ Limit Reached ]  ← Button disabled
```

**Styling:** Red alert box with warning icon
**Action:** Call ended, button disabled, must upgrade or wait

---

### 4. **Max Call Duration Reached** (60 Minutes)

**When:** Single call reaches 60-minute maximum
**Condition:** Applies to ALL users (including Pro)

**What User Sees:**

```
┌────────────────────────────────────────────────────────┐
│ ⚠️  Usage Limit Reached                                │
│                                                         │
│ Your call was automatically ended after 60 minutes     │
│ (maximum call duration).                                │
│                                                         │
│ 💡 You can start a new session immediately.            │
└────────────────────────────────────────────────────────┘

         [ Start New Session ]  ← Button enabled!
```

**Styling:** Red alert box with warning icon
**Action:** User can immediately start a new call (button stays active)

---

## Visual Design

### Warning Levels

**1. Info (Blue) - Low Minutes Warning**

-   Background: `bg-blue-50`
-   Border: `border-blue-300`
-   Text: `text-blue-800`
-   Icon: ⏰ (clock emoji)

**2. Alert (Red) - Limit Reached**

-   Background: `bg-red-50`
-   Border: `border-red-400` (2px)
-   Text: `text-red-800` (heading), `text-red-700` (body)
-   Icon: ⚠️ (triangle warning SVG)

### Message Structure

```
┌─────────────────────────────────────────┐
│ [Icon] [Heading]                        │
│                                         │
│ [Detailed Message explaining what      │
│  happened and why]                      │
│                                         │
│ 💡 [Helpful next step with link if     │
│     applicable]                         │
└─────────────────────────────────────────┘
```

## Button States

### 1. **Normal State**

```css
bg-primary hover:bg-primary/90 text-white
"Start Session"
```

### 2. **Active Call**

```css
bg-red-700 hover:bg-red-800 text-white
"End Session"
```

### 3. **Connecting**

```css
bg-primary animate-pulse text-white
"Connecting..."
```

### 4. **Limit Reached (Blocking)**

```css
bg-gray-400 cursor-not-allowed text-white
"Limit Reached"
[disabled]
```

### 5. **Max Duration Reached (Non-blocking)**

```css
bg-primary hover:bg-primary/90 text-white
"Start New Session"
[enabled]
```

## User Journey Examples

### Scenario A: User Running Out of Time

```
1. Opens tutor page
   → Sees: "⏰ Only 3 minutes remaining today"

2. Starts 5-minute session
   → Call runs normally

3. At 3:30 into call (system check at 3:30)
   → Call auto-terminates
   → Sees: "Your call was ended because you reached your daily limit..."
   → Button disabled

4. Next day
   → Returns to page
   → No warnings, fresh 30 minutes
```

### Scenario B: Already Over Limit

```
1. Opens tutor page (already used 30 min today)
   → No pre-warning shown

2. Clicks "Start Session"
   → Immediately blocked
   → Sees: "You've reached your daily limit of 30 minutes..."
   → Button shows "Limit Reached" (disabled)

3. Clicks "upgrade to Pro" link
   → Redirected to /subscription
```

### Scenario C: Marathon Session

```
1. Pro user starts session
   → No usage warnings (unlimited)

2. Talks for 60 minutes
   → At 60:00, call auto-terminates
   → Sees: "Your call was automatically ended after 60 minutes..."
   → Button shows "Start New Session" (enabled)

3. Clicks "Start New Session"
   → Warning cleared
   → New call begins immediately
```

## Technical Implementation

### State Management

```typescript
const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
const [limitMessage, setLimitMessage] = useState<string>("");
const [usageWarning, setUsageWarning] = useState<string>("");
```

### Call Status Enum

```typescript
enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
    LIMIT_REACHED = "LIMIT_REACHED",
}
```

### Checks Performed

1. **On Component Mount**

    - Check current usage
    - Show warning if < 5 min daily or < 20 min monthly remaining

2. **Before Call Start** (when user clicks button)

    - Check if already over limit
    - Block call if yes

3. **Every 30 Seconds During Call**
    - Check if limit reached
    - Check if max duration (60 min) reached
    - Auto-terminate if yes

## Links & Actions

### Upgrade Links

All limit-related messages include contextual links to `/subscription`:

-   "upgrade to Pro" (linked)
-   "Upgrade to Pro" (linked)

### Button Actions

-   **Limit Reached (daily/monthly)**: Button disabled, no action
-   **Max Duration**: Clicking button clears warning and returns to INACTIVE state

## Copy Guidelines

### Tone

-   **Informative**: Clearly explain what happened
-   **Helpful**: Provide next steps
-   **Non-punitive**: Frame as feature, not restriction

### Message Structure

1. **What happened**: "Your call was ended..."
2. **Why it happened**: "...because you reached your daily limit of 30 minutes"
3. **What's next**: "💡 Your limit resets tomorrow, or upgrade..."

### Emojis Used

-   ⏰ = Time-based warning (proactive)
-   ⚠️ = Alert/limit reached (reactive)
-   💡 = Helpful tip/next step

## Testing Checklist

-   [ ] Low minutes warning appears when < 5 min daily remaining
-   [ ] Low minutes warning appears when < 20 min monthly remaining
-   [ ] Can't start call when already over daily limit
-   [ ] Can't start call when already over monthly limit
-   [ ] Call auto-terminates when daily limit hit during call
-   [ ] Call auto-terminates when monthly limit hit during call
-   [ ] Call auto-terminates at 60 minutes (all users)
-   [ ] Max duration allows immediate restart
-   [ ] Daily/monthly limits keep button disabled
-   [ ] Upgrade links work correctly
-   [ ] Messages are clear and helpful
-   [ ] Warning clears when appropriate

## Future Enhancements

-   [ ] Real-time countdown timer showing minutes remaining
-   [ ] Progress bar showing usage percentage
-   [ ] Email notification at 80% of limit
-   [ ] Grace period warning (e.g., "1 minute remaining in this call")
-   [ ] Animated transitions for state changes
-   [ ] Sound notification when call is terminated
-   [ ] Toast notifications in addition to inline alerts
