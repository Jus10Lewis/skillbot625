import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Check authentication
        const session = await auth();
        if (!session.userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;

        // Parse request body
        const body = await request.json();

        // Validate required fields
        if (
            !body.title ||
            !body.instructions ||
            !body.rubric ||
            !body.language ||
            !body.totalPoints
        ) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Missing required fields: title, instructions, rubric, language, and totalPoints are required",
                },
                { status: 400 }
            );
        }

        // Validate totalPoints is a positive number
        if (body.totalPoints <= 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Total points must be greater than 0",
                },
                { status: 400 }
            );
        }

        // Create Supabase client
        const supabase = createSupabaseClient();

        // Update assignment in database
        const { data, error } = await supabase
            .from("assignments")
            .update({
                title: body.title,
                class: body.class || null,
                due_date: body.dueDate || null,
                total_points: body.totalPoints,
                instructions: body.instructions,
                rubric: body.rubric,
                language: body.language,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .eq("user_id", session.userId)
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to update assignment",
                },
                { status: 500 }
            );
        }

        if (!data) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Assignment not found",
                },
                { status: 404 }
            );
        }

        // Map database fields to response format
        const assignment = {
            id: data.id,
            title: data.title,
            class: data.class,
            dueDate: data.due_date,
            totalPoints: data.total_points,
            instructions: data.instructions,
            rubric: data.rubric,
            language: data.language,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            userId: data.user_id,
        };

        return NextResponse.json({
            success: true,
            assignment,
        });
    } catch (error) {
        console.error("Error updating assignment:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}
