import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "New Grading Job",
    description: "Create a new grading job (prototype).",
};

export default function NewGradingJobPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-16">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Create Grading Job
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        Prototype flow for creating a new grading job.
                        Eventually this can become a multi-step wizard.
                    </p>
                </div>
                <Link
                    href="/teacher/grading/dashboard"
                    className="text-sm text-primary hover:underline"
                >
                    ← Back to Dashboard
                </Link>
            </div>

            <section className="mb-10 p-6 rounded-lg border bg-muted/30">
                <h2 className="text-lg font-semibold mb-3">
                    Page Notes (/grading/new)
                </h2>
                <p className="text-sm mb-4">
                    <span className="font-medium">Purpose:</span> Create a new
                    grading job.
                </p>
                <div>
                    <h3 className="font-medium mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Steps (Planned)
                    </h3>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                        <li>Assignment title and description</li>
                        <li>Select programming language</li>
                        <li>Paste or upload: Instructions (optional)</li>
                        <li>Paste or upload: Rubric (required)</li>
                        <li>
                            Paste or upload: Student code submissions (single or
                            batch .zip)
                        </li>
                        <li>(Optional) Provide sample input/output data</li>
                        <li>Submit</li>
                    </ol>
                </div>
            </section>

            {/* Placeholder form layout */}
            <form className="grid gap-6">
                <div className="grid gap-2">
                    <label className="text-sm font-medium">
                        Assignment Title
                    </label>
                    <input
                        type="text"
                        className="border rounded-md px-3 py-2 text-sm"
                        placeholder="e.g. Sorting Algorithms Project"
                        disabled
                    />
                    <p className="text-xs text-muted-foreground">
                        (Planned) Title of the assignment.
                    </p>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        className="border rounded-md px-3 py-2 text-sm min-h-24"
                        placeholder="High-level description of the assignment..."
                        disabled
                    />
                    <p className="text-xs text-muted-foreground">
                        (Planned) Optional description for context.
                    </p>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">
                        Programming Language
                    </label>
                    <select
                        className="border rounded-md px-3 py-2 text-sm"
                        disabled
                    >
                        <option>Python</option>
                        <option>JavaScript</option>
                        <option>Java</option>
                        <option>C++</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                        (Planned) Select or auto-detect language.
                    </p>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">
                        Instructions (Optional)
                    </label>
                    <textarea
                        className="border rounded-md px-3 py-2 text-sm min-h-32"
                        placeholder="Paste assignment instructions..."
                        disabled
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">
                        Rubric (Required)
                    </label>
                    <textarea
                        className="border rounded-md px-3 py-2 text-sm min-h-40"
                        placeholder="Paste rubric criteria, point values, etc..."
                        disabled
                    />
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">
                        Student Code Submissions
                    </label>
                    <div className="border rounded-md px-3 py-6 text-sm text-center text-muted-foreground">
                        (Planned) Drag & drop files / upload .zip / paste code
                    </div>
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium">
                        Sample Input/Output Data (Optional)
                    </label>
                    <textarea
                        className="border rounded-md px-3 py-2 text-sm min-h-32"
                        placeholder="Provide sample test cases or I/O pairs..."
                        disabled
                    />
                </div>

                <div className="flex gap-3">
                    <button type="button" className="btn-primary" disabled>
                        Submit (Disabled Prototype)
                    </button>
                    <button type="button" className="btn-primary" disabled>
                        Save Draft (Planned)
                    </button>
                </div>
            </form>
        </main>
    );
}
