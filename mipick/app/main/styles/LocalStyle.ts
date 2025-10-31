"use client";

import { createGlobalStyle } from "styled-components";

export const LocalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

  /* Daehan font faces */
  @font-face {
    font-family: 'Daehan';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Daehan-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

@font-face {
    font-family: 'Samyukdae';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/TTSahmyookUniversityL.woff2') format('woff2');
    font-weight: 300;
    font-display: swap;
}

  @font-face {
      font-family: 'Minguk';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Minguk-Regular.woff') format('woff');
      font-weight: normal;
      font-display: swap;
  }

  @font-face {
      font-family: 'Minguk';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Minguk-Bold.woff') format('woff');
      font-weight: 700;
      font-display: swap;
  }
      
  body {
    margin: 0;
    padding: 0;
    font-family: 'Daehan', 'DM Sans', Arial, sans-serif;
  }

  h1, h2 {
    margin: 0;
    font-family: 'Minguk', 'DM Sans', Arial, sans-serif;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-family: 'Daehan', 'DM Sans', Arial, sans-serif;
  }
`;
