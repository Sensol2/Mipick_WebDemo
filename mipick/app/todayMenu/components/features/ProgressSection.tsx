import styled from "styled-components";
import { Check } from "lucide-react";

interface ProgressSectionProps {
  currentOrders: number;
}

const steps = [
  { num: 0, reward: "배달비 무료" },
  { num: 30, reward: "300원 할인" },
  { num: 50, reward: "500원 할인" },
  { num: 100, reward: "음료 무료" },
];

export default function ProgressSection({ currentOrders }: ProgressSectionProps) {
  return (
    <Container>
      <Title>현재 {currentOrders}명 주문중</Title>
      <Steps>
        {steps.map((step, idx) => (
          <Step key={step.num}>
            <StepLabel>{step.num}명</StepLabel>
            <StepCircle $active={currentOrders >= step.num}>
              {currentOrders >= step.num ? <Check size={14} /> : idx + 1}
            </StepCircle>
            <StepReward>{step.reward}</StepReward>
          </Step>
        ))}
        <ProgressLine>
          <ProgressFill $width={((currentOrders - 0) / 100) * 100} />
        </ProgressLine>
      </Steps>
    </Container>
  );
}

const Container = styled.div`
  background: #fafafa;
  border-radius: 12px;
  padding: 20px 0;
  margin-top: 10px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 14px 0;
  text-align: center;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  z-index: 10;
  position: relative;
`;

const StepLabel = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 6px 0;
`;

const StepCircle = styled.div<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  border: 3px solid ${(props) => (props.$active ? "#22c55e" : "#d1d5db")};
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$active ? "white" : "#6b7280")};
  background: ${(props) => (props.$active ? "#22c55e" : "white")};
  font-size: 13px;
  font-weight: 700;
  box-shadow: ${(props) =>
    props.$active ? "0 2px 8px rgba(34, 197, 94, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.1)"};
`;

const StepReward = styled.p`
  font-size: 11px;
  color: #1f2937;
  font-weight: 600;
  margin: 6px 0 0 0;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: calc(12px + 6px + 19px);
  left: 55px;
  right: 55px;
  height: 5px;
  background: #e5e7eb;
  z-index: 0;
  border-radius: 3px;
`;

const ProgressFill = styled.div<{ $width: number }>`
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 3px;
  transition: width 0.3s ease;
  width: ${(props) => props.$width}%;
`;
