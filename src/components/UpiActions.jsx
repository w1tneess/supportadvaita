import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Copy, Check, Smartphone, ArrowRight, Share2, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function UpiActions({ upiUri, upiId, onCopyUpi, amount, note }) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
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
    setTimeout(() => setCopied(false), 2400)
  }

  const handlePayClick = (appId) => {
    triggerFeedback()
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#B8860B', '#C2956A', '#F8F6F0', '#E5D4C0'],
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
      setShared(true)
      setTimeout(() => setShared(false), 2400)
    }
  }

  return (
    <div className="space-y-4">
      {/* Eyebrow Label */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/10 border border-[#B8860B]/20 dark:border-[#C2956A]/20">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
        <span className="text-[9px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#B8860B] dark:text-[#C2956A]">
          Step 03 • Complete Contribution
        </span>
      </div>

      {/* Primary Mobile Action: Button-in-Button Master UPI Intent Launcher */}
      <a
        href={PAYMENT_CONFIG.buildAppUpiUri(selectedApp, amount, note)}
        onClick={() => handlePayClick(selectedApp)}
        className="group relative w-full py-3.5 pl-6 pr-2 rounded-full bg-gradient-to-r from-[#B8860B] via-[#A87908] to-[#946806] dark:from-[#C2956A] dark:via-[#B88758] dark:to-[#A87647] hover:opacity-95 text-white dark:text-[#0F0E0D] font-bold text-base flex items-center justify-between shadow-xl shadow-[#C2956A]/20 transition-all active-press cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Smartphone className="w-5 h-5 text-white/90 dark:text-[#0F0E0D]/90" />
          <span className="tracking-tight">
            Pay {amount ? `₹${amount}` : 'via'} with UPI
          </span>
        </div>

        {/* Nested Button-in-Button Trailing Icon Pill */}
        <span className="w-9 h-9 rounded-full bg-white/20 dark:bg-black/15 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:translate-x-0.5">
          <ArrowRight className="w-4 h-4 text-white dark:text-[#0F0E0D]" />
        </span>
      </a>

      {/* App Choice Selector with Double-Bezel Architecture */}
      <div className="p-1.5 rounded-[22px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
        <div className="p-3 rounded-[calc(22px-0.375rem)] bg-white dark:bg-[#151412] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] space-y-2">
          <span className="text-[11px] text-[#6E6E73] dark:text-[#8E8A83] block text-center font-medium">
            Or launch your preferred installed UPI app:
          </span>

          <div className="grid grid-cols-4 gap-2">
            <a
              href={PAYMENT_CONFIG.buildAppUpiUri('gpay', amount, note)}
              onClick={() => handlePayClick('gpay')}
              className="py-2.5 px-2 rounded-xl bg-black/[0.02] dark:bg-[#1B1A17] hover:bg-black/[0.05] dark:hover:bg-[#24221E] border border-black/[0.06] dark:border-white/[0.06] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-all shadow-sm active-press hover:-translate-y-0.5"
            >
              <span className="text-[#B8860B] dark:text-[#C2956A] font-bold text-[12px] font-mono-code">GPay</span>
              <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">Google</span>
            </a>

            <a
              href={PAYMENT_CONFIG.buildAppUpiUri('phonepe', amount, note)}
              onClick={() => handlePayClick('phonepe')}
              className="py-2.5 px-2 rounded-xl bg-black/[0.02] dark:bg-[#1B1A17] hover:bg-black/[0.05] dark:hover:bg-[#24221E] border border-black/[0.06] dark:border-white/[0.06] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-all shadow-sm active-press hover:-translate-y-0.5"
            >
              <span className="text-[#5f259f] dark:text-[#a878e3] font-bold text-[12px] font-mono-code">PhonePe</span>
              <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">UPI</span>
            </a>

            <a
              href={PAYMENT_CONFIG.buildAppUpiUri('paytm', amount, note)}
              onClick={() => handlePayClick('paytm')}
              className="py-2.5 px-2 rounded-xl bg-black/[0.02] dark:bg-[#1B1A17] hover:bg-black/[0.05] dark:hover:bg-[#24221E] border border-black/[0.06] dark:border-white/[0.06] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-all shadow-sm active-press hover:-translate-y-0.5"
            >
              <span className="text-[#0089b3] dark:text-[#00baf2] font-bold text-[12px] font-mono-code">Paytm</span>
              <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">UPI</span>
            </a>

            <a
              href={PAYMENT_CONFIG.buildAppUpiUri('bhim', amount, note)}
              onClick={() => handlePayClick('bhim')}
              className="py-2.5 px-2 rounded-xl bg-black/[0.02] dark:bg-[#1B1A17] hover:bg-black/[0.05] dark:hover:bg-[#24221E] border border-black/[0.06] dark:border-white/[0.06] text-center text-xs font-medium text-[#1D1D1F] dark:text-[#F8F6F0] flex flex-col items-center gap-0.5 transition-all shadow-sm active-press hover:-translate-y-0.5"
            >
              <span className="text-[#008c44] dark:text-[#00b359] font-bold text-[12px] font-mono-code">BHIM</span>
              <span className="text-[9px] text-[#86868B] dark:text-[#736F68]">Govt</span>
            </a>
          </div>
        </div>
      </div>

      {/* Secondary Actions: In-Place Copy UPI ID & Share Page */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-1 py-3 px-4 rounded-full border text-xs font-medium flex items-center justify-between transition-all cursor-pointer shadow-sm active-press ${
            copied
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-[#151412] hover:bg-black/[0.02] dark:hover:bg-[#1E1D19] border-black/[0.08] dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F8F6F0]'
          }`}
        >
          {copied ? (
            <div className="flex items-center gap-2 w-full justify-center">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono-code font-bold">Copied {upiId}!</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
                <span>Copy UPI ID: <strong className="font-mono-code text-[#B8860B] dark:text-[#C2956A]">{upiId}</strong></span>
              </div>
              <span className="text-[10px] font-mono-code text-[#86868B] dark:text-[#736F68] uppercase tracking-wider">
                Click to copy
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="p-3 rounded-full bg-white dark:bg-[#151412] hover:bg-black/[0.02] dark:hover:bg-[#1E1D19] border border-black/[0.08] dark:border-white/[0.08] text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-colors cursor-pointer shadow-sm active-press"
          title="Share this payment page"
          aria-label="Share page"
        >
          {shared ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Share2 className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
          )}
        </button>
      </div>
    </div>
  )
}
