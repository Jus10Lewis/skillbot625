"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CreateAssignmentRequest } from "@/types/grading";

export default function CreateAssignmentForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const fillTestData = () => {
        if (!formRef.current) return;

        const timestamp = new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/[-:]/g, "")
            .replace("T", "-");
        const form = formRef.current;

        // Get form elements
        const titleInput = form.querySelector<HTMLInputElement>("#title");
        const classInput = form.querySelector<HTMLInputElement>("#class");
        const dueDateInput = form.querySelector<HTMLInputElement>("#dueDate");
        const totalPointsInput =
            form.querySelector<HTMLInputElement>("#totalPoints");
        const instructionsInput =
            form.querySelector<HTMLTextAreaElement>("#instructions");
        const rubricInput = form.querySelector<HTMLTextAreaElement>("#rubric");
        const languageSelect =
            form.querySelector<HTMLSelectElement>("#language");

        // Fill in test data
        if (titleInput) titleInput.value = `Test Assignment ${timestamp}`;
        if (classInput) classInput.value = "CS 101 - Test Section";
        if (dueDateInput) {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            dueDateInput.value = nextWeek.toISOString().split("T")[0];
        }
        if (totalPointsInput) totalPointsInput.value = "100";
        if (languageSelect) languageSelect.value = "python";

        if (instructionsInput) {
            instructionsInput.value = `Write a Python function called "bubble_sort" that implements the bubble sort algorithm.

Requirements:
- Function should take a list of integers as input
- Function should return a new sorted list (do not modify the original list)
- Include a main() function that demonstrates your bubble_sort function with at least 3 test cases
- Add comments explaining the key steps of your algorithm
- Handle edge cases (empty list, single element, already sorted list)

Example usage:
    numbers = [64, 34, 25, 12, 22, 11, 90]
    sorted_numbers = bubble_sort(numbers)
    print(sorted_numbers)  # [11, 12, 22, 25, 34, 64, 90]

Submit your code as a single .py file with clear documentation.`;
        }

        if (rubricInput) {
            rubricInput.value = `Grading Rubric (Total: 100 points)

CORRECTNESS (50 points)
- Algorithm correctly implements bubble sort: 25 points
- Returns a new list without modifying original: 10 points
- Handles all edge cases correctly: 15 points
  * Empty list: 5 points
  * Single element: 5 points
  * Already sorted list: 5 points

CODE QUALITY (30 points)
- Proper function definition and parameters: 10 points
- Clear and descriptive variable names: 8 points
- Appropriate comments explaining algorithm steps: 7 points
- Main function with test cases included: 5 points

STYLE & BEST PRACTICES (20 points)
- Follows PEP 8 style guidelines: 10 points
- Code is clean and readable: 5 points
- Proper indentation and spacing: 5 points

DEDUCTIONS
- Missing docstrings: -5 points
- Modifies original list instead of creating new one: -10 points
- Code does not run without errors: -20 points`;
        }
    };

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
        const requestBody: CreateAssignmentRequest = {
            title,
            class: classValue || undefined,
            dueDate: dueDate || undefined,
            totalPoints,
            instructions,
            rubric,
            language,
        };

        try {
            const response = await fetch("/api/assignments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setError(data.error || "Failed to create assignment");
                setIsSubmitting(false);
                return;
            }

            // Success! Redirect to assignments page
            router.push("/teacher/grading/assignments");
        } catch (err) {
            console.error("Error creating assignment:", err);
            setError("An unexpected error occurred. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <form ref={formRef} className="grid gap-6" onSubmit={handleSubmit}>
            {/* Development Test Button */}
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-yellow-900">
                            Development Mode
                        </p>
                        <p className="text-xs text-yellow-700">
                            Fill form with test data for quick testing
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={fillTestData}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Fill Test Data
                    </button>
                </div>
            </div>

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
                    className="border rounded-md px-3 py-2 text-sm min-h-40 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter the assignment instructions here...&#10;&#10;Example:&#10;Write a Python function that sorts a list of numbers using the bubble sort algorithm. Your function should:&#10;- Take a list of integers as input&#10;- Return the sorted list&#10;- Include comments explaining your code"
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
                    className="border rounded-md px-3 py-2 text-sm min-h-40 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter the grading rubric here...&#10;&#10;Example:&#10;Correctness (50 points):&#10;- Algorithm correctly sorts the list: 30 points&#10;- Handles edge cases (empty list, single element): 20 points&#10;&#10;Code Quality (30 points):&#10;- Proper variable naming: 10 points&#10;- Code comments and documentation: 10 points&#10;- Efficient implementation: 10 points&#10;&#10;Style (20 points):&#10;- Follows PEP 8 guidelines: 10 points&#10;- Clean, readable code: 10 points"
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
                            Creating...
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
                            Submit
                        </>
                    )}
                </button>
                <Link
                    href="/teacher/grading/assignments"
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
