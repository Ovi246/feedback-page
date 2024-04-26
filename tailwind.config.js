/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blueBG: "#FFFAFA",
        blueInput: "#38b6ff",
        blueText: "#000",
        myOrange: "#F48236",
      },
    },
    fontFamily: {
      rasputin: ["Rasputin", "sans-serif"],
      now: ["Now", "sans-serif"],
      sans: ['"Now"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
