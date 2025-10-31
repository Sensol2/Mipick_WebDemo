"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";

export default function MenuDescriptionSection() {
  return (
    <MenuDescriptionWrapper>
      <Title>오늘의 데일리 큐레이션</Title>
      <Description>
        닭, 오리, 돼지. 촉촉하게 구운 싱가포르식 닭과 오리. 그리고 차슈. 껍질을 바삭하게 구운
        돼지바베큐. 다 구워, 먹기 좋게 썰어 나오고, 찬요리로 나오니 기다릴 필요가 없다. 성수에는
        없는 덤플링이 있어 맛볼 수 있다. 와인도 백주도 맥주도 잘 어울리는 안주. 밥과 누들을 곁들이면
        식사로도 손색이 없다.
      </Description>

      <Title>에디터 코멘트</Title>
      <Description>"미쉐린 가이드에는 감동과 낭만이 있다."</Description>
    </MenuDescriptionWrapper>
  );
}

const MenuDescriptionWrapper = styled.section<{ theme: Theme }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.sheetBackground};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3<{ theme: Theme }>`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p<{ theme: Theme }>`
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;
