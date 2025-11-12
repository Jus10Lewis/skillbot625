import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import type {
    CreateAssignmentRequest,
    CreateAssignmentResponse,
} from "@/types/grading";

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session.userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Parse request body
        const body: CreateAssignmentRequest = await request.json();

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

        // Insert assignment into database
        const { data, error } = await supabase
            .from("assignments")
            .insert([
                {
                    title: body.title,
                    class: body.class || null,
                    due_date: body.dueDate || null,
                    total_points: body.totalPoints,
                    instructions: body.instructions,
                    rubric: body.rubric,
                    language: body.language,
                    user_id: session.userId,
                    created_at: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to create assignment",
                },
                { status: 500 }
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
            userId: data.user_id,
        };

        return NextResponse.json({
            success: true,
            assignment,
        } as CreateAssignmentResponse);
    } catch (error) {
        console.error("Error creating assignment:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Check authentication
        const session = await auth();
        if (!session.userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Create Supabase client
        const supabase = createSupabaseClient();

        // Fetch assignments for the current user
        const { data, error } = await supabase
            .from("assignments")
            .select("*")
            .eq("user_id", session.userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to fetch assignments",
                },
                { status: 500 }
            );
        }

        // Map database fields to response format
        const assignments = data.map((row) => ({
            id: row.id,
            title: row.title,
            class: row.class,
            dueDate: row.due_date,
            totalPoints: row.total_points,
            instructions: row.instructions,
            rubric: row.rubric,
            language: row.language,
            createdAt: row.created_at,
            userId: row.user_id,
        }));

        return NextResponse.json({
            success: true,
            assignments,
        });
    } catch (error) {
        console.error("Error fetching assignments:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
            },
            { status: 500 }
        );
    }
}
