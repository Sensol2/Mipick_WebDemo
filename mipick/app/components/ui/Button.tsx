"use client"

import styled from "styled-components"

type Variant = "primary" | "secondary"

export const Button = styled.button<{ variant?: Variant }>`
  appearance: none;
  border: 0;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.button};
  padding: 12px 16px;
  font-weight: 600;
  transition: background .2s ease, transform .05s ease;

  ${({ theme, variant = "primary" }) =>
    variant === "primary"
      ? `background: ${theme.colors.primary}; color: #fff;`
      : `background: ${theme.colors.neutralGray}; color: ${theme.colors.textMain};`}

  &:hover {
    ${({ theme, variant = "primary" }) =>
      variant === "primary"
        ? `background: ${theme.colors.primaryHover};`
        : `filter: brightness(0.98);`}
  }
  &:active { transform: translateY(1px); }
`