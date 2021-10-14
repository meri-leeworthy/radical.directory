module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Viksjo"],
      sans: ["WorkSans", "sans-serif"],
    },
    extend: {
      screens: {
        landy: {
          raw: "screen and (min-device-width : 1280px) and (orientation: landscape)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
