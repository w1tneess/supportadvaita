import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import ThemeToggle from './ThemeToggle.jsx'
import { Globe, Github, Twitter, Instagram, Sparkles, ShieldCheck, MapPin, GraduationCap, ArrowUpRight, CheckCircle2 } from 'lucide-react'

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
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Executive Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap p-2 rounded-full backdrop-blur-2xl bg-white/80 dark:bg-[#151412]/85 border border-black/[0.08] dark:border-white/[0.08] shadow-sm">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] text-xs font-mono-code text-[#424245] dark:text-[#C2956A]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0]">advaita@fam</span>
            <span className="text-[#86868B] dark:text-[#736F68] hidden sm:inline">• Direct Peer-to-Peer UPI</span>
          </div>

          {/* Right controls: Theme Toggle + Badges modal launcher */}
          <div className="flex items-center gap-2.5 pr-1">
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <button
              type="button"
              onClick={onOpenBadgeModal}
              className="group inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full text-xs font-medium text-[#424245] dark:text-[#F8F6F0] bg-black/[0.03] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer shadow-sm active-press"
              title="Get repository badges and embed code"
            >
              <span className="font-semibold text-[11px] sm:text-xs">Badges & Embeds</span>
              <span className="w-5 h-5 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/20 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:translate-x-0.5">
                <Sparkles className="w-3 h-3 text-[#B8860B] dark:text-[#C2956A]" />
              </span>
            </button>
          </div>
        </div>

        {/* Hero Section: Double-Bezel Hardware Architecture */}
        <div className="p-1.5 sm:p-2 rounded-[32px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
          <div className="p-6 sm:p-8 rounded-[calc(32px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden transition-colors">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#B8860B]/8 to-transparent dark:from-[#C2956A]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              {/* Left Hero Profile Column */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Luxury Double-Ring Avatar */}
                  <div className="relative shrink-0">
                    <div className="p-1.5 rounded-[28px] bg-black/[0.04] dark:bg-white/[0.06] ring-1 ring-black/[0.08] dark:ring-white/[0.1] shadow-md">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[calc(28px-0.375rem)] overflow-hidden bg-[#F2F2F7] dark:bg-[#1B1A17] flex items-center justify-center">
                        {!imgError ? (
                          <img
                            src={PAYMENT_CONFIG.avatar}
                            alt={PAYMENT_CONFIG.recipientName}
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <span className="text-3xl font-editorial text-[#B8860B] dark:text-[#C2956A] font-bold">AC</span>
                        )}
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1 bg-[#FBFBFD] dark:bg-[#141311] rounded-full shadow-sm">
                      <div className="bg-emerald-600 dark:bg-emerald-500 text-white p-1 rounded-full shadow-xs" title="Direct P2P Verified">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Profile Identification */}
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/10 border border-[#B8860B]/20 dark:border-[#C2956A]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
                      <span className="text-[9.5px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#B8860B] dark:text-[#C2956A]">
                        Independent Creator & Student
                      </span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0]">
                        {PAYMENT_CONFIG.recipientName}
                      </h1>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-black/[0.05] dark:bg-white/[0.08] text-[#424245] dark:text-[#C2956A] font-mono-code font-bold">
                        {PAYMENT_CONFIG.nickname}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#6E6E73] dark:text-[#8E8A83] flex-wrap pt-0.5">
                      <span className="flex items-center gap-1.5 font-medium text-[#1D1D1F] dark:text-[#F8F6F0]">
                        <GraduationCap className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
                        <span>{PAYMENT_CONFIG.grade} • {PAYMENT_CONFIG.age}yo</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#86868B] dark:text-[#736F68]" />
                        <span>{PAYMENT_CONFIG.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative Bio */}
                <p className="text-sm sm:text-[15px] text-[#424245] dark:text-[#A5A096] leading-relaxed font-normal">
                  {PAYMENT_CONFIG.bio}
                </p>

                <p className="text-xs sm:text-[13px] text-[#6E6E73] dark:text-[#7E7A73] leading-relaxed">
                  {PAYMENT_CONFIG.subBio}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {PAYMENT_CONFIG.socials.map((soc) => {
                    const IconComp = iconMap[soc.icon] || Globe
                    return (
                      <a
                        key={soc.name}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-full bg-[#F7F7F9] dark:bg-[#1C1A17] hover:bg-black/[0.06] dark:hover:bg-[#262420] border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1.5 transition-all shadow-xs active-press"
                      >
                        <IconComp className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
                        <span>{soc.name}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Right Hero Epistemic Pull-Quote Column */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                <div className="p-5 sm:p-6 rounded-2xl bg-[#F8F8FA] dark:bg-[#0F0E0D] border border-black/[0.06] dark:border-white/[0.08] shadow-inner space-y-3 relative overflow-hidden">
                  <div className="absolute top-2 right-3 text-4xl font-serif text-[#B8860B]/20 dark:text-[#C2956A]/20 pointer-events-none select-none">
                    “
                  </div>
                  <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#B8860B] dark:text-[#C2956A] block">
                    Epistemic Manifesto
                  </span>
                  <p className="font-editorial text-base sm:text-lg italic text-[#1D1D1F] dark:text-[#E8E4D8] leading-relaxed">
                    "{PAYMENT_CONFIG.quote.text}"
                  </p>
                  <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono-code text-[#86868B] dark:text-[#736F68]">
                    <span>— {PAYMENT_CONFIG.quote.author}</span>
                    <span>{PAYMENT_CONFIG.quote.source}</span>
                  </div>
                </div>

                {/* 4-Item Desktop Metric Strip */}
                <div className="grid grid-cols-2 gap-2.5">
                  {PAYMENT_CONFIG.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-3 rounded-xl bg-[#F7F7F9] dark:bg-[#1B1A17] border border-black/[0.05] dark:border-white/[0.06] space-y-0.5"
                    >
                      <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#86868B] dark:text-[#736F68] block">
                        {m.label}
                      </span>
                      <span className="text-xs sm:text-[13px] font-bold text-[#B8860B] dark:text-[#C2956A] font-mono-code block">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
