import React from 'react'
import { User, MessageSquare } from 'lucide-react'

export default function NoteField({ name, setName, note, setNote }) {
  return (
    <div className="p-1.5 sm:p-2 rounded-[28px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
      <div className="p-5 sm:p-6 rounded-[calc(28px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-4 transition-colors">
        {/* Step Header */}
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
            <span className="text-xs font-mono-code font-bold uppercase tracking-[0.15em] text-[#B8860B] dark:text-[#C2956A]">
              Step 02 • Sender & Sandesh (संदेश)
            </span>
          </div>
          <span className="text-xs font-mono-code text-[#86868B] dark:text-[#736F68]">
            ऐच्छिक (Optional)
          </span>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Supporter Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F8F6F0] block">
              Your Name (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B] dark:text-[#736F68]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Rahul, Anonymous"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F8FA] dark:bg-[#181714] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#C2956A] focus:ring-2 focus:ring-[#C2956A]/20 rounded-xl text-sm text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Note / Message */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F8F6F0] block">
              Transaction Note (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#86868B] dark:text-[#736F68]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="e.g. Keep building great tools!"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={45}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F8F8FA] dark:bg-[#181714] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#C2956A] focus:ring-2 focus:ring-[#C2956A]/20 rounded-xl text-sm text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <p className="text-[11.5px] text-[#86868B] dark:text-[#736F68] pt-1">
          Appended directly into your UPI transaction remarks so Advaita can personally identify your contribution.
        </p>
      </div>
    </div>
  )
}
