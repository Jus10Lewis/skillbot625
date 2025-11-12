import { notFound } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import type { Submission } from "@/types/grading";
import Link from "next/link";

interface ResultsPageProps {
    params: Promise<{
        id: string; // assignment id
        submissionId: string;
    }>;
}

export default async function ResultsPage({ params }: ResultsPageProps) {
    const { id, submissionId } = await params;
    const supabase = createSupabaseClient();

    // Fetch the submission
    const { data: submissionData, error: submissionError } = await supabase
        .from("submissions")
        .select("*")
        .eq("id", submissionId)
        .single();

    if (submissionError || !submissionData) {
        notFound();
    }

    // Map to camelCase
    const submission: Submission = {
        id: submissionData.id,
        assignmentId: submissionData.assignment_id,
        userId: submissionData.user_id,
        studentName: submissionData.student_name,
        submittedCode: submissionData.submitted_code,
        language: submissionData.language,
        grade: submissionData.grade,
        totalPoints: submissionData.total_points,
        feedback: submissionData.feedback,
        createdAt: submissionData.created_at,
        updatedAt: submissionData.updated_at,
    };

    // Fetch the assignment for context
    const { data: assignmentData } = await supabase
        .from("assignments")
        .select("title")
        .eq("id", id)
        .single();

    const assignmentTitle = assignmentData?.title || "Assignment";

    const percentage = submission.feedback.total.percentage;
    const gradeColor =
        percentage >= 90
            ? "text-green-600"
            : percentage >= 80
            ? "text-blue-600"
            : percentage >= 70
            ? "text-yellow-600"
            : "text-red-600";

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href={`/teacher/grading/assignments/${id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
                >
                    ← Back to Assignment
                </Link>
                <h1 className="text-3xl font-bold mb-2">Grading Results</h1>
                <div className="text-gray-600">
                    <div className="font-medium">{assignmentTitle}</div>
                    <div className="text-sm">
                        Student: {submission.studentName}
                    </div>
                    <div className="text-sm">
                        Graded on:{" "}
                        {new Date(submission.createdAt).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Overall Grade */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="text-center">
                    <div className="text-gray-600 mb-2">Overall Grade</div>
                    <div className={`text-5xl font-bold mb-2 ${gradeColor}`}>
                        {submission.feedback.total.earned} /{" "}
                        {submission.feedback.total.max}
                    </div>
                    <div className={`text-2xl font-semibold ${gradeColor}`}>
                        {percentage.toFixed(1)}%
                    </div>
                </div>
            </div>

            {/* GPT Messages */}
            {(submission.feedback.message ||
                !submission.feedback.relevant ||
                submission.feedback.missingCode) && (
                <div className="mb-6 space-y-4">
                    {!submission.feedback.relevant && (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                            <strong>⚠️ Not Relevant:</strong> The submission may
                            not match the assignment requirements.
                        </div>
                    )}
                    {submission.feedback.missingCode && (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                            <strong>⚠️ Missing Code:</strong> No code was found
                            in the submission.
                        </div>
                    )}
                    {submission.feedback.message && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
                            <strong>Message:</strong>{" "}
                            {submission.feedback.message}
                        </div>
                    )}
                </div>
            )}

            {/* Rubric Sections */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Rubric Breakdown</h2>
                <div className="space-y-4">
                    {submission.feedback.sections.map((section) => {
                        const sectionPercentage =
                            (section.score / section.maxPoints) * 100;
                        const sectionColor =
                            sectionPercentage >= 90
                                ? "bg-green-100 border-green-300 text-green-800"
                                : sectionPercentage >= 80
                                ? "bg-blue-100 border-blue-300 text-blue-800"
                                : sectionPercentage >= 70
                                ? "bg-yellow-100 border-yellow-300 text-yellow-800"
                                : "bg-red-100 border-red-300 text-red-800";

                        return (
                            <div
                                key={section.id}
                                className={`border rounded-lg p-4 ${sectionColor}`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold">
                                        {section.title}
                                    </h3>
                                    <div className="font-bold">
                                        {section.score} / {section.maxPoints}
                                    </div>
                                </div>
                                <p className="text-sm">{section.comments}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Summary */}
            {submission.feedback.summary && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-3">Summary</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">
                        {submission.feedback.summary}
                    </p>
                </div>
            )}

            {/* Suggestions */}
            {submission.feedback.suggestions &&
                submission.feedback.suggestions.length > 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-3">
                            Suggestions for Improvement
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {submission.feedback.suggestions.map(
                                (suggestion, index) => (
                                    <li key={index}>{suggestion}</li>
                                )
                            )}
                        </ul>
                    </div>
                )}

            {/* Submitted Code */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">Submitted Code</h2>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 overflow-x-auto">
                    <pre className="text-sm">
                        <code>{submission.submittedCode}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
