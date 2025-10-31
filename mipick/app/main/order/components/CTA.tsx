import styled from "styled-components";
import { Theme } from "../../styles/theme";

export default function CTA() {
  return (
    <>
      <CTAWrapper>
        <CTAButton>주문하기</CTAButton>
      </CTAWrapper>
    </>
  );
}

export const CTASpacer = styled.div<{ theme: Theme }>`
  flex-shrink: 0; /* 높이 줄어드는 것 방지 */
  height: calc(${({ theme }) => theme.spacing.md} * 2 + 1.5rem);
  /* CTAButton의 padding(md) 상하 + font-size(md) 기준으로 계산된 높이 */
  width: 100%;
`;

export const CTAButton = styled.button<{ theme: Theme }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.cta};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.lg};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98); /* 눌렀을 때 살짝 눌리는 효과 */
  }
`;

export const CTAWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  position: fixed;

  bottom: 10px; /* 하단에서 10px 위 */

  /* 가운데 정렬 */
  left: 50%;
  transform: translateX(-50%);

  /* Sheet 최대 폭에 맞추기 */
  width: 100%;
  max-width: 460px;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;

  z-index: 1000; /* 다른 요소들 위에 표시 */
`;
