/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'colors' : {
        'primary' : '#05B23F',
        'form-bg' : '#89FFB1',
        'form-text' : '#089838',
        'yellow-custom' : '#FEFE04',
        'link' : '#099DDC',
        'accept-btn' : '#3CE800',
        'cancel-btn' : '#E80000',
        'slate-ea' : '#EAEAEA',
        'slate-c1' : '#C1C1C1'
      }
    },
  },
  plugins: [],
}