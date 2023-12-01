/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "src/app/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        base: "#37363b",
        foreground: "#fff",
        accent: "#8ac832",
      },
      fontFamily: {
        secondary: "Oswald Variable, sans-serif",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        theme: {
          primary: "#a991f7",
          secondary: "#f6d860",
          neutral: "#3d4451",
          "base-100": "#37363b",
          accent: "#8ac832",
        },
      },
    ],
  },
};
