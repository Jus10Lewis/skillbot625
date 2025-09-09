import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Assignment #8675309",
    description: "Details for assignment 8675309 (static prototype).",
};

export default function Assignment8675309Page() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-16">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                <h1 className="text-2xl font-bold">Assignment #8675309</h1>
                <Link
                    href="/teacher/grading/dashboard"
                    className="text-sm text-primary hover:underline"
                >
                    ← Back to Dashboard
                </Link>
            </div>

            <section className="grid gap-6 mb-10 md:grid-cols-3">
                <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        Status
                    </p>
                    <p className="font-semibold">In Progress</p>
                </div>
                <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        Created
                    </p>
                    <p className="font-semibold">—</p>
                </div>
                <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                        Last Updated
                    </p>
                    <p className="font-semibold">—</p>
                </div>
            </section>

            <section className="mb-12 space-y-6">
                <div>
                    <h2 className="font-semibold mb-2">Description</h2>
                    <p className="text-sm text-muted-foreground">
                        Placeholder description for assignment #8675309. This
                        page will eventually show assignment metadata,
                        instructions, rubric, submissions, grading outcomes, and
                        analytics.
                    </p>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Instructions</h2>
                    <pre className="text-xs p-3 rounded bg-muted overflow-auto">
                        {`// Instructions placeholder\nImplement the required functions following the rubric.`}
                    </pre>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Rubric (Excerpt)</h2>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Correctness (50%)</li>
                        <li>Code Quality & Style (20%)</li>
                        <li>Performance (15%)</li>
                        <li>Documentation & Comments (10%)</li>
                        <li>Edge Case Handling (5%)</li>
                    </ul>
                </div>
            </section>

            <section className="p-6 rounded-lg border bg-muted/30">
                <h2 className="text-lg font-semibold mb-3">
                    Page Notes (/grading/8675309)
                </h2>
                <p className="text-sm mb-2">
                    <span className="font-medium">Purpose:</span> Prototype view
                    for a single assignment instance.
                </p>
                <p className="text-sm mb-3">
                    Will evolve into a dynamic route:
                    /teacher/grading/[assignmentId]
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Show assignment metadata & status</li>
                    <li>List student submissions & grading states</li>
                    <li>Surface rubric scoring summary</li>
                    <li>Link to detailed grading reports per student</li>
                </ul>
            </section>
        </main>
    );
}
