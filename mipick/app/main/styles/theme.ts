import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#2E4057',      // 딥 네이비 (포인트)
    secondary: '#B89F8A',    // 웜 모카 (보조)
    background: '#ebeae4',   // 배경
    surface: '#FFFFFF',      // 카드/섹션 배경
    text: '#2C2C2C',         // 본문 텍스트
    textSecondary: '#555555',// 서브 텍스트
    error: '#B00020',
    success: '#4CAF50',
    cta: '#000000',          // CTA 버튼 전용 컬러
  },
  fontSizes: {
    small: '12px',
    medium: '14px',
    large: '16px',
    heading: '24px',
    display: '32px',         // 큰 타이틀 (예: 원 디그리 노스)
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadow: {
    card: '0 2px 8px rgba(0,0,0,0.05)',
  },
};

export default theme;
