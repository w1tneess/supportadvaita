import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import ThemeToggle from './ThemeToggle.jsx'
import { Globe, Github, Twitter, Instagram, MapPin, GraduationCap, ArrowUpRight, ArrowDown, Quote } from 'lucide-react'

const ICONS = { Globe, Github, Twitter, Instagram }

export default function Header({ theme, setTheme }) {
  const [imgError, setImgError] = useState(false)

  return (
    <>
      {/* Sticky slim nav */}
      <nav className="sticky top-0 z-40 border-b border-black/[0.08] dark:border-neutral-800/80 bg-white/75 dark:bg-[#0A0A0A]/75 backdrop-blur-md transition-colors">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0] truncate">
              support.advaitachandra.in
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-700 dark:text-emerald-300 font-medium whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {PAYMENT_CONFIG.upiId} · Any UPI app
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#support"
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#0C0B0A] dark:bg-white text-white dark:text-[#0C0B0A] text-xs font-mono font-bold hover:opacity-90 transition-opacity"
            >
              Support <ArrowDown className="w-3.5 h-3.5" />
            </a>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </nav>

      <header className="border-b border-black/[0.08] dark:border-neutral-800/80 transition-colors">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Identity */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 ring-4 ring-white dark:ring-neutral-900 border border-black/[0.1] dark:border-neutral-700 shadow-lg">
                    {!imgError ? (
                      <img
                        src={PAYMENT_CONFIG.avatar}
                        alt={PAYMENT_CONFIG.recipientName}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono font-bold text-xl text-neutral-700 dark:text-neutral-300">
                        AC
                      </div>
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-white dark:border-[#0A0A0A]" title="UPI active"></span>
                </div>

                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F] dark:text-[#F8F6F0]">
                      {PAYMENT_CONFIG.recipientName}
                    </h1>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-mono font-medium">
                      developer
                    </span>
                  </div>
                  <div className="flex items-center gap-x-4 gap-y-1 text-xs text-neutral-700 dark:text-neutral-300 font-mono flex-wrap font-medium">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                      Student Builder · {PAYMENT_CONFIG.age}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                      {PAYMENT_CONFIG.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-w-2xl">
                <p className="text-[15px] sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {PAYMENT_CONFIG.bio}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {PAYMENT_CONFIG.subBio}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {PAYMENT_CONFIG.socials.map((soc) => {
                  const Icon = ICONS[soc.icon] || Globe
                  return (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={soc.handle}
                      className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-neutral-300/80 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 transition-colors shadow-2xs"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{soc.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quote + metrics */}
            <div className="lg:col-span-5 space-y-5">
              <figure className="rounded-2xl border border-neutral-300/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 p-5 sm:p-6 shadow-2xs">
                <Quote className="w-5 h-5 text-[#B8860B] dark:text-[#C2956A] mb-3" />
                <blockquote className="font-editorial text-base sm:text-lg italic text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  “{PAYMENT_CONFIG.quote.text}”
                </blockquote>
                <figcaption className="mt-3 text-xs font-mono text-neutral-600 dark:text-neutral-400 font-medium">
                  — {PAYMENT_CONFIG.quote.author}, {PAYMENT_CONFIG.quote.source}
                </figcaption>
              </figure>

              <dl className="grid grid-cols-2 gap-3">
                {PAYMENT_CONFIG.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl border border-neutral-300/70 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 px-3.5 py-3 font-mono">
                    <dt className="text-[11px] uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
                      {m.label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
