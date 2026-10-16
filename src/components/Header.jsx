import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import ThemeToggle from './ThemeToggle.jsx'
import { Globe, Github, Twitter, Instagram, Sparkles, ShieldCheck, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react'

export default function Header({ onOpenBadgeModal, theme, setTheme }) {
  const [imgError, setImgError] = useState(false)

  const iconMap = {
    Globe: Globe,
    Github: Github,
    Twitter: Twitter,
    Instagram: Instagram,
  }

  return (
    <header className="pt-6 sm:pt-8 pb-8 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Floating Fluid Island Bar */}
        <div className="flex items-center justify-between gap-3 mb-8 flex-wrap p-1.5 rounded-full backdrop-blur-2xl bg-white/70 dark:bg-[#151412]/80 border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 pl-3 pr-3.5 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.04] text-[11px] font-mono-code text-[#424245] dark:text-[#C2956A]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold tracking-tight">advaita@fam</span>
            <span className="text-[#86868B] dark:text-[#736F68]">• FamPay Verified</span>
          </div>

          {/* Right controls: Theme Toggle + Badges button-in-button */}
          <div className="flex items-center gap-2 pr-1">
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <button
              type="button"
              onClick={onOpenBadgeModal}
              className="group inline-flex items-center gap-2 pl-3 pr-1 py-1 rounded-full text-xs font-medium text-[#424245] dark:text-[#F8F6F0] bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer shadow-sm active-press"
              title="Get repository badges and embed code"
            >
              <span className="text-[11px] font-medium hidden sm:inline">Badges & Embeds</span>
              <span className="text-[11px] font-medium sm:hidden">Badges</span>
              <span className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:translate-x-0.5">
                <Sparkles className="w-2.5 h-2.5 text-[#B8860B] dark:text-[#C2956A]" />
              </span>
            </button>
          </div>
        </div>

        {/* Profile Card with Double-Bezel Architecture */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            {/* Double-Bezel Avatar */}
            <div className="relative">
              <div className="p-1.5 rounded-[26px] bg-black/[0.04] dark:bg-white/[0.04] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[calc(26px-0.375rem)] overflow-hidden bg-white dark:bg-[#151412] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex items-center justify-center">
                  {!imgError ? (
                    <img
                      src={PAYMENT_CONFIG.avatar}
                      alt={PAYMENT_CONFIG.recipientName}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <span className="text-2xl font-editorial text-[#B8860B] dark:text-[#C2956A]">AC</span>
                  )}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-[#FBFBFD] dark:bg-[#0C0B0A] rounded-full transition-colors">
                <div className="bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D] p-1 rounded-full shadow-sm" title="Direct P2P FamPay UPI">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div>
              {/* Microscopic Eyebrow */}
              <div className="inline-flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/10 border border-[#B8860B]/20 dark:border-[#C2956A]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
                <span className="text-[9px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#B8860B] dark:text-[#C2956A]">
                  Independent Creator & Student
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0]">
                  {PAYMENT_CONFIG.recipientName}
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-black/[0.05] dark:bg-white/[0.08] text-[#6E6E73] dark:text-[#A5A096] font-mono-code font-medium">
                  {PAYMENT_CONFIG.nickname}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#6E6E73] dark:text-[#8E8A83] mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
                  <span>{PAYMENT_CONFIG.grade} • {PAYMENT_CONFIG.age}yo</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#86868B] dark:text-[#736F68]" />
                  <span>{PAYMENT_CONFIG.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Social Links as Island Buttons */}
          <div className="flex items-center gap-2">
            {PAYMENT_CONFIG.socials.map((soc) => {
              const IconComp = iconMap[soc.icon] || Globe
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white dark:bg-[#151412] hover:bg-black/[0.02] dark:hover:bg-[#1E1C18] border border-black/[0.08] dark:border-white/[0.08] text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-all shadow-sm active-press hover:-translate-y-0.5"
                  aria-label={soc.name}
                  title={`${soc.name}: ${soc.handle}`}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Bio & Tone */}
        <p className="text-sm sm:text-[14.5px] text-[#424245] dark:text-[#A5A096] leading-relaxed max-w-2xl font-normal">
          {PAYMENT_CONFIG.bio}
        </p>

        <p className="text-xs text-[#6E6E73] dark:text-[#7E7A73] leading-relaxed mt-2.5 max-w-2xl">
          {PAYMENT_CONFIG.subBio}
        </p>

        {/* Epistemic Quote with Double-Bezel Architecture */}
        <div className="mt-6 p-1.5 rounded-[22px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08]">
          <div className="p-4 sm:p-5 rounded-[calc(22px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="font-editorial text-base sm:text-lg italic text-[#B8860B] dark:text-[#C2956A] leading-snug">
                "{PAYMENT_CONFIG.quote.text}"
              </span>
              <span className="text-[11px] text-[#86868B] dark:text-[#8E8A83] font-mono-code shrink-0">
                — {PAYMENT_CONFIG.quote.author}
              </span>
            </div>
            <p className="text-[11px] text-[#86868B] dark:text-[#5A564F] mt-2 font-mono-code">
              {PAYMENT_CONFIG.quote.note}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
