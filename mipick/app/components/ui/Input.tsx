"use client"

import styled from "styled-components"

export const Input = styled.input`
  flex: 1;
  padding: 14px 20px;
  border-radius: 25px;
  border: 2px solid #E5E5E5;
  font-size: 16px;
  outline: none;
  background: white;
  
  &::placeholder {
    color: #9CA3AF;
  }
  
  &:focus {
    border-color: #2B3A52;
    box-shadow: 0 0 0 3px rgba(43, 58, 82, 0.1);
  }
`