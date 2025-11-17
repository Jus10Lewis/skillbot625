"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EditAssignmentFormProps {
    assignment: {
        id: string;
        title: string;
        class: string;
        dueDate: string;
        totalPoints: number;
        instructions: string;
        rubric: string;
        language: string;
    };
}

export default function EditAssignmentForm({
    assignment,
}: EditAssignmentFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        // Extract and validate form data
        const title = formData.get("title") as string;
        const classValue = formData.get("class") as string;
        const dueDate = formData.get("dueDate") as string;
        const totalPoints = parseInt(formData.get("totalPoints") as string);
        const instructions = formData.get("instructions") as string;
        const rubric = formData.get("rubric") as string;
        const language = formData.get("language") as string;

        // Client-side validation
        if (!title.trim()) {
            setError("Assignment title is required");
            setIsSubmitting(false);
            return;
        }

        if (!instructions.trim()) {
            setError("Instructions are required");
            setIsSubmitting(false);
            return;
        }

        if (!rubric.trim()) {
            setError("Rubric is required");
            setIsSubmitting(false);
            return;
        }

        if (!language) {
            setError("Please select a programming language");
            setIsSubmitting(false);
            return;
        }

        if (!totalPoints || totalPoints <= 0) {
            setError("Total points must be greater than 0");
            setIsSubmitting(false);
            return;
        }

        // Prepare request body
        const requestBody = {
            title,
            class: classValue || undefined,
            dueDate: dueDate || undefined,
            totalPoints,
            instructions,
            rubric,
            language,
        };

        try {
            const response = await fetch(`/api/assignments/${assignment.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.error || "Failed to update assignment");
                setIsSubmitting(false);
                return;
            }

            // Success! Redirect to the assignment detail page
            router.push(`/teacher/grading/assignments/${assignment.id}`);
            router.refresh();
        } catch (err) {
            console.error("Error updating assignment:", err);
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
                <label className="text-sm font-medium" htmlFor="title">
                    Assignment Title{" "}
                    <span className="text-muted-foreground font-normal">
                        (Required)
                    </span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Bubble Sort Algorithm Implementation"
                    defaultValue={assignment.title}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="class">
                        Class/Course{" "}
                        <span className="text-muted-foreground font-normal">
                            (Optional)
                        </span>
                    </label>
                    <input
                        type="text"
                        id="class"
                        name="class"
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. CS 101 - Section A"
                        defaultValue={assignment.class}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="dueDate">
                        Due Date{" "}
                        <span className="text-muted-foreground font-normal">
                            (Optional)
                        </span>
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        defaultValue={assignment.dueDate}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="totalPoints">
                    Total Points{" "}
                    <span className="text-muted-foreground font-normal">
                        (Required)
                    </span>
                </label>
                <input
                    type="number"
                    id="totalPoints"
                    name="totalPoints"
                    className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-48"
                    placeholder="e.g. 100"
                    min="1"
                    defaultValue={assignment.totalPoints}
                    required
                    disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                    Maximum points possible for this assignment
                </p>
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="instructions">
                    Instructions{" "}
                    <span className="text-muted-foreground font-normal">
                        (Required)
                    </span>
                </label>
                <textarea
                    id="instructions"
                    name="instructions"
                    className="border rounded-md px-3 py-2 text-sm min-h-64 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter the assignment instructions here..."
                    defaultValue={assignment.instructions}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="rubric">
                    Rubric{" "}
                    <span className="text-muted-foreground font-normal">
                        (Required)
                    </span>
                </label>
                <textarea
                    id="rubric"
                    name="rubric"
                    className="border rounded-md px-3 py-2 text-sm min-h-64 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter the grading rubric here..."
                    defaultValue={assignment.rubric}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="language">
                    Programming Language{" "}
                    <span className="text-muted-foreground font-normal">
                        (Required)
                    </span>
                </label>
                <select
                    id="language"
                    name="language"
                    className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={assignment.language}
                    required
                    disabled={isSubmitting}
                >
                    <option value="">Select a language...</option>
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="csharp">C#</option>
                    <option value="ruby">Ruby</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                    <option value="swift">Swift</option>
                    <option value="kotlin">Kotlin</option>
                </select>
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
                            Saving...
                        </>
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Save Changes
                        </>
                    )}
                </button>
                <Link
                    href={`/teacher/grading/assignments/${assignment.id}`}
                    className={`btn-secondary ${
                        isSubmitting ? "pointer-events-none opacity-50" : ""
                    }`}
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}
