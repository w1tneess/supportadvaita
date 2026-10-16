import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Copy, Check, Smartphone, ArrowRight, Share2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function UpiActions({ upiUri, upiId, onCopyUpi, amount, note }) {
  const [copied, setCopied] = useState(false)
  const [selectedApp, setSelectedApp] = useState('all')

  const triggerFeedback = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(40) } catch {}
    }
  }

  const handleCopy = () => {
    triggerFeedback()
    onCopyUpi(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handlePayClick = (appId) => {
    triggerFeedback()
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C2956A', '#F8F6F0', '#DFC3A5'],
      })
    } catch {}
  }

  const handleShare = async () => {
    triggerFeedback()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Support Advaita Chandra — support.advaitachandra.in',
          text: `Direct, zero-fee patron support for Advaita Chandra's independent research, software, and writing.`,
          url: 'https://support.advaitachandra.in',
        })
      } catch (err) {}
    } else {
      navigator.clipboard.writeText('https://support.advaitachandra.in')
      onCopyUpi('https://support.advaitachandra.in')
    }
  }

  return (
    <div className="space-y-3.5">
      {/* Primary Mobile Action: Master UPI Intent Launcher */}
      <a
        href={PAYMENT_CONFIG.buildAppUpiUri(selectedApp, amount, note)}
        onClick={() => handlePayClick(selectedApp)}
        className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#A67508] to-[#8C6207] dark:from-[#C2956A] dark:via-[#B88758] dark:to-[#A87647] hover:opacity-95 text-white dark:text-[#0F0E0D] font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#C2956A]/15 transition-all transform active:scale-[0.98] cursor-pointer"
      >
        <Smartphone className="w-5 h-5" />
        <span>Pay {amount ? `₹${amount}` : ''} with UPI</span>
        <ArrowRight className="w-4 h-4 ml-0.5" />
      </a>

      {/* App Choice Selector for Mobile */}
      <div className="space-y-1.5">
        <span className="text-[11px] text-[#86868B] dark:text-[#736F68] block text-center font-medium">
          Or launch your installed UPI app directly:
        </span>
        <div className="grid grid-cols-4 gap-2">
          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('gpay', amount, note)}
            onClick={() => handlePayClick('gpay')}
            className="py-2.5 px-2 rounded-xl bg-white dark:bg-[#181714] hover:bg-black/[0.04] dark:hover:bg-[#22201C] border border-black/[0.08] dark:border-[#2D2A24] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-colors shadow-sm"
          >
            <span className="text-[#B8860B] dark:text-[#C2956A] font-bold text-[12px]">GPay</span>
            <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">Google</span>
          </a>

          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('phonepe', amount, note)}
            onClick={() => handlePayClick('phonepe')}
            className="py-2.5 px-2 rounded-xl bg-white dark:bg-[#181714] hover:bg-black/[0.04] dark:hover:bg-[#22201C] border border-black/[0.08] dark:border-[#2D2A24] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-colors shadow-sm"
          >
            <span className="text-[#5f259f] dark:text-[#9d6bd4] font-bold text-[12px]">PhonePe</span>
            <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">UPI</span>
          </a>

          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('paytm', amount, note)}
            onClick={() => handlePayClick('paytm')}
            className="py-2.5 px-2 rounded-xl bg-white dark:bg-[#181714] hover:bg-black/[0.04] dark:hover:bg-[#22201C] border border-black/[0.08] dark:border-[#2D2A24] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-colors shadow-sm"
          >
            <span className="text-[#00baf2] font-bold text-[12px]">Paytm</span>
            <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">UPI</span>
          </a>

          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('bhim', amount, note)}
            onClick={() => handlePayClick('bhim')}
            className="py-2.5 px-2 rounded-xl bg-white dark:bg-[#181714] hover:bg-black/[0.04] dark:hover:bg-[#22201C] border border-black/[0.08] dark:border-[#2D2A24] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-colors shadow-sm"
          >
            <span className="text-[#008c44] dark:text-[#00b359] font-bold text-[12px]">BHIM</span>
            <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">Govt</span>
          </a>
        </div>
      </div>

      {/* Secondary Actions: Copy UPI ID & Share Page */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 py-3 px-3.5 rounded-xl bg-white dark:bg-[#151412] hover:bg-black/[0.04] dark:hover:bg-[#1E1D19] border border-black/[0.08] dark:border-[#262421] text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-mono-code font-bold">Copied: {upiId}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
              <span>Copy UPI ID: <strong className="font-mono-code text-[#B8860B] dark:text-[#C2956A]">{upiId}</strong></span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="p-3 rounded-xl bg-white dark:bg-[#151412] hover:bg-black/[0.04] dark:hover:bg-[#1E1D19] border border-black/[0.08] dark:border-[#262421] text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-colors cursor-pointer shadow-sm"
          title="Share this payment page"
          aria-label="Share page"
        >
          <Share2 className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
        </button>
      </div>
    </div>
  )
}
