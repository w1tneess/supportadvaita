import React from 'react'
import { MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function PostPaymentNote({ amount, name, note }) {
  const shareText = encodeURIComponent(
    `Namaste Advaita, I just sent ₹${amount || 101} via support.advaitachandra.in to support your work!${
      note ? ` Note: "${note}"` : ''
    }${name ? ` - from ${name}` : ''}`
  )

  const mailSubject = encodeURIComponent(`Supported your work via support.advaitachandra.in (₹${amount || 101})`)
  const mailBody = shareText

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#B8860B', '#C2956A', '#F8F6F0'],
      })
    } catch {}
  }

  return (
    <div className="p-1.5 rounded-[22px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
      <div className="p-4 sm:p-5 rounded-[calc(22px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] space-y-3 transition-colors">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
          <span className="text-xs font-bold text-[#1D1D1F] dark:text-[#F8F6F0]">
            Dhanyawaad (धन्यवाद) • Sent your Sahyog? Drop a quick note:
          </span>
        </div>

        <p className="text-[11px] text-[#6E6E73] dark:text-[#8E8A83] leading-relaxed">
          Peer-to-peer UPI transfers do not always include an instant chat link. Let Advaita know so he can personally acknowledge your support:
        </p>

        <div className="flex items-center gap-2 pt-1 flex-wrap">
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={triggerCelebration}
            className="px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1.5 transition-all shadow-sm active-press hover:-translate-y-0.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp Note</span>
          </a>

          <a
            href={`mailto:advaita974@gmail.com?subject=${mailSubject}&body=${mailBody}`}
            onClick={triggerCelebration}
            className="px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1.5 transition-all shadow-sm active-press hover:-translate-y-0.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
            <span>Email Advaita</span>
          </a>

          <a
            href="https://x.com/w1tneess_"
            target="_blank"
            rel="noopener noreferrer"
            onClick={triggerCelebration}
            className="px-3.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1.5 transition-all shadow-sm active-press hover:-translate-y-0.5"
          >
            <Send className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>DM on X</span>
          </a>
        </div>
      </div>
    </div>
  )
}
