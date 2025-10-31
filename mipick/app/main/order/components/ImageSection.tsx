"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";
import { Info } from "lucide-react";

export default function ImageSection() {
  return (
    <>
      <ImageWrapper>
        <Image src="/menuImages/menu7.jpg" alt="Intro Image" />
        <ImageOverlay />
        <TextWrapper>
          <Title>광동 차슈 덮밥</Title>
          <Price>14,900원</Price>
        </TextWrapper>
      </ImageWrapper>
      <InfoWrapper>
        <Info size={20} />
        <InfoText>메뉴를 고를 필요가 없습니다. 미픽은 엄선된 단 하나의 메뉴만 제공합니다.</InfoText>
      </InfoWrapper>
    </>
  );
}

const ImageWrapper = styled.div<{ theme: Theme }>`
  position: relative;
  width: 100%;
  min-height: 200px;
  margin-top: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  overflow: hidden;

  /* 화면비 유지: 스크린샷과 비슷한 5:3 비율 */
  aspect-ratio: 5 / 2;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ImageOverlay = styled.div<{ theme: Theme }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9));
  opacity: 0.8;
  pointer-events: none;
`;

const TextWrapper = styled.div<{ theme: Theme }>`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h2<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.xl};
  margin: 0;
`;

const Price = styled.p<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
  opacity: 0.9;
`;

const InfoWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.sm} 0;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;

const InfoText = styled.p<{ theme: Theme }>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;
