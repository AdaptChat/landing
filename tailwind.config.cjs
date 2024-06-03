const defaultTheme = require('tailwindcss/defaultTheme')

const primary = {
  '50': '#edfaff',
  '100': '#d7f1ff',
  '200': '#b9e8ff',
  '300': '#88dcff',
  '400': '#50c7ff',
  '500': '#28a9ff',
  '600': '#0586ff',
  '700': '#0a73eb',
  '800': '#0f5cbe',
  '900': '#134f95',
  '950': '#11315a',
}
primary.DEFAULT = primary['600']

const secondary = {
  '50': '#fcf5ff',
  '100': '#f7e7ff',
  '200': '#f0d3ff',
  '300': '#e4b0ff',
  '400': '#d47eff',
  '500': '#be3dff',
  '600': '#b22af3',
  '700': '#9c1ad6',
  '800': '#831aaf',
  '900': '#6b178c',
  '950': '#4c0269',
}
secondary.DEFAULT = secondary['600']

const accent = '#4f46e5'

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-in',
      },
      colors: {
        primary,
        secondary,
        accent,
        base: {
          content: '#ffffff',
        },
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
    require('daisyui'),
  ],
}

config.daisyui = {
  themes: [{
    ddar: {
      primary: primary.DEFAULT,
      'primary-content': '#ffffff',
      secondary: secondary.DEFAULT,
      accent,
      neutral: '#4c4c5b',
      error: '#ee3434',
      base: {
        content: '#ffffff',
      },
      '.btn': {
        'text-transform': 'initial',
      },
    },
  }],
}

module.exports = config
