"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { Page as BasePage, Sheet as BaseSheet, BackButton } from "../components/ui";
import {
  IntroSection,
  SurveySection,
  ShareSection,
  CompleteSection,
  TicketAnimation,
} from "./components";

export default function SurveyPage() {
  const router = useRouter();
  const [step, setStep] = useState<"intro" | "survey" | "share" | "complete">("intro");
  const [tickets, setTickets] = useState(0);
  const [showTicketAnimation, setShowTicketAnimation] = useState(false);

  const [formData, setFormData] = useState({
    // 기본 정보
    name: "",
    phone: "",
    gender: "",
    affiliation: "",
    foodType: "",
    priceRange: "",
    location: "",
    frequency: "",
    knowPath: "",
    satisfaction: "",
    improvements: "",
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSurveySubmit = () => {
    // 필수 항목 검증
    if (!formData.name || !formData.phone || !formData.gender || !formData.affiliation ||
        !formData.foodType || !formData.priceRange || !formData.location || !formData.frequency ||
        !formData.knowPath || !formData.satisfaction) {
      alert("모든 필수 항목을 입력해주세요!");
      return;
    }
    
    setShowTicketAnimation(true);
    setTimeout(() => {
      setTickets(tickets + 1);
      setShowTicketAnimation(false);
      setStep("share");
    }, 1500);
  };

  const handleShareComplete = () => {
    setStep("complete");
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
            onSkip={() => setStep("complete")}
          />
        );
      case "complete":
        return (
          <CompleteSection
            tickets={tickets}
            onGoHome={() => router.push("/todayMenu/list")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Page>
      <BackButton onClick={() => step === "intro" ? router.back() : setStep("intro")}>
        ←
      </BackButton>

      <AnimatedSheet>{renderContent()}</AnimatedSheet>

      <TicketAnimation show={showTicketAnimation} />
    </Page>
  );
}

// ========== Styled Components ==========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Page = styled(BasePage)`
  background: linear-gradient(180deg, #FFF4E6 0%, #FFE5CC 50%, #FFD6B3 100%);
`;

const AnimatedSheet = styled(BaseSheet)`
  animation: ${fadeIn} 0.5s ease-out;
`;
