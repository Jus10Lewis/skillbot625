import type { Metadata } from "next";
import Link from "next/link";
import CreateAssignmentForm from "./CreateAssignmentForm";

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
            <CreateAssignmentForm />

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
