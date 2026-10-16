import React from 'react'
import { Check } from 'lucide-react'

export default function Toast({ message, visible }) {
  if (!visible) return null

  return (
    <div className="fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#1A1916] border border-black/[0.08] dark:border-[#C2956A] text-xs font-mono-code text-[#1D1D1F] dark:text-[#F8F6F0] shadow-xl shadow-black/10 dark:shadow-black/80">
        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>{message}</span>
      </div>
    </div>
  )
}
