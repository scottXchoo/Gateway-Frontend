/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    colors: {
      orange: {
        50: "#EB5B29",
      },
      gray: {
        50: "#4c4c4c",
        100: "#333333",
        150: "#1a1a1a",
        200: "#262626",
      },

      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {},
  },
  plugins: [],
};
