/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient-shift': 'gradientShift 15s ease-in-out infinite alternate',
      },
      keyframes: {
        gradientShift: {
          '0%': {
            opacity: '0.5',
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            opacity: '0.7',
            transform: 'translateY(-10px) scale(1.05)',
          },
          '100%': {
            opacity: '0.5',
            transform: 'translateY(0) scale(1)',
          },
        },
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        garamond: ['Cormorant Garamond', 'serif']
      },
      colors: {
        sand: "#EFD7AB",
        deepteal: "#123E3D",
        deepblue: "#050912"
      }
    },
  },
  plugins: [],
}