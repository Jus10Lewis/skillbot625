import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "All Assignments",
    description:
        "Display all assignment info including list of previously graded students.",
};

// Display all Assignment info page
export default function AssignmentsPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16">
            <div className="mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            All Assignments
                        </h1>
                        <p className="text-muted-foreground max-w-2xl text-sm">
                            Display all assignment info. List previously graded
                            students. Click on student to go to the
                            &ldquo;display grade and feedback&rdquo; screen.
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
                        Return to grading dashboard
                    </Link>
                </div>
            </div>

            {/* Assignment Selection/Filter Section */}
            <section className="mb-8 p-6 rounded-lg border bg-muted/20">
                <h2 className="text-lg font-semibold mb-4">
                    Select Assignment
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Assignment
                        </label>
                        <select className="w-full rounded-md border px-3 py-2 bg-white">
                            <option>Select an assignment...</option>
                            <option>Assignment #8675309 - Python Basics</option>
                            <option>Assignment #12345 - Data Structures</option>
                            <option>Assignment #67890 - Algorithms</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Class/Course
                        </label>
                        <select className="w-full rounded-md border px-3 py-2 bg-white">
                            <option>All classes</option>
                            <option>CS 101</option>
                            <option>CS 201</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Previously Graded Students List */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        Previously Graded Students
                    </h2>
                    <Link
                        href="/teacher/grading/8675309"
                        className="btn-primary text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Grade Assignment
                    </Link>
                </div>

                <div className="rounded-lg border divide-y bg-white">
                    {/* Student rows - clicking takes you to display grade/feedback page */}
                    <Link
                        href="/teacher/grading/8675309"
                        className="p-4 flex items-center justify-between flex-wrap gap-4 hover:bg-muted/40 transition-colors"
                    >
                        <div className="flex-1">
                            <p className="font-medium">Student: John Doe</p>
                            <p className="text-xs text-muted-foreground">
                                Assignment #8675309 - Python Basics
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Graded on: Nov 10, 2025
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold">
                                95/100
                            </span>
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
                        </div>
                    </Link>

                    <Link
                        href="/teacher/grading/8675309"
                        className="p-4 flex items-center justify-between flex-wrap gap-4 hover:bg-muted/40 transition-colors"
                    >
                        <div className="flex-1">
                            <p className="font-medium">Student: Jane Smith</p>
                            <p className="text-xs text-muted-foreground">
                                Assignment #8675309 - Python Basics
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Graded on: Nov 9, 2025
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold">
                                88/100
                            </span>
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
                        </div>
                    </Link>

                    <Link
                        href="/teacher/grading/8675309"
                        className="p-4 flex items-center justify-between flex-wrap gap-4 hover:bg-muted/40 transition-colors"
                    >
                        <div className="flex-1">
                            <p className="font-medium">Student: Mike Johnson</p>
                            <p className="text-xs text-muted-foreground">
                                Assignment #8675309 - Python Basics
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Graded on: Nov 8, 2025
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-semibold">
                                92/100
                            </span>
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
                        </div>
                    </Link>

                    {/* Empty state when no students graded yet */}
                    <div className="p-8 text-center text-muted-foreground text-sm hidden">
                        <p>
                            No students have been graded for this assignment
                            yet.
                        </p>
                        <p className="mt-2">
                            Click &ldquo;Grade Assignment&rdquo; to start
                            grading.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-16 p-6 rounded-lg border bg-muted/30">
                <h2 className="text-lg font-semibold mb-3">
                    Page Notes (/grading/assignments)
                </h2>
                <p className="text-sm mb-4">
                    <span className="font-medium">Purpose:</span> Display all
                    assignment info. List previously graded students. Click on
                    student to go to the &ldquo;display grade and
                    feedback&rdquo; screen.
                </p>
                <div>
                    <h3 className="font-medium mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Features (Planned)
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                            List of previously graded students for selected
                            assignment
                        </li>
                        <li>
                            Click on student to view their grade and feedback
                            details
                        </li>
                        <li>
                            Button to &ldquo;Grade Assignment&rdquo; for new
                            submissions
                        </li>
                        <li>Return to grading dashboard button</li>
                        <li>Assignment and class/course filters</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
