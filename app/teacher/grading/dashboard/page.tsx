import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Grading Dashboard",
    description: "High-level view of assignments and grading history.",
};

// Static grading dashboard placeholder
export default function GradingDashboardPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Grading Dashboard</h1>
                <p className="text-muted-foreground max-w-2xl text-sm mb-6">
                    High-level view of assignments and grading history
                </p>

                {/* Main Action Buttons */}
                <div className="flex gap-4 flex-wrap">
                    <Link
                        href="/teacher/grading/assignments"
                        className="btn-primary inline-flex items-center gap-2"
                    >
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
                        View Previously Created Assignments
                    </Link>
                    <Link
                        href="/teacher/grading/new"
                        className="btn-secondary inline-flex items-center gap-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Create New Assignment
                    </Link>
                </div>
            </div>

            <section className="grid gap-6 md:grid-cols-4 mb-10">
                <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Total Assignments
                    </p>
                    <p className="text-2xl font-semibold">—</p>
                </div>
                <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        In Progress
                    </p>
                    <p className="text-2xl font-semibold">—</p>
                </div>
                <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Completed
                    </p>
                    <p className="text-2xl font-semibold">—</p>
                </div>
                <div className="rounded-lg border p-4 bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                        Awaiting Review
                    </p>
                    <p className="text-2xl font-semibold">—</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-md border p-4 text-sm bg-white/50">
                        Class (placeholder)
                    </div>
                    <div className="rounded-md border p-4 text-sm bg-white/50">
                        Course (placeholder)
                    </div>
                    <div className="rounded-md border p-4 text-sm bg-white/50">
                        Date (placeholder)
                    </div>
                    <div className="rounded-md border p-4 text-sm bg-white/50">
                        Status (placeholder)
                    </div>
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <h2 className="text-xl font-semibold">Past Assignments</h2>
                    <Link
                        href="#"
                        className="text-sm text-primary hover:underline"
                    >
                        View All
                    </Link>
                </div>
                <div className="rounded-lg border divide-y bg-white/50">
                    {/* Placeholder rows */}
                    <Link
                        href="/teacher/grading/8675309"
                        className="p-4 flex items-center justify-between flex-wrap gap-4 hover:bg-muted/40 transition-colors"
                    >
                        <div>
                            <p className="font-medium">Assignment #8675309</p>
                            <p className="text-xs text-muted-foreground">
                                Created —
                            </p>
                        </div>
                        <span className="text-xs rounded-full bg-muted px-3 py-1">
                            In Progress
                        </span>
                    </Link>
                    <div className="p-4 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="font-medium">— Assignment Title</p>
                            <p className="text-xs text-muted-foreground">
                                Created —
                            </p>
                        </div>
                        <span className="text-xs rounded-full bg-muted px-3 py-1">
                            Grading Complete
                        </span>
                    </div>
                    <div className="p-4 flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="font-medium">— Assignment Title</p>
                            <p className="text-xs text-muted-foreground">
                                Created —
                            </p>
                        </div>
                        <span className="text-xs rounded-full bg-muted px-3 py-1">
                            Awaiting Review
                        </span>
                    </div>
                </div>
            </section>

            <section className="mt-16 p-6 rounded-lg border bg-muted/30">
                <h2 className="text-lg font-semibold mb-3">
                    Page Notes (/grading/dashboard)
                </h2>
                <p className="text-sm mb-4">
                    <span className="font-medium">Purpose:</span> Entry point.
                    Gives users a high-level view of assignments and grading
                    history.
                </p>
                <div>
                    <h3 className="font-medium mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Features (Planned)
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>List of past assignments</li>
                        <li>
                            Status (e.g., “Grading Complete” / “In Progress”)
                        </li>
                        <li>“Create New Assignment” button</li>
                        <li>Filters: by class, course, date, status</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
