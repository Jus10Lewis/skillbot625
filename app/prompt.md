# Agent Brief: Build MVP Auto‑Grading Functionality

You are an expert full‑stack engineer. Build a minimal but production‑ready MVP that lets a teacher grade coding assignments via an LLM using a rubric. Keep it simple, reliable, and easy to extend.

Objectives

-   Add a teacher‑accessible grading page reachable from the teacher dashboard.
-   Provide 3 required inputs: assignment instructions, rubric, student submission (code).
-   Provide optional inputs: language, dataInput.
-   Send a single prompt to the OpenAI API and display the model’s graded JSON result.
-   Enforce the “missing code” rule client‑side and server‑side.
-   Keep the code small, typed, and easy to iterate on.

Assumptions

-   Framework: Next.js App Router with TypeScript (adjust if project differs).
-   Use an API endpoint (e.g., POST /api/grade) that calls OpenAI with OPENAI_API_KEY.
-   Prefer the official OpenAI Node SDK and a cost‑efficient model (e.g., gpt-4o-mini).
-   No DB needed for MVP; client-only state for the form and result.
-   Styling can be minimal.

User stories

-   As a teacher, I can open a grading page from my dashboard.
-   I can paste the assignment instructions, rubric, and the student’s code, then submit.
-   I receive a strict JSON response (or the exact missing‑code message) and can copy it.

Routes and navigation

-   Add a new page: /teacher/grading (or analogous route under the existing dashboard).
-   Add a visible link/button from the teacher dashboard to the grading page.

UI requirements (Grading Page)

-   Inputs:
    -   instructions (textarea, required)
    -   rubric (textarea, required)
    -   studentCode (textarea, required)
    -   language (dropdown, optional; default “Python”)
    -   dataInput (textarea, optional)
-   Actions:
    -   Grade button: disabled if required fields are empty.
    -   Result panel: shows raw JSON response (pretty‑printed) or “missing code” message.
    -   Copy‑to‑clipboard for the result.
-   Validation:
    -   If studentCode is empty/whitespace, do not call the API; show the exact missing‑code sentence from the template.

API requirements

-   Endpoint: POST /api/grade
-   Request body (JSON):
    -   instructions: string
    -   rubric: string
    -   studentCode: string
    -   language?: string
    -   dataInput?: string
-   Behavior:
    -   If studentCode is empty/whitespace: return the exact missing‑code sentence, text/plain.
    -   Otherwise: call OpenAI with the Grading Prompt Template (below) and return:
        -   On success: application/json with the model’s JSON string (no wrapping).
        -   If the model returns invalid JSON: attempt one repair pass; if still invalid, return 422 with an error JSON.
-   Security:
    -   Read OPENAI_API_KEY from server environment only.
    -   Do not expose keys to the client.

OpenAI call

-   Model: gpt-4o-mini (or similar) with a single response (no streaming required for MVP).
-   Temperature: low (e.g., 0.2).
-   System/Prompt: use the Grading Prompt Template verbatim, interpolate variables safely.
-   Expect “ONLY valid JSON” or the exact missing‑code sentence.

Error handling

-   Show user-friendly error messages in the UI.
-   Surface HTTP status and a brief reason if non‑200.
-   Handle network timeouts.

Definition of Done

-   A teacher can navigate to /teacher/grading from the dashboard.
-   Submitting valid inputs returns and displays strict JSON per schema.
-   Submitting with missing studentCode shows the exact missing‑code sentence (no JSON).
-   The API never returns keys or stack traces to the client.
-   Code is typed, small, and readable.

LLM Grading Prompt Template (use verbatim; interpolate variables)
You are a Computer Science professor who teaches an Intro to ${language} Programming class. You are skilled at grading coding assignments and giving concise, actionable feedback.

Your task

-   Evaluate a student's code submission against the provided assignment and rubric.
-   Provide per-criterion scores and feedback, then compute a final score.
-   Keep explanations concise. Do not include the student's code in your response.

Inputs

-   Assignment instructions:
    """${instructions}"""
-   (Optional) Data file contents:
    """${dataInput}"""
-   Grading rubric:
    """${rubric}"""
-   Student submission (code):
    """${studentCode}"""

Required checks

1. Missing code

-   If the user's input does not include the student's code, respond ONLY with:
    You have not submitted the proper code. If you're ready, please submit the student's code, and I'll start the grading process according to the provided rubric.

2. Relevance gate

-   Verify the code addresses the assignment. If it appears unrelated (e.g., code from a different assignment), assign a total grade of 0 and briefly explain why in the output.

Grading rules

-   Grade strictly by the rubric. If the rubric conflicts with the instructions, follow the rubric.
-   Process each rubric criterion independently before summing scores.
-   Use whole-integer points unless the rubric explicitly allows decimals.
-   Avoid deducting points twice for the same mistake.
-   If the rubric specifies point values per criterion, use them. If not, distribute points equally across criteria to sum to 100.
-   If dataInput is empty but the instructions mention data, do not penalize unless the rubric requires that data be handled.
-   Give concise, actionable feedback (1–2 sentences per criterion).

Output format (JSON)

-   Return ONLY valid JSON. No prose outside JSON.
-   If missing-code condition triggered, return ONLY the specified sentence above (no JSON).
-   Otherwise, produce this schema:

{
"relevance": {
"isRelevant": boolean,
"reason": "short explanation of relevance or mismatch"
},
"rubric": [
{
"id": number,
"criterion": "exact text or concise name of rubric item",
"maxPoints": number,
"score": number,
"feedback": "1–2 sentences, actionable, no duplication"
}
],
"totals": {
"score": number,
"maxPoints": number,
"percentage": number
},
"overallFeedback": "2–4 sentences summarizing strengths and prioritized improvements",
}

Procedure

1. Check for missing code and respond per the Missing code rule if applicable.
2. Assess relevance vs. instructions; if unrelated, set totals.score=0 and explain in relevance.reason.
3. Parse the rubric into clear criteria; determine maxPoints per item (from rubric or equal weighting).
4. Evaluate each criterion independently; assign integer scores; avoid double penalties.
5. Summarize totals and provide overallFeedback with the most impactful next steps.
6. Return the JSON. Do not include explanations outside JSON.
