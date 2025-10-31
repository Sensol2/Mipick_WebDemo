"use client";

import React from "react";
import styled from "styled-components";
import HeaderSection from "./components/HeaderSection";
import CTA from "./components/CTA";
import ImageSection from "./components/ImageSection";
import MenuDescriptionSection from "./components/MenuDescriptionSection";
import PickupDescription from "./components/PickupDescription";

export default function IntroSection() {
  return (
    <>
      <HeaderSection />
      <Title>원 디그리 노스</Title>
      <ImageSection />
      <MenuDescriptionSection />
      <PickupDescription />

      <CTA />
    </>
  );
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: 600;
  color: #322f2c;
  margin-top: ${({ theme }) => theme.spacing.lg};
  line-height: 1.1;
`;
