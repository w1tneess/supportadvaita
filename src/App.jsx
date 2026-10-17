import React from 'react'
import { useTheme } from './hooks/useTheme.js'
import SupportPage from './components/SupportPage.jsx'

export default function App() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="min-h-dvh bg-[#FBFBFA] dark:bg-[#0B0D0E] text-[#111827] dark:text-[#F3F4F6] transition-colors duration-200">
      <SupportPage theme={resolvedTheme} setTheme={setTheme} />
    </div>
  )
}
