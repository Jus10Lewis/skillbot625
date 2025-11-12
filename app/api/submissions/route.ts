import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type {
    CreateSubmissionRequest,
    CreateSubmissionResponse,
} from "@/types/grading";
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        // Get authenticated user
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body: CreateSubmissionRequest = await request.json();
        const {
            assignmentId,
            studentName,
            studentCode,
            gradeResponse,
            language,
            totalPoints,
        } = body;

        // Validate required fields
        if (
            !assignmentId ||
            !studentName ||
            !studentCode ||
            !gradeResponse ||
            !language ||
            totalPoints === undefined
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields",
                },
                { status: 400 }
            );
        }

        // Create Supabase client
        const supabase = createSupabaseClient();

        // Insert submission into database
        const { data, error } = await supabase
            .from("submissions")
            .insert({
                assignment_id: assignmentId,
                user_id: userId,
                student_name: studentName,
                submitted_code: studentCode,
                language,
                grade: gradeResponse.total.earned,
                total_points: totalPoints,
                feedback: gradeResponse,
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating submission:", error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to save submission",
                },
                { status: 500 }
            );
        }

        // Map snake_case to camelCase
        const submission = {
            id: data.id,
            assignmentId: data.assignment_id,
            userId: data.user_id,
            studentName: data.student_name,
            submittedCode: data.submitted_code,
            language: data.language,
            grade: data.grade,
            totalPoints: data.total_points,
            feedback: data.feedback,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };

        const response: CreateSubmissionResponse = {
            success: true,
            submission,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error in submissions API:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}
