import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";

export const supabase = createClient(
    import.meta.env.VITE_APP_SUPA_URL,
    import.meta.env.VITE_APP_SUPA_KEY
);

export const queryClient = new QueryClient();
