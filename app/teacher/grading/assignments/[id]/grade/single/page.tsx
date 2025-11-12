import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import SingleStudentGradeForm from "./SingleStudentGradeForm";

export const metadata: Metadata = {
    title: "Grade Student Submission",
    description: "Enter student code and get AI-powered grading feedback.",
};

export default async function SingleStudentGradePage({
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
        totalPoints: assignment.total_points,
        instructions: assignment.instructions,
        rubric: assignment.rubric,
        language: assignment.language,
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-16">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Grade Student Submission
                    </h1>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        {assignmentData.title} • {assignmentData.language} •{" "}
                        {assignmentData.totalPoints} points
                    </p>
                </div>
                <Link
                    href={`/teacher/grading/assignments/${id}/grade`}
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
                    Back to Grading Options
                </Link>
            </div>

            {/* Assignment context */}
            <div className="mb-6 p-4 rounded-lg border bg-muted/20">
                <details>
                    <summary className="cursor-pointer font-medium text-sm flex items-center gap-2 hover:text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        View Assignment Instructions & Rubric
                    </summary>
                    <div className="mt-4 space-y-4">
                        <div>
                            <h3 className="font-semibold text-sm mb-2">
                                Instructions:
                            </h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {assignmentData.instructions}
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm mb-2">
                                Grading Rubric:
                            </h3>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                {assignmentData.rubric}
                            </p>
                        </div>
                    </div>
                </details>
            </div>

            {/* Grading Form */}
            <SingleStudentGradeForm assignment={assignmentData} />

            <section className="mt-16 p-6 rounded-lg border bg-muted/30">
                <h2 className="text-lg font-semibold mb-3">
                    Page Notes (/grading/assignments/[id]/grade/single)
                </h2>
                <p className="text-sm mb-4">
                    <span className="font-medium">Purpose:</span> Single student
                    text entry for grading. Teacher enters student name and
                    pastes their code, then submits to GPT API for grading.
                </p>
                <div>
                    <h3 className="font-medium mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                        Features
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Student name/ID field</li>
                        <li>Large code text area</li>
                        <li>View assignment context (collapsible)</li>
                        <li>Submit to GPT API for grading</li>
                        <li>
                            Redirect to results page after successful grading
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
