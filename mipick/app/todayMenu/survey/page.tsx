"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { Sheet as BaseSheet, BackButton } from "../components/ui";
import IntroSection from "./components/IntroSection";
import SurveySection from "./components/SurveySection";
import ShareSection from "./components/ShareSection";
import CompleteSection from "./components/CompleteSection";
import TicketAnimation from "./components/TicketAnimation";

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
    referrer: "",
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
`;
