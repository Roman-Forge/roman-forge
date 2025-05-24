/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
        sand: "#EFD7AB",
        deepteal: "#123E3D",
        deepblue: "#050912",
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
