import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import ThemeToggle from './ThemeToggle.jsx'
import { Globe, Github, Twitter, Instagram, Sparkles, ShieldCheck, MapPin, GraduationCap } from 'lucide-react'

export default function Header({ onOpenBadgeModal, theme, setTheme }) {
  const [imgError, setImgError] = useState(false)

  const iconMap = {
    Globe: Globe,
    Github: Github,
    Twitter: Twitter,
    Instagram: Instagram,
  }

  return (
    <header className="pt-6 sm:pt-8 pb-6 border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Status Bar: Status Pill, Theme Toggle, Badge Modal Trigger */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] text-xs text-[#86868B] dark:text-[#C2956A] transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2956A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C2956A]"></span>
            </span>
            <span className="font-mono-code font-medium tracking-tight">advaita@fam • FamPay Verified</span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} setTheme={setTheme} />

            <button
              onClick={onOpenBadgeModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer shadow-sm"
              title="Get repository badges"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2956A]" />
              <span className="hidden sm:inline">Badges & Embeds</span>
              <span className="sm:hidden">Badges</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22px] overflow-hidden bg-white dark:bg-[#151412] border border-black/10 dark:border-white/10 shadow-lg shadow-black/[0.04] dark:shadow-black/60 flex items-center justify-center transition-all">
                {!imgError ? (
                  <img
                    src={PAYMENT_CONFIG.avatar}
                    alt={PAYMENT_CONFIG.recipientName}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-editorial text-[#C2956A]">AC</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-[#FBFBFD] dark:bg-[#0C0B0A] rounded-full transition-colors">
                <div className="bg-[#C2956A] text-white dark:text-[#0F0E0D] p-0.5 rounded-full shadow-sm" title="Verified Peer-to-Peer UPI">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0]">
                  {PAYMENT_CONFIG.recipientName}
                </h1>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-black/[0.05] dark:bg-white/[0.08] text-[#6E6E73] dark:text-[#A5A096] font-mono-code">
                  {PAYMENT_CONFIG.nickname}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#86868B] dark:text-[#8E8A83] mt-1.5 flex-wrap">
                <span className="flex items-center gap-1 font-medium">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C2956A]" />
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

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {PAYMENT_CONFIG.socials.map((soc) => {
              const IconComp = iconMap[soc.icon] || Globe
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-white dark:bg-[#151412] hover:bg-black/[0.03] dark:hover:bg-[#201E1A] border border-black/[0.08] dark:border-white/[0.08] text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-colors shadow-sm"
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
        <p className="text-sm sm:text-[14.5px] text-[#424245] dark:text-[#A5A096] leading-relaxed max-w-2xl">
          {PAYMENT_CONFIG.bio}
        </p>

        <p className="text-xs text-[#86868B] dark:text-[#7E7A73] leading-relaxed mt-2 max-w-2xl">
          {PAYMENT_CONFIG.subBio}
        </p>

        {/* Epistemic Quote Banner */}
        <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#141311] border border-black/[0.06] dark:border-white/[0.08] shadow-sm relative overflow-hidden transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="font-editorial text-base sm:text-lg italic text-[#B8860B] dark:text-[#C2956A] leading-snug">
              "{PAYMENT_CONFIG.quote.text}"
            </span>
            <span className="text-[11px] text-[#86868B] dark:text-[#8E8A83] font-mono-code shrink-0">
              — {PAYMENT_CONFIG.quote.author}
            </span>
          </div>
          <p className="text-[11px] text-[#86868B] dark:text-[#5A564F] mt-1.5 font-mono-code">
            {PAYMENT_CONFIG.quote.note}
          </p>
        </div>
      </div>
    </header>
  )
}
