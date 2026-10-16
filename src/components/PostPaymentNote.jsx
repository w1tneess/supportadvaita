import React from 'react'
import { MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react'

export default function PostPaymentNote({ amount, name, note }) {
  const shareText = encodeURIComponent(
    `Hey Advaita, I just sent ₹${amount || 150} via support.advaitachandra.in to support your work!${
      note ? ` Note: "${note}"` : ''
    }${name ? ` - from ${name}` : ''}`
  )

  const mailSubject = encodeURIComponent(`Supported your work via support.advaitachandra.in (₹${amount || 150})`)
  const mailBody = shareText

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#141311] border border-black/[0.08] dark:border-white/[0.08] space-y-2.5 shadow-sm transition-colors">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
        <span className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F8F6F0]">
          Sent your contribution? Drop a quick note:
        </span>
      </div>

      <p className="text-[11px] text-[#6E6E73] dark:text-[#736F68] leading-relaxed">
        UPI transfers don't always include a chat. Let Advaita know so he can personally acknowledge you:
      </p>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-xl bg-black/[0.03] dark:bg-[#181714] hover:bg-black/[0.06] dark:hover:bg-[#22201C] border border-black/[0.08] dark:border-[#262421] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>WhatsApp Note</span>
        </a>

        <a
          href={`mailto:advaita974@gmail.com?subject=${mailSubject}&body=${mailBody}`}
          className="px-3.5 py-1.5 rounded-xl bg-black/[0.03] dark:bg-[#181714] hover:bg-black/[0.06] dark:hover:bg-[#22201C] border border-black/[0.08] dark:border-[#262421] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Mail className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
          <span>Email Advaita</span>
        </a>

        <a
          href="https://x.com/w1tneess_"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-xl bg-black/[0.03] dark:bg-[#181714] hover:bg-black/[0.06] dark:hover:bg-[#22201C] border border-black/[0.08] dark:border-[#262421] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>DM on X</span>
        </a>
      </div>
    </div>
  )
}
