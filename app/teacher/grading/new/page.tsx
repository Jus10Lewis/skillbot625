import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Create Programming Assignment",
    description:
        "Create a new programming assignment with instructions and rubric.",
};

export default function NewGradingJobPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-16">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Create Programming Assignment
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        Text area fields for: Instructions, Rubric. Drop down
                        language selector.
                    </p>
                </div>
                <Link
                    href="/teacher/grading/dashboard"
                    className="text-primary hover:underline text-sm flex items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back to Dashboard
                </Link>
            </div>

            {/* Assignment Creation Form */}
            <form className="grid gap-6">
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
                        />
                    </div>

                    <div className="grid gap-2">
                        <label
                            className="text-sm font-medium"
                            htmlFor="dueDate"
                        >
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
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium"
                        htmlFor="totalPoints"
                    >
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
                        min="0"
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        Maximum points possible for this assignment
                    </p>
                </div>

                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium"
                        htmlFor="instructions"
                    >
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
                    <button type="submit" className="btn-primary">
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
                    </button>
                    <Link
                        href="/teacher/grading/assignments"
                        className="btn-secondary"
                    >
                        Cancel
                    </Link>
                </div>
            </form>

            <section className="mt-16 p-6 rounded-lg border bg-muted/30">
                <h2 className="text-lg font-semibold mb-3">
                    Page Notes (/grading/new)
                </h2>
                <p className="text-sm mb-4">
                    <span className="font-medium">Purpose:</span> Create a new
                    programming assignment with instructions and grading rubric.
                </p>
                <div>
                    <h3 className="font-medium mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Features
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Text area for assignment instructions</li>
                        <li>Text area for grading rubric</li>
                        <li>Dropdown selector for programming language</li>
                        <li>Submit button to create the assignment</li>
                        <li>
                            After submission, redirects to &ldquo;Display all
                            Assignment info&rdquo; page
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
