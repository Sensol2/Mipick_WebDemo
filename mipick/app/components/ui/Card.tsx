"use client"

import styled from "styled-components"

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
  border: 1px solid rgba(0,0,0,0.04);
  padding: 20px;
`