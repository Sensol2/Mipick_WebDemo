import { supabase } from "../supabase";

export async function signInWithGoogle() {
  const response = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return response;
}
