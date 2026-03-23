export type Theme = 'light' | 'dark' | 'blue' | 'red' | 'yellow' | 'green'

export const THEME_CONFIG = {
  light: {
    name: 'Light',
    bg: '#ffffff',
    text: '#000000',
    accent: '#0037FF',
    secondary: 'bg-gray-100',
  },
  dark: {
    name: 'Dark',
    bg: '#0a0a0a',
    text: '#ffffff',
    accent: '#0037FF',
    secondary: 'bg-gray-900',
  },
  blue: {
    name: 'SEVCO Blue',
    bg: '#001a80',
    text: '#ffffff',
    accent: '#0037FF',
    secondary: 'bg-blue-900',
  },
  red: {
    name: 'SEVCO Red',
    bg: '#330000',
    text: '#ffffff',
    accent: '#BD0000',
    secondary: 'bg-red-900',
  },
  yellow: {
    name: 'SEVCO Yellow',
    bg: '#2d2700',
    text: '#ffffff',
    accent: '#FCC318',
    secondary: 'bg-yellow-900',
  },
  green: {
    name: 'SEVCO Green',
    bg: '#001a00',
    text: '#ffffff',
    accent: '#00A611',
    secondary: 'bg-green-900',
  },
}

export const SEVCO_COLORS = {
  blue: '#0037FF',
  red: '#BD0000',
  yellow: '#FCC318',
  green: '#00A611',
}

export const getTheme = (theme: Theme) => THEME_CONFIG[theme]
