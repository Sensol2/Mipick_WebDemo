import { useState } from 'react';
import { useAuth } from '../../../hooks/auth';
import { 
  validateFormData,
  createSurveyResponse,
  saveSurveyToLocalStorage,
  clearSurveyFromLocalStorage
} from '../utils/surveyUtils';
import { setSurveyResponse, hasUserSubmittedSurvey } from '../../../../lib/surveyService';

interface UseSurveySubmitOptions {
  formData: Record<string, string>;
  onLoginRequired?: () => void;
  onSuccess?: () => void;
  onAlreadySubmitted?: () => void;
  onValidationError?: (message: string) => void;
  onError?: (error: Error) => void;
}

/**
 * 설문 제출 로직을 관리하는 커스텀 훅
 * - 유효성 검증
 * - 로그인 여부 확인
 * - 중복 제출 방지
 * - LocalStorage 저장 (비로그인 시)
 * - DB 제출 (로그인 시)
 * 
 * @example
 * const { submitSurvey, isSubmitting } = useSurveySubmit({
 *   formData,
 *   onLoginRequired: () => setLoginModalOpen(true),
 *   onSuccess: () => setCurrentStep('share')
 * });
 */
export function useSurveySubmit(options: UseSurveySubmitOptions) {
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSurvey = async (): Promise<boolean> => {
    if (isSubmitting) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // 1단계: 유효성 검증
      if (!validateFormData(options.formData)) {
        const message = '모든 필수 항목을 입력해주세요!';
        if (options.onValidationError) {
          options.onValidationError(message);
        } else {
          alert(message);
        }
        return false;
      }

      // 2단계: 로그인 여부 확인
      if (!isAuthenticated) {
        console.log('💾 Saving survey data to localStorage before login...');
        
        // LocalStorage에 저장
        const saved = saveSurveyToLocalStorage(options.formData);
        
        if (!saved) {
          throw new Error('Failed to save survey data to localStorage');
        }

        console.log('✅ Survey data saved to localStorage');

        // 로그인 모달 열기
        if (options.onLoginRequired) {
          options.onLoginRequired();
        }
        
        return false;
      }

      // 3단계: 중복 제출 확인
      const hasSubmitted = await hasUserSubmittedSurvey();
      if (hasSubmitted) {
        const message = '이미 설문에 참여하셨습니다!';
        if (options.onAlreadySubmitted) {
          options.onAlreadySubmitted();
        } else {
          alert(message);
        }
        return false;
      }

      // 4단계: DB에 제출
      console.log('📤 Submitting survey to database...');
      const surveyResponse = createSurveyResponse(options.formData);
      await setSurveyResponse(surveyResponse);
      
      console.log('✅ Survey submitted successfully');

      // LocalStorage 정리 (혹시 남아있을 수 있는 데이터)
      clearSurveyFromLocalStorage();

      // 성공 콜백
      if (options.onSuccess) {
        options.onSuccess();
      }

      return true;
    } catch (error) {
      console.error('❌ Survey submission error:', error);
      
      if (options.onError) {
        options.onError(error as Error);
      } else {
        alert('설문 제출에 실패했습니다. 다시 시도해주세요.');
      }
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitSurvey,
    isSubmitting,
  };
}
