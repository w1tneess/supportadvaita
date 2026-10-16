import React from 'react'
import { User, MessageSquare } from 'lucide-react'

export default function NoteField({ name, setName, note, setNote }) {
  return (
    <div className="space-y-3">
      {/* Microscopic Eyebrow with Indian Touch */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/10 border border-[#B8860B]/20 dark:border-[#C2956A]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
          <span className="text-[10px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#B8860B] dark:text-[#C2956A]">
            चरण ०२ • Sender & Sandesh (संदेश)
          </span>
        </div>
        <span className="text-[11px] font-mono-code text-[#86868B] dark:text-[#736F68]">
          ऐच्छिक (optional)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Supporter Name (Double-Bezel) */}
        <div className="p-1 rounded-[18px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
          <div className="relative rounded-[calc(18px-0.25rem)] bg-white dark:bg-[#151412] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B] dark:text-[#5A564F]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Your name / आपका नाम"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="w-full pl-10 pr-3.5 py-2.5 bg-transparent rounded-[calc(18px-0.25rem)] text-sm text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none focus:ring-2 focus:ring-[#C2956A]/30 transition-all"
            />
          </div>
        </div>

        {/* Note / Message (Double-Bezel) */}
        <div className="p-1 rounded-[18px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
          <div className="relative rounded-[calc(18px-0.25rem)] bg-white dark:bg-[#151412] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B] dark:text-[#5A564F]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="e.g. Chai pe charcha, keep building!"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={40}
              className="w-full pl-10 pr-3.5 py-2.5 bg-transparent rounded-[calc(18px-0.25rem)] text-sm text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none focus:ring-2 focus:ring-[#C2956A]/30 transition-all"
            />
          </div>
        </div>
      </div>
      <p className="text-[11px] text-[#86868B] dark:text-[#736F68]">
        Pre-fills your UPI transaction note so Advaita knows who this Sahyog is from.
      </p>
    </div>
  )
}
