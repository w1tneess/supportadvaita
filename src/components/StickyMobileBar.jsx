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
    <div className="lg:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 z-40">
      <div className="p-1 rounded-[22px] bg-black/10 dark:bg-white/10 ring-1 ring-black/10 dark:ring-white/15 backdrop-blur-2xl shadow-2xl">
        <div className="rounded-[calc(22px-0.25rem)] bg-white/95 dark:bg-[#151412]/95 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          {/* Amount Display */}
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-[#86868B] dark:text-[#8E8A83] font-mono-code font-bold">Contribution</span>
            <span className="text-base sm:text-lg font-bold font-mono-code text-[#1D1D1F] dark:text-[#F8F6F0]">
              {amount ? `₹${amount}` : 'Any'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              type="button"
              onClick={handleCopy}
              className="p-2.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F8F6F0] flex items-center justify-center transition-colors cursor-pointer shadow-sm active-press"
              title="Copy UPI ID"
              aria-label="Copy UPI ID"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
              )}
            </button>

            <a
              href={upiUri}
              onClick={handlePay}
              className="group flex-1 max-w-[210px] py-2.5 pl-4 pr-1.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#A87908] to-[#946806] dark:from-[#C2956A] dark:via-[#B88758] dark:to-[#A87647] text-white dark:text-[#0F0E0D] font-bold text-xs sm:text-sm flex items-center justify-between shadow-lg shadow-[#C2956A]/20 transition-all active-press"
            >
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4" />
                <span>Pay with UPI</span>
              </div>
              <span className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/15 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
