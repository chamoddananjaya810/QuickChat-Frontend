<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode:"class",
=======
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // මේ content array එක හරියටම මේ විදියට තියෙන්න ඕන
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
>>>>>>> 853a62c1ccf16ba9c270e8f28a69449a506fc02f
  theme: {
    extend: {},
  },
  plugins: [],
}