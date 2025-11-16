"use client";

import { useState, FormEvent, useRef } from "react";
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

type GradeLevel = "A" | "C" | "D";

export default function SingleStudentGradeForm({
    assignment,
}: SingleStudentGradeFormProps) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedGradeLevel, setSelectedGradeLevel] =
        useState<GradeLevel>("A");

    // TODO: Before public launch, set SHOW_TEST_BUTTONS to false to hide development helpers
    const SHOW_TEST_BUTTONS = true; // Set to false to hide test data buttons

    const getTestSubmission = (gradeLevel: GradeLevel) => {
        // Generate timestamp for unique student names
        const timestamp = new Date()
            .toISOString()
            .slice(11, 19)
            .replace(/:/g, "");

        const submissions = {
            A: {
                name: `Alice Johnson-${timestamp}`,
                code: `def bubble_sort(arr):
    """
    Implementation of bubble sort algorithm.
    Takes a list of integers and returns a new sorted list.
    Does not modify the original list.
    
    Args:
        arr: List of integers to sort
    
    Returns:
        New list with elements sorted in ascending order
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    n = len(result)
    
    # Handle edge case: empty list or single element
    if n <= 1:
        return result
    
    # Bubble sort algorithm
    for i in range(n):
        # Track if any swaps were made in this pass
        swapped = False
        
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            # Swap if the element found is greater than the next element
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
        
        # If no swaps were made, the list is already sorted
        if not swapped:
            break
    
    return result


def main():
    """
    Demonstrates the bubble_sort function with various test cases.
    """
    # Test case 1: Regular unsorted list
    numbers1 = [64, 34, 25, 12, 22, 11, 90]
    sorted1 = bubble_sort(numbers1)
    print(f"Original: {numbers1}")
    print(f"Sorted: {sorted1}")
    print()
    
    # Test case 2: Already sorted list
    numbers2 = [1, 2, 3, 4, 5]
    sorted2 = bubble_sort(numbers2)
    print(f"Already sorted: {numbers2}")
    print(f"Result: {sorted2}")
    print()
    
    # Test case 3: Empty list
    numbers3 = []
    sorted3 = bubble_sort(numbers3)
    print(f"Empty list: {numbers3}")
    print(f"Result: {sorted3}")
    print()
    
    # Test case 4: Single element
    numbers4 = [42]
    sorted4 = bubble_sort(numbers4)
    print(f"Single element: {numbers4}")
    print(f"Result: {sorted4}")
    print()
    
    # Test case 5: Reverse sorted list
    numbers5 = [9, 7, 5, 3, 1]
    sorted5 = bubble_sort(numbers5)
    print(f"Reverse sorted: {numbers5}")
    print(f"Result: {sorted5}")


if __name__ == "__main__":
    main()`,
            },
            C: {
                name: `Charlie Brown-${timestamp}`,
                code: `def bubble_sort(arr):
    # Make a copy of the list
    result = arr.copy()
    n = len(result)
    
    # Bubble sort
    for i in range(n):
        for j in range(0, n - i - 1):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
    
    return result

def main():
    # Test case 1
    numbers = [64, 34, 25, 12, 22, 11, 90]
    sorted_numbers = bubble_sort(numbers)
    print(sorted_numbers)
    
    # Test case 2
    numbers2 = [1, 2, 3, 4, 5]
    sorted2 = bubble_sort(numbers2)
    print(sorted2)
    
    # Test case 3
    numbers3 = []
    sorted3 = bubble_sort(numbers3)
    print(sorted3)

main()`,
            },
            D: {
                name: `David Smith-${timestamp}`,
                code: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        for j in range(0, n - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    
    return arr

numbers = [64, 34, 25, 12, 22, 11, 90]
result = bubble_sort(numbers)
print(result)`,
            },
        };

        return submissions[gradeLevel];
    };

    const fillTestData = () => {
        if (!formRef.current) return;

        const form = formRef.current;
        const submission = getTestSubmission(selectedGradeLevel);

        // Get form elements
        const nameInput = form.querySelector<HTMLInputElement>("#studentName");
        const codeInput =
            form.querySelector<HTMLTextAreaElement>("#studentCode");

        // Fill in test data
        if (nameInput) nameInput.value = submission.name;
        if (codeInput) codeInput.value = submission.code;
    };

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
        <form ref={formRef} className="grid gap-6" onSubmit={handleSubmit}>
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

            {/* Test Data Button */}
            {SHOW_TEST_BUTTONS && (
                <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                            <h3 className="text-sm font-medium text-amber-900 mb-1">
                                Development Testing
                            </h3>
                            <p className="text-xs text-amber-700">
                                Fill form with simulated student submissions for
                                testing
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                value={selectedGradeLevel}
                                onChange={(e) =>
                                    setSelectedGradeLevel(
                                        e.target.value as GradeLevel
                                    )
                                }
                                className="border border-amber-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                <option value="A">A Grade (~95%)</option>
                                <option value="C">C Grade (~75%)</option>
                                <option value="D">D Grade (~65%)</option>
                            </select>
                            <button
                                type="button"
                                onClick={fillTestData}
                                className="px-4 py-2 text-sm font-medium text-amber-900 bg-amber-100 border border-amber-300 rounded-md hover:bg-amber-200 transition-colors flex items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Fill Test Data
                            </button>
                        </div>
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
