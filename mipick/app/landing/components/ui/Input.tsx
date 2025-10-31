"use client";

import styled from "styled-components";

/**
 * Landing Page 전용 Input 컴포넌트
 * todayMenu 등 다른 기능 페이지에서는 해당 페이지의 styled-components 사용
 */

export const Input = styled.input`
  flex: 1;
  padding: 14px 20px;
  border-radius: 25px;
  border: 2px solid #e5e5e5;
  font-size: 16px;
  outline: none;
  background: white;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #2b3a52;
    box-shadow: 0 0 0 3px rgba(43, 58, 82, 0.1);
  }
`;
