import { useEffect, useRef } from 'react';
import { useAuth } from '../../../hooks/auth';
import { 
  loadSurveyFromLocalStorage, 
  clearSurveyFromLocalStorage,
  isPendingSurveySubmit 
} from '../utils/surveyUtils';
import { setSurveyResponse } from '../../../../lib/api/surveyService';
import { createSurveyResponse } from '../utils/surveyUtils';

interface UseSurveyAutoSubmitOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * 로그인 후 LocalStorage에 저장된 설문 데이터를 자동으로 제출하는 훅
 * 
 * @example
 * useSurveyAutoSubmit({
 *   onSuccess: () => router.push('/survey/complete'),
 *   onError: (error) => alert('제출 실패')
 * });
 */
export function useSurveyAutoSubmit(options: UseSurveyAutoSubmitOptions = {}) {
  const { user, isAuthenticated } = useAuth();
  const isSubmitting = useRef(false);
  const hasAttempted = useRef(false);

  useEffect(() => {
    // 이미 시도했거나, 제출 중이거나, 로그인하지 않았으면 스킵
    if (hasAttempted.current || isSubmitting.current || !isAuthenticated || !user) {
      return;
    }

    // 제출 대기 중인 데이터가 없으면 스킵
    if (!isPendingSurveySubmit()) {
      return;
    }

    const submitPendingSurvey = async () => {
      // 중복 실행 방지
      if (isSubmitting.current) {
        return;
      }

      isSubmitting.current = true;
      hasAttempted.current = true;

      try {
        // LocalStorage에서 저장된 데이터 불러오기
        const savedData = loadSurveyFromLocalStorage();
        
        if (!savedData) {
          console.warn('No saved survey data found');
          return;
        }

        console.log('🔄 Auto-submitting saved survey data...');

        // 설문 응답 제출
        const surveyResponse = createSurveyResponse(savedData);
        await setSurveyResponse(surveyResponse);

        console.log('✅ Survey auto-submitted successfully');

        // LocalStorage 정리
        clearSurveyFromLocalStorage();

        // 성공 콜백 실행
        if (options.onSuccess) {
          options.onSuccess();
        }
      } catch (error) {
        console.error('❌ Failed to auto-submit survey:', error);
        
        // 에러 콜백 실행
        if (options.onError) {
          options.onError(error as Error);
        }
      } finally {
        isSubmitting.current = false;
      }
    };

    // 500ms 딜레이 후 제출 (사용자 경험 개선)
    const timeoutId = setTimeout(() => {
      submitPendingSurvey();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [user, isAuthenticated, options]);

  return {
    isSubmitting: isSubmitting.current,
  };
}
