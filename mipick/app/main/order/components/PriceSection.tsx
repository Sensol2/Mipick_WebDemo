"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";

type Props = {
  baseLabel?: string;
  basePrice?: number;
  optionsLabel?: string;
  optionsPrice?: number;
  groupLabel?: string;
  groupPrice?: number;
  total?: number;
};

export default function PriceSection({
  baseLabel = "기본 음식 세트",
  basePrice = 16000,
  optionsLabel = "옵션",
  optionsPrice = 900,
  groupLabel = "그룹 할인",
  groupPrice = -500,
  total = 18000,
}: Props) {
  return (
    <PriceWrapper>
      <Lines>
        <Subtitle>
          {baseLabel} {formatSigned(basePrice)}
        </Subtitle>
        <Subtitle>
          {optionsLabel} {formatSigned(optionsPrice)}
        </Subtitle>
        <Subtitle>
          {groupLabel} {formatSigned(groupPrice)}
        </Subtitle>
      </Lines>

      <Divider />

      <TotalPrice>{formatCurrency(total)}</TotalPrice>
    </PriceWrapper>
  );
}

function formatCurrency(value: number) {
  return value.toLocaleString("ko-KR") + "원";
}

function formatSigned(value: number) {
  const sign = value >= 0 ? "+" : ""; // 음수면 자동으로 - 붙음
  return sign + value.toLocaleString("ko-KR");
}

const PriceWrapper = styled.section<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Lines = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.p<{ theme: Theme }>`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.6;
`;

const Divider = styled.hr<{ theme: Theme }>`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.md} 0;
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  opacity: 0.6;
`;

const TotalPrice = styled.div<{ theme: Theme }>`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.xl};
  color: ${({ theme }) => theme.colors.text};
`;
