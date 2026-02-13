/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': {
            textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073'
          },
          'to': {
            textShadow: '0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6'
          }
        }
      },
      colors: {
        white: "var(--color-white)",
        orange: "var(--color-orange)",
        border: "var(--color-border)",
        background: "var(--color-background)",
        "border-nav": "var(--color-border-nav)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Montserrat300: ["var(--font-montserrat-300)"],
        Montserrat400: ["var(--font-montserrat-400)"],
        Montserrat500: ["var(--font-montserrat-500)"],
        Montserrat600: ["var(--font-montserrat-600)"],
        Montserrat700: ["var(--font-montserrat-700)"],
        Montserrat800: ["var(--font-montserrat-800)"],
      },
    },
  },
  plugins: [],
};
