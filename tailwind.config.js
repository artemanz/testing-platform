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
        base: "#fff",
        foreground: "#292929",
        accent: "#fd204c",
        primary: "#448ac0",
        "primary-light": "#f1f4f8",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#448ac0",
          accent: "#fd204c",
        },
      },
    ],
  },
};
