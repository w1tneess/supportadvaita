import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Copy, Check, ArrowRight, Share2, Smartphone, ShieldCheck, Zap, Globe2 } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function UpiActions({ upiUri, upiId, onCopyUpi, amount, note }) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)

  const triggerFeedback = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(40) } catch {}
    }
  }

  const handleCopy = () => {
    triggerFeedback()
    onCopyUpi(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const handlePayClick = () => {
    triggerFeedback()
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#B8860B', '#C2956A', '#1D1D1F', '#F8F6F0'],
      })
    } catch {}
  }

  const handleShare = async () => {
    triggerFeedback()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Support Advaita Chandra — support.advaitachandra.in',
          text: `Direct peer-to-peer patron support for Advaita Chandra's independent research, software, and writing.`,
          url: 'https://support.advaitachandra.in',
        })
      } catch (err) {}
    } else {
      navigator.clipboard.writeText('https://support.advaitachandra.in')
      onCopyUpi('https://support.advaitachandra.in')
      setShared(true)
      setTimeout(() => setShared(false), 2400)
    }
  }

  const usdValue = PAYMENT_CONFIG.inrToUsd(amount)

  return (
    <div className="space-y-3.5">
      {/* Monospace Step Header with Currency & Rail Context */}
      <div className="flex items-center justify-between pb-2 border-b border-black/[0.08] dark:border-neutral-800 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#B8860B] dark:text-[#C2956A]">03</span>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-semibold">
            Execute Transfer
          </span>
          <span className="text-neutral-400 dark:text-neutral-600 font-mono text-xs">/ UPI (FamPay)</span>
        </div>
        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
          Zero Fee (0.0%) • Direct Settlement
        </span>
      </div>

      {/* Pro-Dev High-Contrast Master Action Button */}
      <a
        href={upiUri}
        onClick={handlePayClick}
        className="group relative w-full py-3.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 font-mono font-bold text-sm sm:text-base flex items-center justify-between transition-all active-press shadow-xs cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <Smartphone className="w-4 h-4" />
          <div className="flex items-baseline gap-1.5">
            <span>Pay {amount ? `₹${amount} INR` : 'Sahyog'} with UPI</span>
            {usdValue && <span className="text-xs opacity-70 font-normal">(~${usdValue} USD)</span>}
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
          <span>↵ open app</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </a>

      {/* Pro-Dev Secondary Action Line: In-place Copy & Share */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 py-2.5 px-3.5 rounded-lg border text-xs font-mono flex items-center justify-between transition-colors cursor-pointer active-press ${
            copied
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-700 dark:text-neutral-300'
          }`}
        >
          {copied ? (
            <div className="flex items-center gap-2 w-full justify-center">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Copied {upiId} (FamPay) to clipboard</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>vpa: <strong className="text-neutral-900 dark:text-neutral-100">{upiId}</strong> <span className="text-neutral-400 font-normal">(FamPay)</span></span>
              </div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                click to copy
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
          title="Share page"
          aria-label="Share page"
        >
          {shared ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Protocol & Cross-Border Assurance Line */}
      <div className="space-y-1 pt-1 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
        <div className="flex items-center gap-2">
          <Zap className="w-3 h-3 text-[#B8860B] dark:text-[#C2956A] shrink-0" />
          <span>Active Rail: Direct UPI to <strong className="text-neutral-700 dark:text-neutral-300">advaita@fam</strong> via FamPay. 1st priority currency is INR.</span>
        </div>
        <div className="flex items-center gap-2 pl-5">
          <Globe2 className="w-3 h-3 text-neutral-400 shrink-0" />
          <span>Cross-border cards/PayPal integration in development. Global supporters can reach out to sponsor directly.</span>
        </div>
      </div>
    </div>
  )
}
