/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Specify the path to your source files
  ],

  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
      fontFamily: {
        // sans: ["Roboto", "Arial", "sans"],
        // LoRes12OT: ["LoRes12OT-Regular", "sans"],
      },
    },
  },
  darkMode: "class", // Use 'class' to enable dark mode based on HTML class
  plugins: [],
};
