"use client";

import { createGlobalStyle } from "styled-components";

export const LocalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'DM Sans', Arial, sans-serif;
  }

  h1, h2, h3 {
    margin: 0;
    font-family: 'DM Sans', Arial, sans-serif;
  }

  p {
    margin: 0;
    font-family: 'DM Sans', Arial, sans-serif;
  }
`;
