Agent Brief: Create Grading Page UI (Non-functional v1)

Goal

Add a grading page UI with inputs and client-side validation only. No API calls or server code.
Stack and location

Next.js App Router + TypeScript.
New route: /teacher/grading (e.g., app/teacher/grading/page.tsx).
Add a visible link/button from the teacher dashboard to this page.
Form fields

instructions: textarea (required)
rubric: textarea (required)
studentCode: textarea (required)
language: select (optional, default "Python"; options: Python, JavaScript, Java, C++)
dataInput: textarea (optional)
Validation and behavior

Required fields must be non-empty and non-whitespace.
Disable “Grade” button until required fields are valid.
On submit, preventDefault; run validation only. No network requests.
If studentCode is empty/whitespace, show inline error with exactly: “You have not submitted the proper code. If you're ready, please submit the student's code, and I'll start the grading process according to the provided rubric.”
If the form is valid, show a non-blocking notice: “Ready to grade — backend not implemented yet.”
Accessibility and UX

Labels for all fields, aria-invalid on errors, aria-describedby for error text.
Keyboard navigable with visible focus states.
Minimal, clean styling.
Optional: localStorage persistence for form fields and a Clear button.
Constraints

No API routes, no OpenAI SDK, no environment variables.
Keep components small, typed, and easy to extend.
Acceptance criteria (DoD)

/teacher/grading exists and is reachable from the teacher dashboard.
Inputs render with labels and placeholders; Grade button disabled until valid.
Submitting without studentCode shows the exact missing-code message inline.
No network requests are made.