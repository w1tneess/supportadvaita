import React from 'react'
import { MessageCircle, Mail, Send } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function PostPaymentNote({ amount, name, note }) {
  const shareText = encodeURIComponent(
    `Hi Advaita, I just sent ₹${amount || 150} via support.advaitachandra.in to support your open-source work!${
      note ? ` Note: "${note}"` : ''
    }${name ? ` - from ${name}` : ''}`
  )

  const mailSubject = encodeURIComponent(`Supported your work via support.advaitachandra.in (₹${amount || 150})`)
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
    <div className="pt-6 border-t border-black/[0.08] dark:border-neutral-800 space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-bold">
          // Payment Confirmation
        </span>
        <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-medium">
          sent transfer?
        </span>
      </div>

      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
        UPI transfers do not automatically pass back a link. Drop a quick message to confirm receipt:
      </p>

      <div className="flex items-center gap-2.5 pt-1 flex-wrap">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerCelebration}
          className="px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs sm:text-sm font-mono font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white flex items-center gap-2 transition-colors shadow-2xs"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>whatsapp</span>
        </a>

        <a
          href={`mailto:advaita974@gmail.com?subject=${mailSubject}&body=${mailBody}`}
          onClick={triggerCelebration}
          className="px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs sm:text-sm font-mono font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white flex items-center gap-2 transition-colors shadow-2xs"
        >
          <Mail className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
          <span>email</span>
        </a>

        <a
          href="https://x.com/w1tneess_"
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerCelebration}
          className="px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs sm:text-sm font-mono font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white flex items-center gap-2 transition-colors shadow-2xs"
        >
          <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>dm on x</span>
        </a>
      </div>
    </div>
  )
}
