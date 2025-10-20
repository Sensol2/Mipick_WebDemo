"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { Sheet as BaseSheet, BackButton } from "../components/ui";
import IntroSection from "./components/IntroSection";
import SurveySection from "./components/SurveySection";
import ShareSection from "./components/ShareSection";
import TicketAnimation from "./components/TicketAnimation";
import { initializeFormData, validateFormData, createSurveyResponse } from "./utils/surveyUtils";
import { setSurveyResponse } from "../../../lib/surveyService";
import { debugFormData } from "./utils/debugUtils";

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState<"intro" | "survey" | "share">("intro");
  const [tickets, setTickets] = useState(0);
  const [showTicketAnimation, setShowTicketAnimation] = useState(false);

  const [formData, setFormData] = useState<Record<string, string>>(initializeFormData);

  // 폼 변경 시
  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  // 설문 완료 시 처리 함수
  const handleSurveySubmit = async () => {
    if (!validateFormData(formData)) {
      alert("모든 필수 항목을 입력해주세요!");
      return;
    }

    setShowTicketAnimation(true);    
    debugFormData(formData);
    
    const TEMP_USER_ID = "558fa1fc-f6b6-452a-9c96-eaf7af8078c5";
    const surveyResponse = createSurveyResponse(formData, TEMP_USER_ID);
    await setSurveyResponse(surveyResponse);

    console.log("저장된 설문 응답:", surveyResponse);
    
    setTimeout(() => {
      setTickets(tickets + 1);
      setShowTicketAnimation(false);
      setStep("share");
    }, 1500);
  };

  const handleShareComplete = () => {
  };

  const renderContent = () => {
    switch (step) {
      case "intro":
        return <IntroSection onStart={() => setStep("survey")} />;
      case "survey":
        return (
          <SurveySection
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleSurveySubmit}
          />
        );
      case "share":
        return (
          <ShareSection
            tickets={tickets}
            onComplete={handleShareComplete}
            onSkip={() => router.push("/todayMenu/")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <BackButton onClick={() => step === "intro" ? router.back() : setStep("intro")}>
        ←
      </BackButton>

      <AnimatedSheet>{renderContent()}</AnimatedSheet>

      <TicketAnimation show={showTicketAnimation} />
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
