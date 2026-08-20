import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabaseAdminInstance: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdminInstance) {
    return supabaseAdminInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured."
    );
  }

  if (!supabaseSecretKey) {
    throw new Error(
      "SUPABASE_SECRET_KEY is not configured."
    );
  }

  supabaseAdminInstance = createClient(
    supabaseUrl,
    supabaseSecretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  return supabaseAdminInstance;
}

/*
 * Backward-compatible export.
 *
 * Existing server-side files currently import:
 *
 * import { supabaseAdmin } from "@/lib/supabase-admin";
 *
 * The Proxy delays creation of the Supabase client until it is
 * actually used, preventing Vercel build-time failures when
 * environment variables are not available during module evaluation.
 */
export const supabaseAdmin = new Proxy(
  {} as SupabaseClient,
  {
    get(_target, property) {
      const client = getSupabaseAdmin();

      return Reflect.get(
        client as object,
        property,
        client
      );
    },
  }
);