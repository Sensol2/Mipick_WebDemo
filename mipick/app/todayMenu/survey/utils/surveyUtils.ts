import surveyData from "../surveyData.json";

// 빈 formData 객체 생성
export function initializeFormData(): Record<string, string> {
  const initialData: Record<string, string> = {};
  
  surveyData.pages.forEach(page => {
    page.questions.forEach(question => {
      initialData[question.id] = "";
    });
  });
  
  return initialData;
}

// 필수 항목 검증
export function validateFormData(formData: Record<string, string>): boolean {
  return surveyData.pages.every(page =>
    page.questions
      .filter(q => q.required)
      .every(q => {
        const value = formData[q.id];
        return value && value.trim().length > 0;
      })
  );
}

// 최종 저장할 JSON 구조 생성 (userId는 setSurveyResponse 내부에서 자동 처리)
export function createSurveyResponse(formData: Record<string, string>): { responses: Record<string, string>; submittedAt: string } {
  return {
    responses: formData,
    submittedAt: new Date().toISOString(),
  };
}