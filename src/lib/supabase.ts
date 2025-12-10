
import { createClient } from "@supabase/supabase-js";

// Basic type for our database profile
export type Profile = {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    updated_at: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing required Supabase environment variables. " +
        "Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file."
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);