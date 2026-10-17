import { useState, useEffect } from 'react'

const STORAGE_KEY = 'supportadvaita_theme'
const THEMES = ['system', 'light', 'dark']

// Storage can throw (Safari private mode, blocked cookies, sandboxed webviews)
const readStored = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return THEMES.includes(saved) ? saved : 'system'
  } catch {
    return 'system'
  }
}

const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export function useTheme() {
  const [theme, setTheme] = useState(readStored)
  const [resolvedTheme, setResolvedTheme] = useState(() => {
    const t = readStored()
    return t === 'system' ? (systemDark() ? 'dark' : 'light') : t
  })

  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches)
      root.classList.toggle('dark', isDark)
      root.style.colorScheme = isDark ? 'dark' : 'light'
      setResolvedTheme(isDark ? 'dark' : 'light')
    }

    applyTheme()
    if (theme !== 'system') return undefined
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [theme])

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    try {
      localStorage.setItem(STORAGE_KEY, newTheme)
    } catch {
      // preference just won't persist
    }
  }

  return { theme, resolvedTheme, setTheme: changeTheme }
}
