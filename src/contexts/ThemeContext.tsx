import React, { createContext, useContext, useState, useEffect } from 'react'
import { themes, defaultTheme, ThemeConfig } from '../config/theme'

type ThemeContextType = {
  currentTheme: string
  isDarkMode: boolean
  theme: ThemeConfig
  setCurrentTheme: (theme: string) => void
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || defaultTheme
  })

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const theme = themes[currentTheme]

  const value = {
    currentTheme,
    isDarkMode,
    theme,
    setCurrentTheme,
    toggleDarkMode,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 