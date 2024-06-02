const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-in',
      },
      colors: {
        accent: '#0586ff',
        secondary: '#be3dff',
        gray: {
          950: '#0a0e16',
        },
      },
      screens: {
        'mobile-xs': { max: '369px' },
        'mobile': { max: '767px' },
      },
    },
    fontFamily: {
      title: ['"Plus Jakarta Sans"', "Geist", ...defaultTheme.fontFamily.sans],
      sans: ["Geist", ...defaultTheme.fontFamily.sans],
      mono: [
        '"Geist Mono"', 'Menlo', 'Monaco', 'Lucida Console', 'Liberation Mono',
        'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', 'monospace',
      ],
    },
    keyframes: {
      'fade-in': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
