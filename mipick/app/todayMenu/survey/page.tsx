"use client";

import { useState, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { Sheet as BaseSheet, BackButton } from "../components/ui";
import IntroSection from "./components/IntroSection";
import SurveySection from "./components/SurveySection";
import ShareSection from "./components/ShareSection";
import LoginModal from "./components/LoginModal";
import { initializeFormData } from "./utils/surveyUtils";
import { hasUserSubmittedSurvey } from "../../../lib/surveyService";
import { useAuth } from "../../hooks/auth";
import { useSurveySubmit } from "./hooks/useSurveySubmit";
import { useSurveyAutoSubmit } from "./hooks/useSurveyAutoSubmit";

type Step = "loading" | "intro" | "survey" | "share";

export default function SurveyPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState<Step>("loading");
  const [formData, setFormData] = useState<Record<string, string>>(initializeFormData);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 설문 제출 훅
  const { submitSurvey, isSubmitting } = useSurveySubmit({
    formData,
    onLoginRequired: () => setIsLoginModalOpen(true),
    onSuccess: () => {
      setTimeout(() => setCurrentStep("share"), 1000);
    },
    onAlreadySubmitted: () => {
      setCurrentStep("share");
    },
  });

  // 로그인 후 자동 제출 훅
  useSurveyAutoSubmit({
    onSuccess: () => {
      console.log('✅ Auto-submit completed, redirecting to share page...');
      setTimeout(() => setCurrentStep("share"), 1500);
    },
    onError: (error) => {
      console.error('Auto-submit failed:', error);
      alert('설문 제출에 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 참여 여부 확인 및 초기 화면 설정
  useEffect(() => {
    if (authLoading) return;

    (async () => {
      if (isAuthenticated) {
        const participated = await hasUserSubmittedSurvey();
        setCurrentStep(participated ? "share" : "intro");
      } else {
        setCurrentStep("intro");
      }
    })();
  }, [isAuthenticated, authLoading]);

  // 폼 입력 핸들러
  const handleFormChange = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  // 설문 제출 핸들러
  const handleSubmitClick = async () => {
    await submitSurvey();
  };

  // 뒤로가기
  const handleBackClick = () =>
    currentStep === "intro" || currentStep === "loading" ? router.back() : setCurrentStep("intro");

  // 단계별 컴포넌트 매핑
  const stepComponents: Record<Step, React.ReactElement> = useMemo(
    () => ({
      loading: (
        <LoadingContainer>
          <Spinner />
          <LoadingText>확인 중...</LoadingText>
        </LoadingContainer>
      ),
      intro: (
        <IntroSection 
          onStart={() => setCurrentStep("survey")} 
          hasParticipated={false}
          isLoading={false}
        />
      ),
      survey: (
        <SurveySection
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmitClick}
        />
      ),
      share: (
        <ShareSection />
      ),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, isSubmitting]
  );

  return (
    <>
      <BackButton onClick={handleBackClick}>←</BackButton>

      <AnimatedSheet>{stepComponents[currentStep]}</AnimatedSheet>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

// ========== Styled Components ==========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedSheet = styled(BaseSheet)`
  animation: ${fadeIn} 0.5s ease-out;

  /* 아래 내용이 있어야 스크롤 가능 */
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;

  /* 스크롤 시 버튼 오작동 방지 */
  touch-action: pan-y;

  button {
    touch-action: manipulation;
  }
`;

// 로딩 컴포넌트
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 60px 24px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #FF6B35;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;
