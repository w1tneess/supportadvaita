import React from 'react'
import { MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react'

export default function PostPaymentNote({ amount, name, note }) {
  const shareText = encodeURIComponent(
    `Hey Advaita, I just sent ₹${amount || 150} via paytoadvaita to support your projects!${
      note ? ` Note: "${note}"` : ''
    }${name ? ` - from ${name}` : ''}`
  )

  const mailSubject = encodeURIComponent(`Supported your work via paytoadvaita (₹${amount || 150})`)
  const mailBody = shareText

  return (
    <div className="p-4 rounded-xl bg-[#141311] border border-[#262421] space-y-2.5">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#C2956A]" />
        <span className="text-xs font-semibold text-[#F8F6F0]">
          Sent your contribution? Drop a quick note:
        </span>
      </div>

      <p className="text-[11px] text-[#736F68] leading-relaxed">
        UPI transfers don't always include a chat. Let Advaita know so he can personally acknowledge you:
      </p>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#181714] hover:bg-[#22201C] border border-[#262421] hover:border-[#38342D] text-xs font-mono-code text-[#A5A096] hover:text-[#F8F6F0] flex items-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>WhatsApp Note</span>
        </a>

        <a
          href={`mailto:advaita974@gmail.com?subject=${mailSubject}&body=${mailBody}`}
          className="px-3 py-1.5 rounded-lg bg-[#181714] hover:bg-[#22201C] border border-[#262421] hover:border-[#38342D] text-xs font-mono-code text-[#A5A096] hover:text-[#F8F6F0] flex items-center gap-1.5 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-[#C2956A]" />
          <span>Email Advaita</span>
        </a>

        <a
          href="https://x.com/w1tneess_"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-[#181714] hover:bg-[#22201C] border border-[#262421] hover:border-[#38342D] text-xs font-mono-code text-[#A5A096] hover:text-[#F8F6F0] flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-sky-400" />
          <span>DM on X</span>
        </a>
      </div>
    </div>
  )
}
