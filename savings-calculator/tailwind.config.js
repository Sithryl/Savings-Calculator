/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'light-blue': '#3aafa9',
      'darker-blue': '#2b7a78',
      'amber': '#fcb900',
      'black': '#17252a',
    },
    extend: {
    },
  },
  plugins: [require("daisyui")],
};
