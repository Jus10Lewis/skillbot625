import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
    title: "Assignment Details",
    description: "View assignment details and graded student submissions.",
};

// Display single Assignment info page
export default async function AssignmentDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const session = await auth();

    if (!session.userId) {
        return notFound();
    }

    // Fetch assignment data
    const supabase = createSupabaseClient();
    const { data: assignment, error } = await supabase
        .from("assignments")
        .select("*")
        .eq("id", id)
        .eq("user_id", session.userId)
        .single();

    if (error || !assignment) {
        return notFound();
    }

    // Format the assignment data
    const assignmentData = {
        id: assignment.id,
        title: assignment.title,
        class: assignment.class,
        dueDate: assignment.due_date,
        totalPoints: assignment.total_points,
        instructions: assignment.instructions,
        rubric: assignment.rubric,
        language: assignment.language,
        createdAt: assignment.created_at,
    };

    // Format dates
    const createdDate = new Date(assignmentData.createdAt).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    const dueDate = assignmentData.dueDate
        ? new Date(assignmentData.dueDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : null;

    return (
        <main className="mx-auto max-w-5xl px-4 py-16">
            <div className="mb-8">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {assignmentData.title}
                        </h1>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            {assignmentData.class && (
                                <span className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                    {assignmentData.class}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {assignmentData.language}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
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
                                {assignmentData.totalPoints} points
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Created {createdDate}
                            {dueDate && ` • Due ${dueDate}`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/teacher/grading/assignments/${id}/edit`}
                            className="btn-secondary text-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit Assignment
                        </Link>
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
                            Return to dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Assignment Details Section */}
            <section className="mb-8 grid gap-6">
                <div className="p-6 rounded-lg border bg-white">
                    <h2 className="text-lg font-semibold mb-3">Instructions</h2>
                    <div className="text-sm whitespace-pre-wrap text-muted-foreground">
                        {assignmentData.instructions}
                    </div>
                </div>

                <div className="p-6 rounded-lg border bg-white">
                    <h2 className="text-lg font-semibold mb-3">
                        Grading Rubric
                    </h2>
                    <div className="text-sm whitespace-pre-wrap text-muted-foreground">
                        {assignmentData.rubric}
                    </div>
                </div>
            </section>

            {/* Previously Graded Students List */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                        Graded Submissions
                    </h2>
                    <Link
                        href={`/teacher/grading/assignments/${id}/grade`}
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
                        Grade New Submission
                    </Link>
                </div>

                <div className="rounded-lg border bg-white">
                    {/* TODO: Fetch and display graded submissions */}
                    {/* Empty state for now */}
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
                        <p className="font-medium">No submissions graded yet</p>
                        <p className="mt-2">
                            Click &ldquo;Grade New Submission&rdquo; to start
                            grading student work.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
