export interface SurveyResponse {
  id?: string;
  responses: Record<string, string>;
  submittedAt: string;
}

export async function saveSurveyResponse(surveyResponse: SurveyResponse): Promise<SurveyResponse> {
  // 목업 저장 - 실제로는 저장하지 않고 콘솔에만 출력
  console.log("📋 설문 응답 저장 시뮬레이션");
  console.log("==========================================");
  console.log("저장될 데이터:", JSON.stringify(surveyResponse, null, 2));
  console.log("==========================================");
  
  // 저장 시뮬레이션 (1초 대기)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockResponse: SurveyResponse = {
    ...surveyResponse,
    id: `mock_${Date.now()}`,
  };
  
  console.log("✅ 저장 완료 (시뮬레이션):", mockResponse.id);
  
  return mockResponse;
}

export async function getSurveyResponses(): Promise<SurveyResponse[]> {
  console.log("📊 설문 조회 시뮬레이션 - 저장된 데이터가 없습니다.");
  return [];
}