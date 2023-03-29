/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'slate-800',
        bg: '#1e293b', // slate-800
        bgActive: '#314361',
        bgHover: '#445d87',
        text: '#ccc',
        textBright: '#ffffff',
      },
      screens: {
        home: '1100px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
