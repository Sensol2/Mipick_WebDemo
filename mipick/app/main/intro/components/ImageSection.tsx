"use client";

import styled from "styled-components";
import type { Theme } from "../../styles/theme";

export default function ImageSection() {
  return (
    <ImageWrapper>
      <Image src="/menuImages/menu7.jpg" alt="Intro Image" />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  min-height: 200px;
  margin-top: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.card};
  overflow: hidden;

  /* 화면비 유지: 스크린샷과 비슷한 5:3 비율 */
  aspect-ratio: 5 / 3;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

