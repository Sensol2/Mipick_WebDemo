"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";
import { Check, Users } from "lucide-react";

type Props = {
  userCount?: number; // 현재 인원 수
  thresholds?: number[]; // 단계 임계값
};

export default function TogetherProgressSection({
  userCount = 0,
  thresholds = [0, 30, 50, 100],
}: Props) {
  return (
    <ProgressWrapper>
      <ProgressRow>
        <Connector />
        {thresholds.map((t, idx) => {
          const isDone = t >= 0 && userCount >= t;
          return (
            <Step key={t + "-" + idx}>
              <StepSquare $done={isDone}>
                {isDone ? <Check size={22} /> : <Users size={22} />}
              </StepSquare>
              <StepLabel>{t}명</StepLabel>
            </Step>
          );
        })}
      </ProgressRow>
    </ProgressWrapper>
  );
}

const SQUARE = 40; // px

const ProgressWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ProgressRow = styled.div<{ theme: Theme }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Connector = styled.div<{ theme: Theme }>`
  position: absolute;
  top: ${SQUARE / 2}px; /* 정중앙 라인 */
  left: ${SQUARE / 2}px;
  right: ${SQUARE / 2}px;
  height: 4px;
  background: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.4;
  z-index: 0;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1; /* 라인 위로 */
`;

const StepSquare = styled.div<{ theme: Theme; $done: boolean }>`
  width: ${SQUARE}px;
  height: ${SQUARE}px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $done }) => ($done ? theme.colors.primary : theme.colors.text)};
  color: ${({ theme, $done }) => ($done ? theme.colors.surface : theme.colors.surface)};
  box-shadow: ${({ theme }) => theme.shadow.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepLabel = styled.span<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;
