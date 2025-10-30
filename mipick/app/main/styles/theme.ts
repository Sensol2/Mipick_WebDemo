export const theme = {
  colors: {
    primary: '#2E4057',
    secondary: '#B89F8A',
    sheetBackground: '#ebeae4',
    pageBackground: '#c8c8c8',
    surface: '#FFFFFF',
    text: '#2C2C2C',
    textSecondary: '#555555',
    error: '#B00020',
    success: '#4CAF50',
    cta: '#000000',
  },
  fontSizes: {
    xs: '0.75rem',   // 12px 고정
    sm: '0.875rem',  // 14px 고정
    md: '1rem',      // 16px 고정 (본문)
    lg: 'clamp(1.25rem, 2vw, 1.75rem)', // 버튼/강조 (20~28px)
    xl: 'clamp(1.75rem, 4vw, 2.5rem)',  // 섹션 제목 (28~40px)
    xxl: 'clamp(2rem, 6vw, 2.5rem)',      // 메인 디스플레이 (32~64px)
  },
  fontWeights: {
    xs: 300,
    sm: 400,
    md: 500,
    lg: 600,
    xl: 700,
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: 'clamp(16px, 3vw, 24px)',
    xl: 'clamp(24px, 5vw, 32px)',
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

export type Theme = typeof theme;
