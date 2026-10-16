import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('paytoadvaita_theme') || 'system'
    }
    return 'system'
  })

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('paytoadvaita_theme')
      if (saved === 'dark') return 'dark'
      if (saved === 'light') return 'light'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (currentTheme) => {
      let isDark = false
      if (currentTheme === 'dark') {
        isDark = true
      } else if (currentTheme === 'light') {
        isDark = false
      } else {
        isDark = mediaQuery.matches
      }

      if (isDark) {
        root.classList.add('dark')
        root.style.colorScheme = 'dark'
      } else {
        root.classList.remove('dark')
        root.style.colorScheme = 'light'
      }
      setResolvedTheme(isDark ? 'dark' : 'light')
    }

    applyTheme(theme)

    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('paytoadvaita_theme', newTheme)
  }

  return { theme, resolvedTheme, setTheme: changeTheme }
}
