"use client"

import styled from "styled-components"

export const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.input};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
  }
`