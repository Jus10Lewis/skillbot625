"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

export const createTutor = async (formData: CreateTutor) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from("tutors")
        .insert({ ...formData, author })
        .select();

    if (error || !data) {
        throw new Error(error?.message || "Failed to create tutor");
    }
    return data[0];
};

export const getAllTutors = async ({
    limit = 10,
    page = 1,
    subject,
    topic,
}: GetAllTutors) => {
    const supabase = createSupabaseClient();
    let query = supabase.from("tutors").select("*");

    if (subject && topic) {
        query = query
            .ilike("subject", `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
        query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }
    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: tutors, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return tutors;
};

export const getTutor = async (id: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("tutors")
        .select("*")
        .eq("id", id);
    if (error) {
        return console.error("Error fetching tutor:", error);
    }

    return data?.[0] || null;
};

export const addToSessionHistory = async (tutorId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("session_history")
        .insert({ tutor_id: tutorId, user_id: userId });

    if (error) throw new Error(error.message);
    return data;
};

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("session_history")
        .select(`tutors:tutor_id (*)`)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }
    return data.map(({ tutors }) => tutors);
};

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("session_history")
        .select(`tutors:tutor_id (*)`)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }
    return data.map(({ tutors }) => tutors);
};
