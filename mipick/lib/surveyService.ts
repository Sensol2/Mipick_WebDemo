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

  // 내 추천 코드 생성
  const myInviteCode = generateRandomCode() || null;

  // 설문 응답 내 추천인 코드 추출
  const invitedCode = surveyInput.responses.invitedCode || null;

  // 설문 응답 데이터 삽입
  const { data, error } = await supabase
    .from('survey_responses')
    .insert({
      user_id: user.id,
      responses: surveyInput.responses,
      my_invite_code: myInviteCode,
      invited_code: invitedCode,
      ticket_count: 1,
      submitted_at: surveyInput.submittedAt,
    })
    .select()
    .single();

  if (error) {
    console.error("Survey insert error:", error);
    return null;
  }

  // 추천인 코드가 있을 경우, 해당 코드로 등록된 사용자 찾아 티켓 +1
  if (invitedCode) {
    const { data: referrer, error: findError } = await supabase
      .from('survey_responses')
      .select('id, ticket_count')
      .eq('my_invite_code', invitedCode)
      .single();

    if (findError) {
      console.warn('No referrer found for code:', invitedCode);
    } else if (referrer) {
      const { error: updateError } = await supabase
        .from('survey_responses')
        .update({
          ticket_count: referrer.ticket_count + 1,
        })
        .eq('id', referrer.id);

      if (updateError) {
        console.error('Error updating referrer ticket_count:', updateError);
      } else {
        console.log(`Referrer ${referrer.id} ticket_count incremented to ${referrer.ticket_count + 1}`);
      }
    }
  }

  // 3완료 후 새로 삽입된 데이터 반환
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

// 현재 로그인한 사용자의 초대 코드 가져오기
export async function getMyInviteCode(): Promise<string | null> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data, error } = await supabase
    .from('survey_responses')
    .select('my_invite_code')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching invite code:', error);
    return null;
  }

  return data?.my_invite_code || null;
}
