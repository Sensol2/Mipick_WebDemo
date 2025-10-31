"use client";

import styled from "styled-components";

export default function HeaderSection() {
  return (
    <>
      <HeaderWrapper>
        <Title>주문하기</Title>
        <Divider />
      </HeaderWrapper>
    </>
  );
}

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #868581;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: #3d3a37;
  margin: 0;
`;
