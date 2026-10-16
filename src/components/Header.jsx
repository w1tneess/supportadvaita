import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import ThemeToggle from './ThemeToggle.jsx'
import { Globe, Github, Twitter, Instagram, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react'

export default function Header({ theme, setTheme }) {
  const [imgError, setImgError] = useState(false)

  const iconMap = {
    Globe: Globe,
    Github: Github,
    Twitter: Twitter,
    Instagram: Instagram,
  }

  return (
    <header className="border-b border-black/[0.08] dark:border-neutral-800/80 bg-white/60 dark:bg-[#0A0A0A]/60 backdrop-blur-md transition-colors">
      <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Minimal Navigation Strip with Global Rail Context */}
        <div className="flex items-center justify-between gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-black/[0.06] dark:border-neutral-800/60 flex-wrap">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0]">
              support.advaitachandra.in
            </span>
            <span className="text-neutral-400 dark:text-neutral-600 hidden sm:inline">/</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>advaita@fam (FamPay)</span>
            </div>
            <span className="text-neutral-600 dark:text-neutral-400 font-mono text-xs hidden md:inline">
              • Direct Sponsor Portal • Zero Intermediary Fees
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>

        {/* Pro-Dev Hero Section (Open, Flat, Elegant, Zero Clunky Boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left: Identity & Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Clean Profile Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/[0.1] dark:border-neutral-700 shadow-xs">
                  {!imgError ? (
                    <img
                      src={PAYMENT_CONFIG.avatar}
                      alt={PAYMENT_CONFIG.recipientName}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      AC
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0A0A0A]" title="UPI Active"></span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0]">
                    {PAYMENT_CONFIG.recipientName}
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-mono font-medium">
                    developer
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-mono flex-wrap">
                  <span className="flex items-center gap-1.5 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                    <span>Independent Student Builder • 16yo</span>
                  </span>
                  <span className="text-neutral-400 dark:text-neutral-600">•</span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                    <span>{PAYMENT_CONFIG.location}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Bio */}
            <p className="text-sm sm:text-[15px] text-neutral-700 dark:text-neutral-200 leading-relaxed max-w-2xl font-normal">
              {PAYMENT_CONFIG.bio}
            </p>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              {PAYMENT_CONFIG.subBio}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-1 text-xs font-mono">
              {PAYMENT_CONFIG.socials.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{soc.name}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-80" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Camus Quote & Metric Chips */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 py-1 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-bold block">
                // Philosophy & Principle
              </span>
              <p className="font-editorial text-sm sm:text-base italic text-neutral-800 dark:text-neutral-200 leading-relaxed">
                "{PAYMENT_CONFIG.quote.text}"
              </p>
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 font-medium block">
                — {PAYMENT_CONFIG.quote.author}, {PAYMENT_CONFIG.quote.source}
              </span>
            </div>

            {/* Monospace Metric Strip */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-black/[0.08] dark:border-neutral-800/80">
              {PAYMENT_CONFIG.metrics.map((m) => (
                <div key={m.label} className="font-mono text-xs space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold block">
                    {m.label}
                  </span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
