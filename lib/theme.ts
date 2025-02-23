export const theme = {
  colors: {
    primary: "#000000",
    secondary: "#666666",
    background: "#FFFFFF",
    success: "#00A67E",
    error: "#FF4D4D",
    border: "#E0E0E0",
  },
  typography: {
    fontFamilySans: "var(--font-geist-sans)",
    fontFamilyMono: "var(--font-geist-mono)",
    sizes: {
      small: "0.875rem",
      base: "1rem",
      large: "1.25rem",
      xlarge: "1.5rem",
      xxlarge: "2rem",
      huge: "3rem",
    },
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1024px",
  },
  transitions: {
    fast: "150ms ease",
    default: "300ms ease",
    slow: "500ms ease",
  },
};

export type Theme = typeof theme;
