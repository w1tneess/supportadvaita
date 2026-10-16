import React from 'react'
import { Sun, Moon, Laptop } from 'lucide-react'

export default function ThemeToggle({ theme, setTheme }) {
  const options = [
    { id: 'system', label: 'Auto', icon: Laptop },
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
  ]

  return (
    <div className="inline-flex items-center p-1 rounded-full bg-[#EAEAEE] dark:bg-[#1C1A17] border border-black/5 dark:border-white/10 transition-colors shadow-sm">
      {options.map((opt) => {
        const IconComp = opt.icon
        const isActive = theme === opt.id

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTheme(opt.id)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              isActive
                ? 'bg-white dark:bg-[#2A2722] text-[#1D1D1F] dark:text-[#F8F6F0] shadow-sm font-semibold'
                : 'text-[#86868B] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0]'
            }`}
            title={`Switch to ${opt.label} theme`}
            aria-label={`Switch to ${opt.label} theme`}
          >
            <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#C2956A]' : ''}`} />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}
