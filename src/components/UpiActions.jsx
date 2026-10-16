import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Copy, Check, ArrowRight, Share2, Smartphone, ShieldCheck, Zap, Lock } from 'lucide-react'
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
        particleCount: 60,
        spread: 70,
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

  return (
    <div className="p-1.5 sm:p-2 rounded-[28px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
      <div className="p-5 sm:p-6 rounded-[calc(28px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-5 transition-colors">
        {/* Step Header */}
        <div className="flex items-center justify-between pb-1 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
            <span className="text-xs font-mono-code font-bold uppercase tracking-[0.15em] text-[#B8860B] dark:text-[#C2956A]">
              Step 03 • Complete Contribution
            </span>
          </div>

          <span className="text-xs font-mono-code text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Zero Gateway Cut (0%)</span>
          </span>
        </div>

        {/* Master Primary Action: Universal UPI Intent Launcher (Zero Company Specific Logos) */}
        <a
          href={upiUri}
          onClick={handlePayClick}
          className="group relative w-full py-4 pl-6 pr-3 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#A87908] to-[#946806] dark:from-[#C2956A] dark:via-[#B88758] dark:to-[#A87647] hover:opacity-95 text-white dark:text-[#0F0E0D] font-bold text-base flex items-center justify-between shadow-xl shadow-[#C2956A]/20 transition-all active-press cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-xl bg-black/15 dark:bg-black/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white dark:text-[#0F0E0D]" />
            </div>
            <div className="text-left">
              <div className="tracking-tight font-extrabold text-base sm:text-lg leading-tight">
                Pay {amount ? `₹${amount}` : 'Sahyog'} with any UPI App
              </div>
              <div className="text-[11px] opacity-85 font-mono-code font-normal leading-tight mt-0.5">
                Universal protocol intent • Opens installed banking app
              </div>
            </div>
          </div>

          {/* Nested Button-in-Button Trailing Icon Pill */}
          <span className="w-10 h-10 rounded-xl bg-white/20 dark:bg-black/15 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:translate-x-0.5 shrink-0">
            <ArrowRight className="w-5 h-5 text-white dark:text-[#0F0E0D]" />
          </span>
        </a>

        {/* In-Place Copy UPI ID & Share Controls */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 py-3 px-4 rounded-xl border text-xs font-medium flex items-center justify-between transition-all cursor-pointer shadow-xs active-press ${
              copied
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                : 'bg-[#F8F8FA] dark:bg-[#181714] hover:bg-[#F2F2F5] dark:hover:bg-[#201E1A] border-black/[0.08] dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F8F6F0]'
            }`}
          >
            {copied ? (
              <div className="flex items-center gap-2 w-full justify-center py-0.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-mono-code font-bold">Copied {upiId} to clipboard!</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2.5">
                  <Copy className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
                  <span>
                    UPI VPA: <strong className="font-mono-code text-[#B8860B] dark:text-[#C2956A] font-bold">{upiId}</strong>
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-[#86868B] dark:text-[#736F68] uppercase tracking-wider">
                  Tap to Copy
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-3 rounded-xl bg-[#F8F8FA] dark:bg-[#181714] hover:bg-[#F2F2F5] dark:hover:bg-[#201E1A] border border-black/[0.08] dark:border-white/[0.08] text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-colors cursor-pointer shadow-xs active-press"
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

        {/* Direct P2P Guarantee & Security Feature Strip */}
        <div className="p-4 rounded-2xl bg-[#F8F8FA] dark:bg-[#100F0D] border border-black/[0.06] dark:border-white/[0.08] space-y-2.5 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1D1D1F] dark:text-[#F8F6F0]">
            <ShieldCheck className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
            <span>Direct Peer-to-Peer Protocol Verification</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-[#6E6E73] dark:text-[#8E8A83]">
            <div className="flex items-start gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A] shrink-0 mt-0.5" />
              <span><strong>Instant Bank P2P:</strong> Settled immediately via NPCI UPI protocol.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>0% Middleman Fee:</strong> 100% reaches Advaita directly.</span>
            </div>
            <div className="flex items-start gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A] shrink-0 mt-0.5" />
              <span><strong>Bank Grade:</strong> Authenticated securely via your device UPI PIN.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
