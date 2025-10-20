import { supabase } from "../supabase";

export async function signInWithGoogle(redirectTo?: string) {
  const response = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: redirectTo ? { redirectTo } : undefined,
  });
  return response;
}
