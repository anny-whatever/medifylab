/** @type {import('tailwindcss').Config} */

import preline from "preline/plugin";

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        displaylight: "neueLight",
        displaymedium: "neueMedium",
        displaybold: "neueBold", // Adds a new `font-display` class
      },
      colors: {
        primary: "#59A52C", // forestgreen theme primary color
        secondary: "#6FCA3A", // forestgreen theme secondary color
        accent: "#E6E6E6", // forestgreen theme accent color
        background: "#FFFFFF", // forestgreen theme background color
        textColor: "#1E2022", // forestgreen theme foreground color
      },
    },
  },
  darkMode: "class",
  plugins: [
    preline,

    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        forestgreen: {
          layout: {}, // forestgreen theme layout tokens
          // forestgreen theme colors
          colors: {},
        },
        // ... custom themes
      },
    }),
  ],
};

// #59A52C - PRIMARY
// #6FCA3A - SECONDARY
// #E6E6E6 - ACCENT
// #FFFFFF - BACKGROUND
// #1E2022 - TEXT
