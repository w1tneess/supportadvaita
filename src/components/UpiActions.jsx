import React, { useState } from 'react'
import { Copy, Check, ExternalLink, Smartphone, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function UpiActions({ upiUri, upiId, onCopyUpi, amount }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopyUpi(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handlePayClick = (e) => {
    // Trigger celebratory confetti on tap
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C2956A', '#F8F6F0', '#DFC3A5'],
      })
    } catch {
      // Ignore if blocked
    }
  }

  return (
    <div className="space-y-3">
      {/* Primary Mobile Action: Open in UPI App */}
      <a
        href={upiUri}
        onClick={handlePayClick}
        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C2956A] to-[#B38355] hover:from-[#CCA076] hover:to-[#BD8D5F] text-[#0F0E0D] font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#C2956A]/20 transition-all transform active:scale-[0.99] cursor-pointer"
      >
        <Smartphone className="w-5 h-5" />
        <span>Pay {amount ? `₹${amount}` : ''} with any UPI App</span>
        <ArrowRight className="w-4 h-4 ml-0.5" />
      </a>

      {/* Secondary Desktop Action: Copy UPI ID */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 py-2.5 px-4 rounded-xl bg-[#151412] hover:bg-[#1E1D19] border border-[#262421] hover:border-[#38342D] text-xs sm:text-sm font-medium text-[#F8F6F0] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-mono-code font-semibold">Copied: {upiId}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#C2956A]" />
              <span>Copy UPI ID: <span className="font-mono-code text-[#C2956A]">{upiId}</span></span>
            </>
          )}
        </button>
      </div>

      {/* Supported Apps Pills */}
      <div className="pt-2 text-center">
        <p className="text-[11px] text-[#736F68] mb-2 font-medium">
          Supported across all UPI apps with 0% platform fee:
        </p>
        <div className="flex items-center justify-center flex-wrap gap-1.5 text-[11px] font-mono-code text-[#8E8A83]">
          <span className="px-2 py-0.5 rounded-md bg-[#161513] border border-[#22201C]">Google Pay</span>
          <span className="px-2 py-0.5 rounded-md bg-[#161513] border border-[#22201C]">PhonePe</span>
          <span className="px-2 py-0.5 rounded-md bg-[#161513] border border-[#22201C]">Paytm</span>
          <span className="px-2 py-0.5 rounded-md bg-[#161513] border border-[#22201C]">BHIM</span>
          <span className="px-2 py-0.5 rounded-md bg-[#161513] border border-[#22201C]">FamPay</span>
          <span className="px-2 py-0.5 rounded-md bg-[#161513] border border-[#22201C]">Cred</span>
        </div>
      </div>
    </div>
  )
}
