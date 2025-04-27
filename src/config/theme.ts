export type ThemeColor = {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

export type ThemeConfig = {
  name: string
  colors: {
    primary: ThemeColor
    secondary: ThemeColor
    accent: ThemeColor
  }
  darkMode: {
    background: string
    text: string
    card: string
    border: string
  }
  lightMode: {
    background: string
    text: string
    card: string
    border: string
  }
}

export const themes: Record<string, ThemeConfig> = {
  indigo: {
    name: 'Indigo',
    colors: {
      primary: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      accent: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
      },
    },
    darkMode: {
      background: '#0f172a',
      text: '#f8fafc',
      card: '#1e293b',
      border: '#334155',
    },
    lightMode: {
      background: '#f8fafc',
      text: '#0f172a',
      card: '#ffffff',
      border: '#e2e8f0',
    },
  },
  purple: {
    name: 'Purple',
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      accent: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
      },
    },
    darkMode: {
      background: '#0f172a',
      text: '#f8fafc',
      card: '#1e293b',
      border: '#334155',
    },
    lightMode: {
      background: '#f8fafc',
      text: '#0f172a',
      card: '#ffffff',
      border: '#e2e8f0',
    },
  },
  emerald: {
    name: 'Emerald',
    colors: {
      primary: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      accent: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
    darkMode: {
      background: '#0f172a',
      text: '#f8fafc',
      card: '#1e293b',
      border: '#334155',
    },
    lightMode: {
      background: '#f8fafc',
      text: '#0f172a',
      card: '#ffffff',
      border: '#e2e8f0',
    },
  },
}

export const defaultTheme = 'indigo' 