import React from 'react'
import { User, MessageSquare } from 'lucide-react'

export default function NoteField({ name, setName, note, setNote }) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] dark:text-[#8E8A83] block">
        2. Personal Note & Name <span className="text-[#86868B] dark:text-[#5A564F] font-normal normal-case">(optional)</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Supporter Name */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B] dark:text-[#5A564F]">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Your name or handle"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            className="w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-[#151412] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 focus:border-[#C2956A] rounded-xl text-sm text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none transition-colors shadow-sm"
          />
        </div>

        {/* Note / Message */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B] dark:text-[#5A564F]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Note or book recommendation"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={40}
            className="w-full pl-10 pr-3.5 py-2.5 bg-white dark:bg-[#151412] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 focus:border-[#C2956A] rounded-xl text-sm text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none transition-colors shadow-sm"
          />
        </div>
      </div>
      <p className="text-[11px] text-[#86868B] dark:text-[#736F68]">
        Pre-fills your UPI transaction note so Advaita knows who this contribution is from.
      </p>
    </div>
  )
}
