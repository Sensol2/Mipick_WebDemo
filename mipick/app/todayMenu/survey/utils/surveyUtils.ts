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

// ========== LocalStorage 관련 유틸리티 ==========

const STORAGE_KEYS = {
  SURVEY_DATA: 'mipick_pending_survey_data',
  PENDING_SUBMIT: 'mipick_survey_pending_submit',
  SUBMIT_TIMESTAMP: 'mipick_survey_submit_timestamp',
} as const;

// LocalStorage 사용 가능 여부 확인
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

// LocalStorage에 설문 응답 임시 저장
export function saveSurveyToLocalStorage(formData: Record<string, string>): boolean {
  if (!isLocalStorageAvailable()) {
    console.warn('LocalStorage is not available');
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.SURVEY_DATA, JSON.stringify(formData));
    localStorage.setItem(STORAGE_KEYS.PENDING_SUBMIT, 'true');
    localStorage.setItem(STORAGE_KEYS.SUBMIT_TIMESTAMP, new Date().toISOString());
    return true;
  } catch (error) {
    console.error('Failed to save survey data to localStorage:', error);
    return false;
  }
}

// LocalStorage에서 설문 응답 불러오기
export function loadSurveyFromLocalStorage(): Record<string, string> | null {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  try {
    const savedData = localStorage.getItem(STORAGE_KEYS.SURVEY_DATA);
    if (!savedData) {
      return null;
    }

    const parsedData = JSON.parse(savedData);
    
    // 데이터 유효성 검사
    if (typeof parsedData !== 'object' || parsedData === null) {
      console.warn('Invalid survey data format in localStorage');
      clearSurveyFromLocalStorage();
      return null;
    }

    return parsedData;
  } catch (error) {
    console.error('Failed to load survey data from localStorage:', error);
    clearSurveyFromLocalStorage();
    return null;
  }
}

// LocalStorage에서 설문 응답 삭제
export function clearSurveyFromLocalStorage(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEYS.SURVEY_DATA);
    localStorage.removeItem(STORAGE_KEYS.PENDING_SUBMIT);
    localStorage.removeItem(STORAGE_KEYS.SUBMIT_TIMESTAMP);
  } catch (error) {
    console.error('Failed to clear survey data from localStorage:', error);
  }
}

// 제출 대기 중인지 확인
export function isPendingSurveySubmit(): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    const isPending = localStorage.getItem(STORAGE_KEYS.PENDING_SUBMIT) === 'true';
    
    if (isPending) {
      // 24시간 이상 경과한 데이터는 자동 삭제
      const timestamp = localStorage.getItem(STORAGE_KEYS.SUBMIT_TIMESTAMP);
      if (timestamp) {
        const savedTime = new Date(timestamp).getTime();
        const now = new Date().getTime();
        const hoursPassed = (now - savedTime) / (1000 * 60 * 60);
        
        if (hoursPassed > 24) {
          console.log('Survey data expired (>24h), clearing...');
          clearSurveyFromLocalStorage();
          return false;
        }
      }
    }
    
    return isPending;
  } catch (error) {
    console.error('Failed to check pending survey submit:', error);
    return false;
  }
}

// 저장된 설문 데이터가 있는지 확인
export function hasSavedSurveyData(): boolean {
  return isPendingSurveySubmit() && loadSurveyFromLocalStorage() !== null;
}
