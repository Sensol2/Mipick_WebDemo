import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      sheetBackground: string;
      pageBackground: string;
      surface: string;
      text: string;
      textSecondary: string;
      error: string;
      success: string;
      cta: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeights: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadow: {
      card: string;
    };
  }
}
