import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client with service role access for server-side operations.
 * This bypasses Row Level Security (RLS) policies.
 *
 * IMPORTANT: Only use this in server-side code (API routes, Server Components)
 * where you have already authenticated the user with Clerk.
 * Never expose this client to the browser.
 */
export const createSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error(
            "Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env file."
        );
    }

    return createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
};
