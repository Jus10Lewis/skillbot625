import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import EditAssignmentForm from "./EditAssignmentForm";

export const metadata: Metadata = {
    title: "Edit Assignment",
    description: "Edit assignment details and grading rubric.",
};

export default async function EditAssignmentPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
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
        class: assignment.class || "",
        dueDate: assignment.due_date || "",
        totalPoints: assignment.total_points,
        instructions: assignment.instructions,
        rubric: assignment.rubric,
        language: assignment.language,
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-16">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Edit Assignment</h1>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        Update assignment details, instructions, and grading
                        rubric.
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
                    Cancel
                </Link>
            </div>

            {/* Edit Assignment Form */}
            <EditAssignmentForm assignment={assignmentData} />
        </main>
    );
}
