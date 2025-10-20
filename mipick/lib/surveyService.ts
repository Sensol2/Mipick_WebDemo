import { generateRandomCode } from '@/app/todayMenu/survey/utils/codeGenerator';
import { supabase } from './supabase';


export interface CreateSurveyInput {
  responses: Record<string, string>;
  submittedAt: string;
}

// 설문 응답 저장
export async function setSurveyResponse(surveyInput: CreateSurveyInput): Promise<null> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;


  // 내 추천인 코드 랜덤 생성
  const myInvitedCode = generateRandomCode() || null;

  // responses에서 referrer 필드 추출
  const invitedCode = surveyInput.responses.invitedCode || null;

  const { data, error } = await supabase
    .from('survey_responses')
    .insert({
      user_id: user.id,
      responses: surveyInput.responses,
      my_invite_code: myInvitedCode,
      invited_code: invitedCode,
      submitted_at: surveyInput.submittedAt,
    })
    .select()
    .single();

    if (error) {
      console.error("Survey insert error:", error);
      return null;
    }
    return data;
}

// 현재 로그인한 사용자가 설문조사를 제출했는지 확인
export async function hasUserSubmittedSurvey(): Promise<boolean> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return false;

  const { data, error } = await supabase
    .from('survey_responses')
    .select('id')
    .eq('user_id', user.id)
    .limit(1);

  if (error) return false;
  return data && data.length > 0;
}
