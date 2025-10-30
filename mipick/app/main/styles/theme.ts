export const theme = {
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
    xs: '8px',   // 극소
    sm: '14px',   // 캡션/보조
    md: '18px',  // 기본 본문
    lg: '32px',   // 강조 본문, 버튼
    xl: '48px', // 섹션 제목
    xxl: '64px', // 메인 디스플레이 (Hero 타이틀)
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

export type Theme = typeof theme