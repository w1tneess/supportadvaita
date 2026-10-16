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
    <div className="space-y-4">
      {/* Monospace Step Header with Rail Context */}
      <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.08] dark:border-neutral-800 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">03</span>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-bold">
            Transfer via UPI
          </span>
          <span className="text-neutral-600 dark:text-neutral-400 font-mono text-xs font-medium">/ Direct Settlement</span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-500/10 border border-emerald-500/25">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Zero Platform Fee • Instant Settlement</span>
        </span>
      </div>

      {/* Prominent Primary Call-to-Action: Commanding UPI Payment Execution Button */}
      <a
        href={upiUri}
        onClick={handlePayClick}
        className="group relative w-full py-4 sm:py-4.5 px-5 sm:px-6 rounded-2xl bg-[#0C0B0A] hover:bg-black text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-[#0C0B0A] border-2 border-neutral-800 dark:border-neutral-200 shadow-lg shadow-neutral-950/20 dark:shadow-[0_4px_24px_rgba(255,255,255,0.12)] font-mono font-bold text-base sm:text-lg flex items-center justify-between transition-all duration-200 active-press cursor-pointer ring-1 ring-black/10 dark:ring-white/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 dark:bg-black/10 flex items-center justify-center text-white dark:text-neutral-900 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <span className="tracking-tight">
              Pay {amount ? `₹${amount} INR` : 'Custom Amount'} via UPI
            </span>
            {usdValue && (
              <span className="text-xs font-normal opacity-80">
                (~${usdValue} USD)
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold pl-2 shrink-0">
          <span className="hidden xs:inline opacity-90 group-hover:opacity-100">launch app</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
        </div>
      </a>

      {/* Secondary Action Line: In-place Copy & Share */}
      <div className="flex items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 h-12 px-4 rounded-xl border text-xs sm:text-sm font-mono flex items-center justify-between transition-colors cursor-pointer active-press ${
            copied
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold'
              : 'border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-2xs'
          }`}
        >
          {copied ? (
            <div className="flex items-center gap-2 w-full justify-center">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Copied {upiId} (FamPay) to clipboard</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>vpa: <strong className="text-neutral-950 dark:text-white font-bold">{upiId}</strong> <span className="text-neutral-600 dark:text-neutral-400 font-normal">(FamPay)</span></span>
              </div>
              <span className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wider font-semibold">
                click to copy
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="h-12 w-12 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
          title="Share page"
          aria-label="Share page"
        >
          {shared ? (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Protocol & Cross-Border Assurance Line */}
      <div className="space-y-1.5 pt-2 font-mono text-xs text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 shrink-0" />
          <span>Active Rail: Direct UPI to <strong className="text-neutral-900 dark:text-neutral-100 font-semibold">advaita@fam</strong> via FamPay. Instant settlement.</span>
        </div>
        <div className="flex items-center gap-2 pl-5.5 text-neutral-600 dark:text-neutral-400">
          <Globe2 className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" />
          <span>Cross-border cards and international multi-currency checkouts currently in development.</span>
        </div>
      </div>
    </div>
  )
}
