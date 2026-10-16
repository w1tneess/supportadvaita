import React from 'react'
import { MessageCircle, Mail, Send } from 'lucide-react'
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
    <div className="pt-4 border-t border-black/[0.08] dark:border-neutral-800 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-semibold">
          // Acknowledgment (धन्यवाद)
        </span>
        <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
          sent transfer?
        </span>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-mono">
        UPI does not automatically open a chat link. Drop a quick note to confirm receipt:
      </p>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerCelebration}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1.5 transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>whatsapp</span>
        </a>

        <a
          href={`mailto:advaita974@gmail.com?subject=${mailSubject}&body=${mailBody}`}
          onClick={triggerCelebration}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1.5 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
          <span>email</span>
        </a>

        <a
          href="https://x.com/w1tneess_"
          target="_blank"
          rel="noopener noreferrer"
          onClick={triggerCelebration}
          className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>dm on x</span>
        </a>
      </div>
    </div>
  )
}
