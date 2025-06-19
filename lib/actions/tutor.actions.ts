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
