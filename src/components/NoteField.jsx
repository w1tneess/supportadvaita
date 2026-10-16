import React from 'react'
import { User, MessageSquare } from 'lucide-react'

export default function NoteField({ name, setName, note, setNote }) {
  return (
    <div className="space-y-3">
      {/* Monospace Step Header */}
      <div className="flex items-center justify-between pb-2 border-b border-black/[0.08] dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#B8860B] dark:text-[#C2956A]">02</span>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-semibold">
            Remarks & Note
          </span>
          <span className="text-neutral-400 dark:text-neutral-600 font-mono text-xs">/ Optional</span>
        </div>
        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
          Sandesh (संदेश)
        </span>
      </div>

      {/* Pro-Dev Form Inputs Grid (Zero Nested Boxes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Name Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block">
            your name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="e.g. Rahul, Anonymous"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="w-full pl-8 pr-3 py-2 bg-transparent border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white rounded-lg text-xs font-mono text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Note Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block">
            transaction remarks
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="e.g. Chai pe charcha, keep building!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={45}
              className="w-full pl-8 pr-3 py-2 bg-transparent border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white rounded-lg text-xs font-mono text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
      <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
        // remarks are injected into canonical NPCI UPI parameters (<code className="text-[#B8860B] dark:text-[#C2956A]">tn=...</code>)
      </p>
    </div>
  )
}
