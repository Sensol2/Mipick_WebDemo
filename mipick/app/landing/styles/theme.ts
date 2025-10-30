export const theme = {
  colors: {
    primary: "#FF6B35",
    primaryHover: "#E85B2D",
    textMain: "#222222",
    textSecondary: "#555555",
    neutralGray: "#EEEEEE",
    cardBg: "#FFFFFF",
    inputBorder: "#CCCCCC"
  },
  layout: {
    maxWidth: "900px",
    sectionPadY: "48px"
  },
  radius: {
    button: "8px",
    card: "12px",
    input: "8px"
  },
  shadow: {
    card: "0 8px 24px rgba(0,0,0,0.06)"
  }
}

export type Theme = typeof theme