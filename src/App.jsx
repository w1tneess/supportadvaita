import React, { useState } from 'react'
import { useTheme } from './hooks/useTheme.js'
import SupportPage from './components/SupportPage.jsx'
import Toast from './components/Toast.jsx'

/**
 * Root Application Container
 * Renders the high-craft, editorial SupportPage with theme management.
 */
export default function App() {
  const { resolvedTheme, setTheme } = useTheme()
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = (msg) => {
    setToastMessage(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2400)
  }

  return (
    <div className="min-h-dvh bg-[#FBFBFA] dark:bg-[#0B0D0E] text-[#111827] dark:text-[#F3F4F6] transition-colors duration-200">
      <Toast message={toastMessage} visible={toastVisible} />
      <SupportPage
        theme={resolvedTheme}
        setTheme={setTheme}
      />
    </div>
  )
}
