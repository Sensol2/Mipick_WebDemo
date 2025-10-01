"use client"

import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root {
    --orange-50: #ffedd5;
    --orange-25: #fff7ed;
  }
  html { scroll-behavior: smooth; }
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, Pretendard, Noto Sans KR, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    color: ${({ theme }) => theme.colors.textMain};
    background: linear-gradient(to bottom, var(--orange-50), #ffffff, var(--orange-25));
  }
  h1,h2,h3 { margin: 0 0 12px; line-height: 1.2; }
  p { margin: 0 0 12px; color: ${({ theme }) => theme.colors.textSecondary}; }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; height: auto; display: block; }
`