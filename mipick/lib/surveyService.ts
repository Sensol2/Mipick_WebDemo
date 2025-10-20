import { supabase } from './supabase';

export interface SurveyResponse {
  id?: string;
  userId?: string;
  responses: Record<string, string>;
  submittedAt: string;
}

export async function setSurveyResponse(
  surveyResponse: SurveyResponse
): Promise<SurveyResponse | null> {
  try {
    console.log(surveyResponse)
    const { data, error } = await supabase
      .from('survey_responses')
      .insert({
        user_id: surveyResponse.userId,
        responses: surveyResponse.responses,
        submitted_at: surveyResponse.submittedAt,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Error saving survey response:', error);
      return null;
    }

    return {
      id: data.id,
      userId: data.user_id,
      responses: data.responses,
      submittedAt: data.submitted_at,
    };
  } catch (err) {
    console.error('Unexpected error in setSurveyResponse:', err);
    return null;
  }
}
