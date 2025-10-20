"use client";

import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { Sheet as BaseSheet, BackButton } from "../components/ui";
import IntroSection from "./components/IntroSection";
import SurveySection from "./components/SurveySection";
import ShareSection from "./components/ShareSection";
import TicketAnimation from "./components/TicketAnimation";
import LoginModal from "./components/LoginModal";
import { initializeFormData, validateFormData, createSurveyResponse } from "./utils/surveyUtils";
import { setSurveyResponse, hasUserSubmittedSurvey } from "../../../lib/surveyService";
import { useAuth } from "../../hooks/auth";

export default function SurveyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, loading: authLoading } = useAuth();

  // 페이지 단계 관리
  const [currentStep, setCurrentStep] = useState<"intro" | "survey" | "share">("intro");
  
  // 설문 데이터 관리
  const [formData, setFormData] = useState<Record<string, string>>(initializeFormData);
  
  // 인증 및 참여 상태
  const [isParticipated, setIsParticipated] = useState(false);
  const [isCheckingParticipation, setIsCheckingParticipation] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // UI 상태
  const [ticketCount, setTicketCount] = useState(0);
  const [isShowingTicketAnimation, setIsShowingTicketAnimation] = useState(false);

  // 1. 페이지 로드 시: 사용자의 설문 참여 여부 확인
  useEffect(() => {
    async function checkUserParticipation() {
      // 인증 로딩 중이면 대기
      if (authLoading) return;
      
      // 로그인 상태면 참여 여부 확인
      if (isAuthenticated) {
        const participated = await hasUserSubmittedSurvey();
        setIsParticipated(participated);
      }
      
      setIsCheckingParticipation(false);
    }

    checkUserParticipation();
  }, [isAuthenticated, authLoading]);

  // 2. OAuth 로그인 후 자동 제출 처리
  useEffect(() => {
    const isPostLogin = searchParams?.get('postLogin') === '1';
    
    async function autoSubmitAfterLogin() {
      if (isPostLogin && isAuthenticated && !isParticipated) {
        // 티켓 애니메이션 시작
        setIsShowingTicketAnimation(true);
        
        // 서버에 설문 응답 저장
        const surveyResponse = createSurveyResponse(formData);
        await setSurveyResponse(surveyResponse);
        
        // 1.5초 후 애니메이션 종료 및 공유 페이지로 이동
        setTimeout(() => {
          setTicketCount(prev => prev + 1);
          setIsShowingTicketAnimation(false);
          setCurrentStep("share");
        }, 1500);
      }
    }

    autoSubmitAfterLogin();
  }, [searchParams, isAuthenticated, isParticipated, formData]);

  // 폼 입력값 변경 핸들러
  function handleFormChange(field: string, value: string) {
    setFormData({ ...formData, [field]: value });
  }

  // 설문 제출 버튼 클릭 핸들러
  async function handleSubmitClick() {
    // 1단계: 필수 항목 검증
    if (!validateFormData(formData)) {
      alert("모든 필수 항목을 입력해주세요!");
      return;
    }

    // 2단계: 로그인 확인
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    // 3단계: 중복 제출 방지
    const alreadyParticipated = await hasUserSubmittedSurvey();
    if (alreadyParticipated) {
      alert("이미 설문에 참여하셨습니다!");
      setIsParticipated(true);
      setCurrentStep("intro");
      return;
    }

    // 4단계: 설문 제출
    await handleSurveySubmission();
  }

  // 실제 설문 제출 처리
  async function handleSurveySubmission() {
    // 티켓 애니메이션 시작
    setIsShowingTicketAnimation(true);
    
    // 서버에 설문 응답 저장
    const surveyResponse = createSurveyResponse(formData);
    await setSurveyResponse(surveyResponse);
    
    // 0.5초 후 애니메이션 종료 및 공유 페이지로 이동
    setTimeout(() => {
      setTicketCount(prev => prev + 1);
      setIsShowingTicketAnimation(false);
      setCurrentStep("share");
    }, 500);
  }

  // 현재 단계에 따른 컴포넌트 렌더링
  function renderCurrentStep() {
    switch (currentStep) {
      case "intro":
        // 로딩 중일 때
        if (isCheckingParticipation) {
          return (
            <LoadingContainer>
              <Spinner />
              <LoadingText>확인 중...</LoadingText>
            </LoadingContainer>
          );
        }
        
        // 이미 참여한 사용자는 ShareSection 보여주기
        if (isParticipated) {
          return (
            <ShareSection
              tickets={ticketCount}
              onSkip={() => router.push("/todayMenu/")}
            />
          );
        }
        
        // 첫 방문자는 IntroSection 보여주기
        return (
          <IntroSection 
            onStart={() => setCurrentStep("survey")} 
            hasParticipated={isParticipated}
            isLoading={isCheckingParticipation}
          />
        );
      
      case "survey":
        return (
          <SurveySection
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSubmitClick}
          />
        );
      
      case "share":
        return (
          <ShareSection
            tickets={ticketCount}
            onSkip={() => router.push("/todayMenu/")}
          />
        );
      
      default:
        return null;
    }
  }

  // 뒤로가기 버튼 핸들러
  function handleBackClick() {
    if (currentStep === "intro") {
      router.back();
    } else {
      setCurrentStep("intro");
    }
  }

  return (
    <>
      <BackButton onClick={handleBackClick}>
        ←
      </BackButton>

      <AnimatedSheet>
        {renderCurrentStep()}
      </AnimatedSheet>

      <TicketAnimation show={isShowingTicketAnimation} />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
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
