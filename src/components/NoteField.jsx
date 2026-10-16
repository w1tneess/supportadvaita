import React from 'react'
import { User, MessageSquare } from 'lucide-react'

export default function NoteField({ name, setName, note, setNote }) {
  return (
    <div className="space-y-3.5">
      {/* Monospace Step Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.08] dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">02</span>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-bold">
            Message & Details
          </span>
          <span className="text-neutral-600 dark:text-neutral-400 font-mono text-xs font-medium">/ Optional</span>
        </div>
      </div>

      {/* Pro-Dev Form Inputs Grid (Zero Nested Boxes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-semibold block">
            Your Name / Handle
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 dark:text-neutral-400">
              <User className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="e.g. Alex, Anonymous"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="w-full pl-8 pr-3 py-2.5 bg-white/70 dark:bg-[#121212]/70 border border-neutral-300 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-neutral-100 rounded-lg text-xs sm:text-sm font-mono text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Note Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-300 font-semibold block">
            Transaction Note / Remarks
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 dark:text-neutral-400">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="e.g. Keep up the great work on open-source tools"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={45}
              className="w-full pl-8 pr-3 py-2.5 bg-white/70 dark:bg-[#121212]/70 border border-neutral-300 dark:border-neutral-700 focus:border-neutral-900 dark:focus:border-neutral-100 rounded-lg text-xs sm:text-sm font-mono text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
      <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
        // Attached directly to transaction reference (<code className="text-neutral-900 dark:text-neutral-100 font-semibold">tn=...</code>)
      </p>
    </div>
  )
}
