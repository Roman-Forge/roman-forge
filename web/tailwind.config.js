/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {
      animation: {
        "gradient-shift": "gradientShift 15s ease-in-out infinite alternate",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        gradientShift: {
          "0%": {
            opacity: "0.5",
            transform: "translateY(0) scale(1)",
          },
          "50%": {
            opacity: "0.7",
            transform: "translateY(-10px) scale(1.05)",
          },
          "100%": {
            opacity: "0.5",
            transform: "translateY(0) scale(1)",
          },
        },
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        garamond: ["Cormorant Garamond", "serif"],
      },
      colors: {
        // Primary brand colors
        sand: "#EFD7AB",       // gold / primary accent
        deepteal: "#123E3D",   // teal green
        deepblue: "#050912",   // deep navy
        // Site backgrounds
        "site-bg": "#0B0D0C",
        "site-card": "#0F1211",
        "site-elevated": "#131716",
        // Text scale
        "site-text": "#E8E6E3",
        "site-muted": "#9A9895",
        "site-dim": "#5A5855",
        // Accent
        "site-accent": "#D4AF37",
      },
      blur: {
        "2xl": "64px",
      },
      width: {
        10: "2.5rem", // 40px
        12: "3rem", // 48px
      },
      height: {
        10: "2.5rem", // 40px
        12: "3rem", // 48px
      },
      minHeight: {
        "200px": "200px",
      },
      borderWidth: {
        0.5: "0.5px", // For thinner lines if needed
      },
      rotate: {
        20: "20deg",
      },
    },
  },
  plugins: [],
};
