import React from 'react'
import { Check, Sparkles } from 'lucide-react'

export default function Toast({ message, visible }) {
  if (!visible) return null

  return (
    <div className="fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1916] border border-[#C2956A] text-xs font-mono-code text-[#F8F6F0] shadow-2xl shadow-black/80">
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        <span>{message}</span>
      </div>
    </div>
  )
}
