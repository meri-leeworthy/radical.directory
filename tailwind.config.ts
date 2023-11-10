import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}",'./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Viksjo", "WorkSans", "sans-serif"],
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
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config