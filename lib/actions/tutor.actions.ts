"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";

interface TutorData {
    id: string;
    name: string;
    subject: string;
    topic: string;
    duration: number;
    style?: string;
    voice?: string;
    author?: string;
    created_at?: string;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TUTORS DB TABLE
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

export const getAllTutors = async ({
    limit = 10,
    page = 1,
    subject,
    topic,
    bookmarked = false,
}: GetAllTutors) => {
    // Convert arrays to strings by taking the first element
    const subjectStr = Array.isArray(subject) ? subject[0] : subject;
    const topicStr = Array.isArray(topic) ? topic[0] : topic;

    // If bookmarked is true, delegate to the existing getBookmarkedTutors function
    if (bookmarked) {
        const { userId } = await auth();
        if (!userId) {
            throw new Error(
                "User must be authenticated to get bookmarked tutors"
            );
        }

        // Get all bookmarked tutors first
        const bookmarkedTutors = await getBookmarkedTutors(userId, limit * 2); // Get more to account for filtering

        // Apply subject/topic filters to bookmarked tutors with null checks
        let filteredTutors = bookmarkedTutors;

        if (subjectStr && topicStr) {
            filteredTutors = bookmarkedTutors.filter(
                (tutor) =>
                    tutor.subject
                        ?.toLowerCase()
                        .includes(subjectStr.toLowerCase()) &&
                    (tutor.topic
                        ?.toLowerCase()
                        .includes(topicStr.toLowerCase()) ||
                        tutor.name
                            ?.toLowerCase()
                            .includes(topicStr.toLowerCase()))
            );
        } else if (subjectStr) {
            filteredTutors = bookmarkedTutors.filter((tutor) =>
                tutor.subject?.toLowerCase().includes(subjectStr.toLowerCase())
            );
        } else if (topicStr) {
            filteredTutors = bookmarkedTutors.filter(
                (tutor) =>
                    tutor.topic
                        ?.toLowerCase()
                        .includes(topicStr.toLowerCase()) ||
                    tutor.name?.toLowerCase().includes(topicStr.toLowerCase())
            );
        }

        // Apply pagination manually
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return filteredTutors
            .slice(startIndex, endIndex)
            .map((tutor) => ({ ...tutor, bookmarked: true }));
    }

    // Original logic for showing all tutors
    const supabase = createSupabaseClient();
    let query = supabase.from("tutors").select("*");

    // Apply subject/topic filters using the converted strings
    if (subjectStr && topicStr) {
        query = query
            .ilike("subject", `%${subjectStr}%`)
            .or(`topic.ilike.%${topicStr}%,name.ilike.%${topicStr}%`);
    } else if (subjectStr) {
        query = query.ilike("subject", `%${subjectStr}%`);
    } else if (topicStr) {
        query = query.or(`topic.ilike.%${topicStr}%,name.ilike.%${topicStr}%`);
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: tutors, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    // Check bookmark status for each tutor
    const { userId } = await auth();
    if (!userId) {
        return tutors?.map((tutor) => ({ ...tutor, bookmarked: false })) || [];
    }

    // Get user's bookmarked tutor IDs
    const { data: bookmarks } = await supabase
        .from("bookmarks")
        .select("tutor_id")
        .eq("user_id", userId);

    const bookmarkedTutorIds = new Set(bookmarks?.map((b) => b.tutor_id) || []);

    return (
        tutors?.map((tutor) => ({
            ...tutor,
            bookmarked: bookmarkedTutorIds.has(tutor.id),
        })) || []
    );
};

export const getUserTutors = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("tutors")
        .select()
        .eq("author", userId);

    if (error) {
        throw new Error(error.message);
    }
    return data || [];
};
// END TUTORS DB TABLE

// TUTOR PERMISSIONS
export const newTutorPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if (has({ plan: "pro" })) {
        return true;
    } else if (has({ feature: "3_tutor_limit" })) {
        limit = 3;
    } else if (has({ feature: "10_tutor_limit" })) {
        limit = 10;
    }

    const { data, error } = await supabase
        .from("tutors")
        .select("id", { count: "exact" })
        .eq("author", userId);

    if (error) {
        throw new Error(error.message);
    }
    const tutorCount = data?.length || 0;

    if (tutorCount >= limit) {
        return false;
    } else {
        return true;
    }
};
// END TUTOR PERMISSIONS

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SESSION_HISTORY DB TABLE
export const addToSessionHistory = async (tutorId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("session_history")
        .insert({ tutor_id: tutorId, user_id: userId })
        .select();

    if (error) throw new Error(error.message);
    return data;
};

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("session_history")
        .select(
            `
            id,
            tutors:tutor_id (*)
        `
        )
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }

    return data
        .filter(({ tutors }) => tutors) // Just check if tutors exists (it's an object, not array)
        .map(({ tutors, id }) => {
            // tutors is an object, not an array
            const tutor = tutors as unknown as TutorData;
            return {
                id: tutor.id,
                name: tutor.name,
                subject: tutor.subject,
                topic: tutor.topic,
                duration: tutor.duration,
                session_history_id: id,
            };
        });
};

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("session_history")
        .select(
            `
            id,
            tutors:tutor_id (*)
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }

    return data
        .filter(({ tutors }) => tutors) // Just check if tutors exists
        .map(({ tutors, id }) => {
            // tutors is an object, not an array
            const tutor = tutors as unknown as TutorData;
            return {
                id: tutor.id,
                name: tutor.name,
                subject: tutor.subject,
                topic: tutor.topic,
                duration: tutor.duration,
                session_history_id: id,
            };
        });
};
// END SESSION_HISTORY DB TABLE

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOOKMARKS DB TABLE
export const addToBookmarks = async (tutorId: string) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User must be authenticated to bookmark tutors");
    }

    const supabase = createSupabaseClient();

    // Use upsert to handle duplicates gracefully
    const { data, error } = await supabase
        .from("bookmarks")
        .upsert(
            { tutor_id: tutorId, user_id: userId },
            { onConflict: "tutor_id,user_id" }
        )
        .select();

    if (error) {
        throw new Error(`Failed to add bookmark: ${error.message}`);
    }

    return data;
};

export const removeFromBookmarks = async (tutorId: string) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User must be authenticated to remove bookmarks");
    }

    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("tutor_id", tutorId)
        .eq("user_id", userId);

    if (error) {
        throw new Error(`Failed to remove bookmark: ${error.message}`);
    }

    return data;
};

export const getBookmarkedTutors = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("bookmarks")
        .select(
            `
            id,
            tutors:tutor_id (*)
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        throw new Error(error.message);
    }

    return data
        .filter(({ tutors }) => tutors)
        .map(({ tutors, id }) => {
            const tutor = tutors as unknown as TutorData;
            return {
                id: tutor.id,
                name: tutor.name,
                subject: tutor.subject,
                topic: tutor.topic,
                duration: tutor.duration,
                bookmark_id: id, // Fixed: was session_history_id
            };
        });
};
// END BOOKMARKS DB TABLE

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USAGE TRACKING
// Free tier limits
const DAILY_LIMIT_MINUTES = 30;
const MONTHLY_LIMIT_MINUTES = 150;

export const updateSessionDuration = async (
    sessionHistoryId: string,
    durationSeconds: number
) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from("session_history")
        .update({ call_duration_seconds: durationSeconds })
        .eq("id", sessionHistoryId);

    if (error) throw new Error(error.message);
    return data;
};

export const getUserUsageMinutes = async (userId: string) => {
    const supabase = createSupabaseClient();

    // Get today's date at midnight (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get first day of current month
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Get daily usage
    const { data: dailyData, error: dailyError } = await supabase
        .from("session_history")
        .select("call_duration_seconds")
        .eq("user_id", userId)
        .gte("created_at", today.toISOString());

    if (dailyError) throw new Error(dailyError.message);

    // Get monthly usage
    const { data: monthlyData, error: monthlyError } = await supabase
        .from("session_history")
        .select("call_duration_seconds")
        .eq("user_id", userId)
        .gte("created_at", firstDayOfMonth.toISOString());

    if (monthlyError) throw new Error(monthlyError.message);

    const dailySeconds =
        dailyData?.reduce(
            (sum, session) => sum + (session.call_duration_seconds || 0),
            0
        ) || 0;
    const monthlySeconds =
        monthlyData?.reduce(
            (sum, session) => sum + (session.call_duration_seconds || 0),
            0
        ) || 0;

    return {
        dailyMinutes: Math.round(dailySeconds / 60),
        monthlyMinutes: Math.round(monthlySeconds / 60),
        dailyLimit: DAILY_LIMIT_MINUTES,
        monthlyLimit: MONTHLY_LIMIT_MINUTES,
    };
};

export const canStartVapiCall = async () => {
    const { userId, has } = await auth();

    if (!userId) {
        throw new Error("User must be authenticated to start a call");
    }

    // Pro users have unlimited usage
    if (has({ plan: "pro" })) {
        return {
            canStart: true,
            reason: null,
            usage: null,
        };
    }

    // Free users have limits
    const usage = await getUserUsageMinutes(userId);

    if (usage.dailyMinutes >= DAILY_LIMIT_MINUTES) {
        return {
            canStart: false,
            reason: "daily",
            usage,
        };
    }

    if (usage.monthlyMinutes >= MONTHLY_LIMIT_MINUTES) {
        return {
            canStart: false,
            reason: "monthly",
            usage,
        };
    }

    return {
        canStart: true,
        reason: null,
        usage,
    };
};
// END USAGE TRACKING
