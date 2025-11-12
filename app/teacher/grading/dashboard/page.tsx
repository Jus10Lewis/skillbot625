import type { Metadata } from "next";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
    title: "Grading Dashboard",
    description: "High-level view of assignments and grading history.",
};

// Grading dashboard with real data
export default async function GradingDashboardPage() {
    const session = await auth();

    // Fetch assignments if user is authenticated
    let assignments: Array<{
        id: string;
        title: string;
        class: string | null;
        due_date: string | null;
        total_points: number;
        language: string;
        created_at: string;
    }> = [];

    if (session.userId) {
        const supabase = createSupabaseClient();
        const { data } = await supabase
            .from("assignments")
            .select("*")
            .eq("user_id", session.userId)
            .order("created_at", { ascending: false })
            .limit(5);

        assignments = data || [];
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-16">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Grading Dashboard</h1>
                <p className="text-muted-foreground max-w-2xl text-sm mb-6">
                    High-level view of assignments and grading history
                </p>

                {/* Main Action Button */}
                <div className="flex gap-4 flex-wrap">
                    <Link
                        href="/teacher/grading/new"
                        className="btn-primary inline-flex items-center gap-2"
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
                    <h2 className="text-xl font-semibold">
                        Recent Assignments
                    </h2>
                    <Link
                        href="#"
                        className="text-sm text-primary hover:underline"
                    >
                        View All
                    </Link>
                </div>
                <div className="rounded-lg border divide-y bg-white/50">
                    {assignments.length > 0 ? (
                        assignments.map((assignment) => {
                            const createdDate = new Date(
                                assignment.created_at
                            ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            });

                            return (
                                <Link
                                    key={assignment.id}
                                    href={`/teacher/grading/assignments/${assignment.id}`}
                                    className="p-4 flex items-center justify-between flex-wrap gap-4 hover:bg-muted/40 transition-colors"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {assignment.title}
                                        </p>
                                        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                                            <span>Created {createdDate}</span>
                                            {assignment.class && (
                                                <span>
                                                    • {assignment.class}
                                                </span>
                                            )}
                                            <span>• {assignment.language}</span>
                                            <span>
                                                • {assignment.total_points} pts
                                            </span>
                                        </div>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-muted-foreground"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center text-muted-foreground text-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="font-medium">No assignments yet</p>
                            <p className="mt-2">
                                Create your first assignment to get started!
                            </p>
                        </div>
                    )}
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
