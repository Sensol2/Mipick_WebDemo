import { supabase } from "../api/supabase";

// 인증 후 redirectTo 지정 가능 (미지정 시 Supabase Site URL 사용)
export async function signInWithKakao(redirectTo?: string) {
  const response = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: redirectTo ? { redirectTo } : undefined,
  });
  return response;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getSession();
  console.log('getUser data:', data);
  return {data, error};
}
