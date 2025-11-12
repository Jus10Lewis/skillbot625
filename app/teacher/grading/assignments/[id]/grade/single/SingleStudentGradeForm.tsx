"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SingleStudentGradeFormProps {
    assignment: {
        id: string;
        title: string;
        totalPoints: number;
        instructions: string;
        rubric: string;
        language: string;
    };
}

export default function SingleStudentGradeForm({
    assignment,
}: SingleStudentGradeFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        // Extract form data
        const studentName = formData.get("studentName") as string;
        const studentCode = formData.get("studentCode") as string;

        // Client-side validation
        if (!studentName.trim()) {
            setError("Student name is required");
            setIsSubmitting(false);
            return;
        }

        if (!studentCode.trim()) {
            setError("Student code is required");
            setIsSubmitting(false);
            return;
        }

        // Prepare request body for GPT grading API
        const requestBody = {
            language: assignment.language,
            instructions: assignment.instructions,
            rubric: assignment.rubric,
            studentCode: studentCode,
            dataInput: "", // Optional field for test data/input
        };

        try {
            // Step 1: Call the GPT grading API
            const gradeResponse = await fetch("/api/grade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const gradeData = await gradeResponse.json();

            if (!gradeResponse.ok) {
                setError(gradeData.error || "Failed to grade submission");
                setIsSubmitting(false);
                return;
            }

            // Step 2: Save the submission to database
            const submissionResponse = await fetch("/api/submissions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    assignmentId: assignment.id,
                    studentName,
                    studentCode,
                    gradeResponse: gradeData,
                    language: assignment.language,
                    totalPoints: assignment.totalPoints,
                }),
            });

            const submissionData = await submissionResponse.json();

            if (!submissionResponse.ok || !submissionData.success) {
                setError(
                    submissionData.error || "Failed to save graded submission"
                );
                setIsSubmitting(false);
                return;
            }

            // Success! Redirect to the results page
            router.push(
                `/teacher/grading/assignments/${assignment.id}/results/${submissionData.submission.id}`
            );
        } catch (err) {
            console.error("Error grading submission:", err);
            setError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            {/* Error message */}
            {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">
                    <div className="flex items-start gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 flex-shrink-0 mt-0.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="studentName">
                    Student Name or ID{" "}
                    <span className="text-muted-foreground font-normal">
                        (Required)
                    </span>
                </label>
                <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. John Doe or student123"
                    required
                    disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                    Enter the student&apos;s name or ID for record keeping
                </p>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="studentCode">
                    Student Code Submission{" "}
                    <span className="text-muted-foreground font-normal">
                        (Required)
                    </span>
                </label>
                <textarea
                    id="studentCode"
                    name="studentCode"
                    className="border rounded-md px-3 py-2 text-sm min-h-96 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`# Paste the student's ${assignment.language} code here...\n\ndef example_function():\n    # Student's implementation\n    pass`}
                    required
                    disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                    Paste the complete code submission from the student
                </p>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Grading with AI...
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path
                                    fillRule="evenodd"
                                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Grade Now
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() =>
                        router.push(
                            `/teacher/grading/assignments/${assignment.id}/grade`
                        )
                    }
                    className="btn-secondary"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
