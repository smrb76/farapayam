import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'IRANSans',
          '"Inter"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      fontSize: {
        xxs: '10px',
      },
      colors: {
        primary: 'var(--colorPrimary)',
        secondary: 'var(--colorSecondary)',
        primaryWhiteBgColor: 'var(--primaryWhiteBgColor)',
        spaceGray: 'var(--spaceGray)',
        blackColor: 'var(--blackColor)',
        colorLight: 'var(--colorLight)',
      },
      screens: {
        desk: '1120px',
      },
    },
  },
  safelist: [],
  plugins: [],
} satisfies Config;
