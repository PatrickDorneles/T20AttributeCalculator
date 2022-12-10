
const bgHero = require("tailwind-heropatterns")({
  // as per tailwind docs you can pass variants
  variants: [],
  patterns: ["topography"],
  colors: {
    default: "#000",
  },

  // The foreground opacity
  opacity: {
    default: "0.4",
    "100": "1.0"
  }
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'display': ['Hammersmith One', 'sans-serif']
    },
    extend: {
    },
  },
  plugins: [bgHero],
};
