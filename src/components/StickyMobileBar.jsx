import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
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

  const usdValue = PAYMENT_CONFIG.inrToUsd(amount)

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-neutral-300 dark:border-neutral-800 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md px-4 py-3 transition-colors shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Amount in INR (1st Priority) + USD context */}
        <div className="flex flex-col">
          <span className="text-xs uppercase font-mono text-neutral-600 dark:text-neutral-400 font-semibold tracking-wider">
            Contribution
          </span>
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
              {amount ? `₹${amount}.00` : 'Any'}
            </span>
            {usdValue && (
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                (~${usdValue})
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-1 justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="h-11 w-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white flex items-center justify-center transition-colors shadow-2xs"
            title="Copy UPI ID (advaita@fam)"
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            )}
          </button>

          <a
            href={upiUri}
            onClick={handlePay}
            className="h-11 px-5 rounded-xl bg-[#0C0B0A] text-white hover:bg-black dark:bg-white dark:text-[#0C0B0A] dark:hover:bg-neutral-100 border border-[#B8860B] dark:border-[#C2956A] font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active-press shadow-md cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#C2956A] dark:text-[#B8860B]" />
            <span>Pay with Any UPI App</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
