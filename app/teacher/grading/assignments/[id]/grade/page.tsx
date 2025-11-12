import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
    title: "Grade Assignment",
    description: "Select grading method for student submissions.",
};

export default async function GradeAssignmentPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const session = await auth();

    if (!session.userId) {
        return notFound();
    }

    // Fetch assignment data to display title
    const supabase = createSupabaseClient();
    const { data: assignment, error } = await supabase
        .from("assignments")
        .select("title")
        .eq("id", id)
        .eq("user_id", session.userId)
        .single();

    if (error || !assignment) {
        return notFound();
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-16">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Grade Assignment
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        {assignment.title}
                    </p>
                </div>
                <Link
                    href={`/teacher/grading/assignments/${id}`}
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
                    Back to Assignment
                </Link>
            </div>

            <div className="mb-8 p-6 rounded-lg border bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-600 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-1">
                            Grading Options
                        </h3>
                        <p className="text-sm text-blue-800">
                            Select how you&apos;d like to submit student work
                            for grading. Currently, only single student text
                            entry is available. More options coming soon!
                        </p>
                    </div>
                </div>
            </div>

            <section className="grid gap-4 md:grid-cols-2">
                {/* Active option: Single Student Text Entry */}
                <Link
                    href={`/teacher/grading/assignments/${id}/grade/single`}
                    className="p-6 rounded-lg border-2 border-primary bg-white hover:bg-primary/5 transition-colors cursor-pointer group"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Available
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        Single Student - Text Entry
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Enter one student&apos;s name and paste their code
                        directly into a text field. Best for quick grading of
                        individual submissions.
                    </p>
                </Link>

                {/* Coming soon: Single Student File Upload */}
                <div className="p-6 rounded-lg border-2 border-muted bg-muted/20 opacity-60 cursor-not-allowed">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-3 rounded-lg bg-muted">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Coming Soon
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        Single Student - File Upload
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Upload a single code file for one student. Supports .py,
                        .js, .java, and other common file types.
                    </p>
                </div>

                {/* Coming soon: Multiple Students Text Entry */}
                <div className="p-6 rounded-lg border-2 border-muted bg-muted/20 opacity-60 cursor-not-allowed">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-3 rounded-lg bg-muted">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Coming Soon
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        Multiple Students - Batch Entry
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Enter multiple students at once with their code
                        submissions. Grade an entire class in one go.
                    </p>
                </div>

                {/* Coming soon: Bulk File Upload */}
                <div className="p-6 rounded-lg border-2 border-muted bg-muted/20 opacity-60 cursor-not-allowed">
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-3 rounded-lg bg-muted">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            Coming Soon
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        Bulk Upload - ZIP File
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Upload a ZIP file containing multiple student
                        submissions. Automatically extract and grade all files.
                    </p>
                </div>
            </section>

            <section className="mt-8 p-6 rounded-lg border bg-muted/30">
                <h2 className="text-lg font-semibold mb-3">
                    Page Notes (/grading/assignments/[id]/grade)
                </h2>
                <p className="text-sm mb-4">
                    <span className="font-medium">Purpose:</span> Intermediary
                    screen where teachers select their grading method. Shows
                    available and upcoming options.
                </p>
                <div>
                    <h3 className="font-medium mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Current Features
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                        <li>Single Student Text Entry (Active)</li>
                    </ul>
                    <h3 className="font-medium mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Planned Features
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Single Student File Upload</li>
                        <li>Multiple Students Batch Entry</li>
                        <li>Bulk ZIP File Upload</li>
                        <li>Support for multiple files per student</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
