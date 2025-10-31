"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";
import { MapPinned } from "lucide-react";

export default function PickupInfoSection() {
  return (
    <PickupInfoWrapper>
      <PickupInfoArea>
        <Header>
          <IconBox>
            <MapPinned size={24} />
          </IconBox>
          <HeaderText>
            <Title>픽업 장소</Title>
            <Subtitle>숭실대학교 한경직 기념관</Subtitle>
          </HeaderText>
        </Header>
        <InfoList>
          <InfoItem>주문 완료 후 주문 QR을 저장합니다.</InfoItem>
          <InfoItem>지정 시간에 픽업 장소로 가 QR 리더기를 스캔합니다.</InfoItem>
          <InfoItem>음식을 수령 후 맛있게 먹습니다.</InfoItem>
        </InfoList>
      </PickupInfoArea>
    </PickupInfoWrapper>
  );
}

const PickupInfoWrapper = styled.section<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.sheetBackground};
`;

const Image = styled.div<{ theme: Theme }>`
  min-height: 80px;
  background: ${({ theme }) => theme.colors.pageBackground};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const PickupInfoArea = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div<{ theme: Theme }>`
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
  border-radius: ${({ theme }) => theme.radius.md};
`;

const HeaderText = styled.div`
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

const InfoList = styled.ul<{ theme: Theme }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const InfoItem = styled.li<{ theme: Theme }>`
  position: relative;
  padding-left: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
