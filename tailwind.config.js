const { colors } = require('./src/config/tokens.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
      fontFamily: {
        pbold: ['Pretendard-Bold'],
        psemibold: ['Pretendard-SemiBold'],
        pmedium: ['Pretendard-Medium'],
        pregular: ['Pretendard-Regular'],
      },
    },
  },
  plugins: [],
};
