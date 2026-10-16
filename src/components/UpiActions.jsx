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
          title: 'Support Advaita Chandra — paytoadvaita',
          text: `Support Advaita Chandra's independent software and writing projects directly via UPI (0% fees).`,
          url: window.location.href,
        })
      } catch (err) {
        // User cancelled share or failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      onCopyUpi(window.location.href)
    }
  }

  return (
    <div className="space-y-3.5">
      {/* Primary Mobile Action: Master UPI Intent Launcher */}
      <a
        href={PAYMENT_CONFIG.buildAppUpiUri(selectedApp, amount, note)}
        onClick={() => handlePayClick(selectedApp)}
        className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#C2956A] via-[#B88758] to-[#A87647] hover:from-[#CCA076] hover:to-[#BD8D5F] text-[#0F0E0D] font-bold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#C2956A]/20 transition-all transform active:scale-[0.98] cursor-pointer"
      >
        <Smartphone className="w-5 h-5" />
        <span>Pay {amount ? `₹${amount}` : ''} with UPI</span>
        <ArrowRight className="w-4 h-4 ml-0.5" />
      </a>

      {/* App Choice Selector for Mobile */}
      <div className="space-y-1.5">
        <span className="text-[11px] text-[#736F68] block text-center font-medium">
          Choose your installed UPI app to launch directly:
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('gpay', amount, note)}
            onClick={() => handlePayClick('gpay')}
            className="py-2 px-2 rounded-lg bg-[#181714] hover:bg-[#22201C] border border-[#2D2A24] text-center text-xs font-medium text-[#F8F6F0] flex flex-col items-center gap-1 transition-colors"
          >
            <span className="text-[#C2956A] font-bold text-[11px]">GPay</span>
            <span className="text-[9px] text-[#736F68]">Google</span>
          </a>

          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('phonepe', amount, note)}
            onClick={() => handlePayClick('phonepe')}
            className="py-2 px-2 rounded-lg bg-[#181714] hover:bg-[#22201C] border border-[#2D2A24] text-center text-xs font-medium text-[#F8F6F0] flex flex-col items-center gap-1 transition-colors"
          >
            <span className="text-[#C2956A] font-bold text-[11px]">PhonePe</span>
            <span className="text-[9px] text-[#736F68]">UPI</span>
          </a>

          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('paytm', amount, note)}
            onClick={() => handlePayClick('paytm')}
            className="py-2 px-2 rounded-lg bg-[#181714] hover:bg-[#22201C] border border-[#2D2A24] text-center text-xs font-medium text-[#F8F6F0] flex flex-col items-center gap-1 transition-colors"
          >
            <span className="text-[#C2956A] font-bold text-[11px]">Paytm</span>
            <span className="text-[9px] text-[#736F68]">UPI</span>
          </a>

          <a
            href={PAYMENT_CONFIG.buildAppUpiUri('bhim', amount, note)}
            onClick={() => handlePayClick('bhim')}
            className="py-2 px-2 rounded-lg bg-[#181714] hover:bg-[#22201C] border border-[#2D2A24] text-center text-xs font-medium text-[#F8F6F0] flex flex-col items-center gap-1 transition-colors"
          >
            <span className="text-[#C2956A] font-bold text-[11px]">BHIM</span>
            <span className="text-[9px] text-[#736F68]">Govt</span>
          </a>
        </div>
      </div>

      {/* Secondary Actions: Copy UPI ID & Share Page */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#151412] hover:bg-[#1E1D19] border border-[#262421] hover:border-[#38342D] text-xs font-medium text-[#F8F6F0] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-mono-code font-semibold">Copied: {upiId}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#C2956A]" />
              <span>Copy UPI ID: <strong className="font-mono-code text-[#C2956A]">{upiId}</strong></span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="p-2.5 rounded-xl bg-[#151412] hover:bg-[#1E1D19] border border-[#262421] text-[#8E8A83] hover:text-[#F8F6F0] transition-colors cursor-pointer"
          title="Share this payment page"
          aria-label="Share page"
        >
          <Share2 className="w-4 h-4 text-[#C2956A]" />
        </button>
      </div>
    </div>
  )
}
