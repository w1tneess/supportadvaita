import React, { useState } from 'react'
import { Smartphone, Copy, Check, ArrowRight } from 'lucide-react'

export default function StickyMobileBar({ upiUri, amount, onCopyUpi, upiId }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(40) } catch {}
    }
    onCopyUpi(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handlePay = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(40) } catch {}
    }
  }

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md p-3 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Amount */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-mono text-neutral-400">Total Sahyog</span>
          <span className="font-mono text-base font-bold text-neutral-900 dark:text-neutral-100">
            {amount ? `₹${amount}.00` : 'Any'}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            title="Copy UPI ID"
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-neutral-400" />
            )}
          </button>

          <a
            href={upiUri}
            onClick={handlePay}
            className="py-2.5 px-4 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-mono text-xs font-bold flex items-center gap-2 transition-colors active-press cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Pay with UPI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
