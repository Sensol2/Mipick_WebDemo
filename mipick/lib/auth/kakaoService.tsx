import { supabase } from "../supabase";

// 인증 후 기본 URL(Site URL)로 리다이렉트
export async function signInWithKakao() {
  const response = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
  });
  return response;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getSession();
  console.log('getUser data:', data);
  return {data, error};
}
