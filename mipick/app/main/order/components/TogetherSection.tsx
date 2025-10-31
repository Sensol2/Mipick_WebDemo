"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";
import { Users } from "lucide-react";
import TogetherProgressSection from "./TogetherProgressSection";

export default function TogetherSection() {
  return (
    <TogetherWrapper>
      <TogetherHeaderWrapper>
        <IconBox>
          <Users size={24} />
        </IconBox>
        <TextArea>
          <Title>34명의 학우들과 함께하세요.</Title>
          <Subtitle>뭉치면 혜택이 늘어난다고요.</Subtitle>
        </TextArea>
      </TogetherHeaderWrapper>
      <TogetherProgressSection />
    </TogetherWrapper>
  );
}

const TogetherWrapper = styled.section<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.sheetBackground};
  //   border-radius: ${({ theme }) => theme.radius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: ${({ theme }) => theme.spacing.md};
`;

const TogetherHeaderWrapper = styled.div<{ theme: Theme }>`
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
