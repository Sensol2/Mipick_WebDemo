"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";
import { Check } from "lucide-react";
import OptionListSection from "./OptionListSection";

export default function OptionSection() {
  return (
    <OptionWrapper>
      <OptionHeaderWrapper>
        <IconBox>
          <Check size={24} />
        </IconBox>
        <TextArea>
          <Title>옵션 선택</Title>
          <Subtitle>선택사항입니다</Subtitle>
        </TextArea>
      </OptionHeaderWrapper>
      <OptionListSection />
    </OptionWrapper>
  );
}

const OptionWrapper = styled.section<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.sheetBackground};
  border: 2px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: ${({ theme }) => theme.spacing.md};
`;

const OptionHeaderWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconBox = styled.div<{ theme: Theme }>`
  width: 48px;
  height: 48px;
  background: ${({ theme }) => theme.colors.iconBoxBackground};
  color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3<{ theme: Theme }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p<{ theme: Theme }>`
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.6;
`;
