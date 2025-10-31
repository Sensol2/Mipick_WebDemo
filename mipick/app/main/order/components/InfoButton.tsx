import styled from "styled-components";
import { Theme } from "../../styles/theme";

export default function InfoButton() {
  return (
    <>
      <InfoWrapper>
        <Button>미픽의 엄격한 맛집 선정 기준이 궁금하다면</Button>
      </InfoWrapper>
    </>
  );
}

export const Button = styled.button<{ theme: Theme }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.cta};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.sm};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  text-align: center;
  opacity: 0.8;
`;

export const InfoWrapper = styled.div<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing.md};
`;
