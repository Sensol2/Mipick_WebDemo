import { supabase } from './supabase';

export interface SurveyResponse {
  id?: string;
  userId?: string;
  responses: Record<string, string>;
  submittedAt: string;
}

export interface CreateSurveyInput {
  responses: Record<string, string>;
  submittedAt: string;
}

export async function setSurveyResponse(surveyInput: CreateSurveyInput): Promise<SurveyResponse | null> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data, error } = await supabase
    .from('survey_responses')
    .insert({
      user_id: user.id,
      responses: surveyInput.responses,
      submitted_at: surveyInput.submittedAt,
    })
    .select()
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    userId: data.user_id,
    responses: data.responses,
    submittedAt: data.submitted_at,
  };
}

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
