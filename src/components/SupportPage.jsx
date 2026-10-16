import React, { useState, useMemo, useEffect } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Heart,
  Moon,
  QrCode,
  Share2,
  ShieldCheck,
  Smartphone,
  Sun,
  Sparkles,
  BookOpen,
  Server,
  Terminal,
  Info,
  Github
} from 'lucide-react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { generateQrSvg, generateQrPng } from '../lib/qrcode.js'
import { AppIconRenderer } from './AppIcons.jsx'

/**
 * Editorial, Humanist Support & Sponsorship Page for Advaita Chandra
 * Designed with the minimal, high-craft ethos of Linear, Stripe Press, and Vercel.
 */
export default function SupportPage({ theme, setTheme, onOpenBadges }) {
  const [amount, setAmount] = useState(150)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [donorName, setDonorName] = useState('')
  const [donorNote, setDonorNote] = useState('')
  const [qrSvg, setQrSvg] = useState('')
  const [copied, setCopied] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Determine active amount
  const activeAmount = isCustom ? (parseFloat(customAmount) || 0) : amount

  // Canonical UPI payment URI
  const upiUri = useMemo(() => {
    let fullNote = 'Support Advaita Chandra'
    if (donorNote && donorNote.trim()) {
      fullNote = donorNote.trim()
      if (donorName && donorName.trim()) fullNote += ` (${donorName.trim()})`
    } else if (donorName && donorName.trim()) {
      fullNote = `From ${donorName.trim()}`
    }
    return PAYMENT_CONFIG.buildUpiUri(activeAmount, fullNote)
  }, [activeAmount, donorName, donorNote])

  // Direct app paylinks
  const appPayLinks = useMemo(() => {
    let fullNote = 'Support Advaita Chandra'
    if (donorNote && donorNote.trim()) {
      fullNote = donorNote.trim()
      if (donorName && donorName.trim()) fullNote += ` (${donorName.trim()})`
    } else if (donorName && donorName.trim()) {
      fullNote = `From ${donorName.trim()}`
    }
    return PAYMENT_CONFIG.buildAppPayLinks(activeAmount, fullNote)
  }, [activeAmount, donorName, donorNote])

  // Detect Android for Intent links
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent)

  // Re-render QR code dynamically whenever URI or theme changes
  useEffect(() => {
    let isMounted = true
    generateQrSvg(upiUri, theme === 'dark' ? 'dark' : 'light').then((svg) => {
      if (isMounted) setQrSvg(svg)
    })
    return () => {
      isMounted = false
    }
  }, [upiUri, theme])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2500)
  }

  const handleCopy = (text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)
        showToast('UPI ID copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  const handleDownloadQr = async () => {
    const png = await generateQrPng(upiUri, theme === 'dark' ? 'dark' : 'light')
    if (!png) return
    const a = document.createElement('a')
    a.href = png
    a.download = `upi-qr-advaita-${activeAmount || 'custom'}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    showToast('High-res QR image downloaded')
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Support Advaita Chandra',
      text: `Support Advaita Chandra's independent research and open-source tools directly via UPI (${PAYMENT_CONFIG.upiId}).`,
      url: window.location.href,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // User dismissed
      }
    } else {
      handleCopy(window.location.href)
      showToast('Page link copied to clipboard')
    }
  }

  const usdValue = activeAmount ? PAYMENT_CONFIG.inrToUsd(activeAmount) : null

  const presetTiers = [
    { value: 50, label: '₹50', usd: '$0.60' },
    { value: 150, label: '₹150', usd: '$1.80', badge: 'Popular' },
    { value: 500, label: '₹500', usd: '$6.00' },
    { value: 1000, label: '₹1,000', usd: '$12.00' },
  ]

  const featuredProjects = [
    {
      title: 'declutter',
      description: 'Windows desktop application that safely declutters disordered folders: sorts files by type, identifies duplicates via cryptographic hashes, flags stale/oversized files, and previews every operation before moving.',
      tag: 'Python Utility',
      stack: 'Python • Hash Verification • CLI',
      repoUrl: 'https://github.com/w1tneess/declutter',
      liveUrl: 'https://declutter.advaitachandra.in/',
      status: 'Active v1.2',
    },
    {
      title: 'Osho Archival Documentary',
      description: 'Interactive documentary platform and evidence-graded archive deconstructing Osho and Rajneeshpuram. Built from 5,000+ discourse recordings, FBI vault documents, and Wasco County court records with interactive maps and timelines.',
      tag: 'Investigative Archive',
      stack: 'Next.js • TypeScript • Tailwind • Primary Archive',
      repoUrl: 'https://github.com/w1tneess/osho-documentary',
      liveUrl: 'https://oshodocumentary.advaitachandra.in/',
      status: 'Public Archive',
    },
    {
      title: 'advaitachandra.in',
      description: 'Personal site, research notebook, and digital garden featuring essays on epistemological philosophy, software systems architecture, and documentary street photography. Built for fast offline reading.',
      tag: 'Digital Garden',
      stack: 'React 19 • Vite • Tailwind • Supabase',
      repoUrl: 'https://github.com/w1tneess/advaita-website',
      liveUrl: 'https://www.advaitachandra.in/',
      status: 'Active',
    },
    {
      title: 'Terrorism in India Dataset (1947–2026)',
      description: 'Longitudinal empirical data visualization examining conflict incident reports across seven decades, marking reporting gaps and historical absences explicitly.',
      tag: 'Empirical Research',
      stack: 'Python • Data Reconciliation • History',
      repoUrl: 'https://github.com/w1tneess',
      liveUrl: 'https://advaitachandra.in/projects',
      status: 'Completed',
    },
  ]

  const ledgerCosts = [
    {
      category: 'Cloud Compute & Server Workers',
      purpose: 'Edge runtimes, lightweight backend workers, and static asset hosting',
      cost: '₹800 / mo',
      usd: '~$9.60',
    },
    {
      category: 'Archival Storage & Redundancy',
      purpose: 'Public dataset backups, historical scan preservation, and media storage',
      cost: '₹450 / mo',
      usd: '~$5.40',
    },
    {
      category: 'Research Books & Academic Texts',
      purpose: 'Primary editions, philosophy monographs, and technical literature',
      cost: '₹650 / mo',
      usd: '~$7.80',
    },
    {
      category: 'Domain & Canonical Web Namespace',
      purpose: 'Annual renewal for advaitachandra.in and personal digital infrastructure',
      cost: '₹179 / mo',
      usd: '~$2.15',
      note: '₹2,148/yr',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FBFBFA] dark:bg-[#0B0D0E] text-[#111827] dark:text-[#F3F4F6] transition-colors selection:bg-[#F59E0B]/20 selection:text-[#F59E0B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#14171A] text-white border border-neutral-700/80 shadow-xl text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Editorial Nav Header */}
      <header className="border-b border-[#E5E7EB] dark:border-[#22262B] bg-[#FBFBFA]/80 dark:bg-[#0B0D0E]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a
            href="https://advaitachandra.in"
            className="flex items-center gap-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <img
                src={PAYMENT_CONFIG.avatar}
                alt="Advaita Chandra"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://avatars.githubusercontent.com/u/108343743?v=4'
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 leading-none">
                Advaita Chandra
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-normal mt-0.5">
                Independent Research & Code
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleCopy(PAYMENT_CONFIG.upiId)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-[#14171A] hover:bg-neutral-200/70 dark:hover:bg-[#1C2024] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-[#22262B] transition-colors cursor-pointer"
              title="Click to copy UPI ID"
            >
              <span className="text-neutral-400">upi:</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {PAYMENT_CONFIG.upiId}
              </span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-[#14171A] border border-transparent hover:border-neutral-200 dark:hover:border-[#22262B] transition-all cursor-pointer"
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Primary Page Container */}
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20 space-y-20 sm:space-y-28">

        {/* SECTION A: Hero & Narrative Header */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Independent Student Researcher & Builder • Age 16
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] text-neutral-950 dark:text-neutral-50 max-w-3xl">
            Sponsor public research, digital archives, and open software.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed font-normal">
            I am Advaita Chandra, a 16-year-old student, independent researcher, and developer based in West Bengal, India. Outside of my school curriculum, I build open-source utilities, investigate philosophical and historical records, and curate free digital archives.
          </p>

          <div className="pt-2 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 py-1">
            <p className="font-serif italic text-base sm:text-lg text-neutral-800 dark:text-neutral-300 leading-snug">
              "Building open digital archives, cultural preservation tools, and free educational software without institutional gates."
            </p>
          </div>
        </section>

        {/* SECTION B: Unified Support / Sponsorship Module (Split View) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Contribution Configurator (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 dark:text-neutral-100 tracking-tight">
                Support the Research
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Choose a contribution tier or specify a custom amount. 100% directly funds infrastructure, books, and archive uptime with zero intermediary platform cuts.
              </p>
            </div>

            {/* Tiered Amount Selection (Clean Pills) */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Select Amount (INR)
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {presetTiers.map((tier) => {
                  const isSelected = !isCustom && amount === tier.value
                  return (
                    <button
                      key={tier.value}
                      type="button"
                      onClick={() => {
                        setAmount(tier.value)
                        setIsCustom(false)
                      }}
                      className={`relative p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 shadow-sm'
                          : 'border-neutral-200 dark:border-[#22262B] bg-white dark:bg-[#14171A] hover:border-neutral-300 dark:hover:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                      }`}
                    >
                      {tier.badge && (
                        <span
                          className={`absolute -top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase ${
                            isSelected
                              ? 'bg-amber-400 text-neutral-950 font-semibold'
                              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}
                        >
                          {tier.badge}
                        </span>
                      )}
                      <div className="text-lg font-semibold tracking-tight">{tier.label}</div>
                      <div
                        className={`text-xs mt-0.5 ${
                          isSelected ? 'opacity-80' : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        ~{tier.usd} USD
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Custom Amount Button & Input */}
              <div className="pt-1">
                {!isCustom ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustom(true)
                      setCustomAmount('')
                    }}
                    className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-4 cursor-pointer"
                  >
                    + Or enter a custom amount
                  </button>
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        max="100000"
                        placeholder="Enter custom amount (e.g. 250)"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-[#22262B] bg-white dark:bg-[#14171A] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                        autoFocus
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustom(false)
                        setAmount(150)
                      }}
                      className="px-3 py-2.5 rounded-xl text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Donor Details (Understated Inputs) */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Optional Note & Handle
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Name or @handle"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  maxLength={30}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-[#22262B] bg-white dark:bg-[#14171A] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
                <input
                  type="text"
                  placeholder="Short note (optional)"
                  value={donorNote}
                  onChange={(e) => setDonorNote(e.target.value)}
                  maxLength={50}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-[#22262B] bg-white dark:bg-[#14171A] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>
            </div>

            {/* Dynamic Primary Execution Call-to-Action */}
            <div className="pt-2">
              <a
                href={upiUri}
                className="w-full py-4 px-6 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-semibold text-base flex items-center justify-between transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-5 h-5 text-neutral-300 dark:text-neutral-700" />
                  <span>
                    Pay {activeAmount ? `₹${activeAmount} INR` : 'Custom Amount'} via Any UPI App
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs opacity-90 font-normal">
                  {usdValue && <span>(~${usdValue} USD)</span>}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            </div>

            {/* Direct 1-Tap App Launcher Row */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>Or open directly in your preferred app:</span>
                <span className="text-[11px]">1-tap launch</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {appPayLinks.map((app) => {
                  const href = isAndroid ? app.androidIntent : app.scheme
                  return (
                    <a
                      key={app.id}
                      href={href}
                      className="p-2 rounded-xl border border-neutral-200 dark:border-[#22262B] bg-white dark:bg-[#14171A] hover:bg-neutral-50 dark:hover:bg-[#1C2024] flex flex-col items-center justify-center gap-1.5 transition-all text-center group cursor-pointer"
                      title={`Launch and pay in ${app.name}`}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                        <AppIconRenderer appId={app.id} className="w-full h-full" />
                      </div>
                      <span className="text-[11px] font-medium text-neutral-700 dark:text-neutral-300 truncate w-full">
                        {app.shortName}
                      </span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Scan & VPA Container (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#14171A] border border-neutral-200 dark:border-[#22262B] rounded-2xl p-6 sm:p-7 space-y-6 shadow-sm">
            
            {/* Header & Copyable VPA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Scan to Pay (Desktop / QR)
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified UPI
                </span>
              </div>

              {/* Copyable UPI Bar */}
              <div
                onClick={() => handleCopy(PAYMENT_CONFIG.upiId)}
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-[#0B0D0E] border border-neutral-200 dark:border-[#22262B] cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group"
                title="Click to copy UPI address"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    Virtual Payment Address (VPA)
                  </span>
                  <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {PAYMENT_CONFIG.upiId}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-[#14171A] border border-neutral-200 dark:border-[#22262B] text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors shrink-0 ml-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>

            {/* Sharp, High-Contrast Dynamic QR Container */}
            <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-white border border-neutral-200 shadow-inner">
              {qrSvg ? (
                <div
                  className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center select-none"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-neutral-400 text-xs">
                  Generating dynamic QR...
                </div>
              )}
              <div className="mt-3 text-center">
                <span className="text-xs font-medium text-neutral-800">
                  Dynamic UPI QR for {activeAmount ? `₹${activeAmount}` : 'Custom'}
                </span>
                <p className="text-[11px] text-neutral-500">
                  Scan with GPay, PhonePe, Paytm, BHIM, or any banking app
                </p>
              </div>
            </div>

            {/* Direct Trust Statement & Action Row */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-200 dark:border-[#22262B] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#1C2024] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Download QR</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-200 dark:border-[#22262B] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-[#1C2024] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Page</span>
                </button>
              </div>

              <div className="text-[12px] text-neutral-500 dark:text-neutral-400 leading-relaxed space-y-1.5 border-t border-neutral-100 dark:border-[#22262B] pt-3">
                <p className="flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>Direct P2P transfer • 100% directly funds infrastructure • 0% platform fees.</span>
                </p>
                <p className="flex items-start gap-1.5 text-neutral-400 dark:text-neutral-500">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    International cards unavailable as Advaita is 16 and a legal minor. UPI serves as the primary direct interoperable rail.
                  </span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION C: Selected Work & Repositories */}
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 dark:border-[#22262B] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 dark:text-neutral-100 tracking-tight">
                Selected Work & Digital Archives
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Public software repositories, digital notebooks, and empirical datasets built independently.
              </p>
            </div>
            <a
              href="https://github.com/w1tneess"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 inline-flex items-center gap-1"
            >
              <span>View GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {featuredProjects.map((project, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-[#22262B] bg-white dark:bg-[#14171A] hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      {project.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-[#22262B] flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span className="font-mono text-[11px] truncate max-w-[55%]">{project.stack}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 font-semibold hover:underline underline-offset-2 transition-all"
                        title="View Live Platform"
                      >
                        <span className="text-[11px]">Live</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION D: Operational Transparency (Ledger) */}
        <section className="space-y-6 pt-6">
          <div className="border-b border-neutral-200 dark:border-[#22262B] pb-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 dark:text-neutral-100 tracking-tight">
              Operational Transparency
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Real monthly maintenance and infrastructure costs required to sustain these public tools.
            </p>
          </div>

          <div className="border border-neutral-200 dark:border-[#22262B] rounded-2xl overflow-hidden bg-white dark:bg-[#14171A]">
            <div className="divide-y divide-neutral-200 dark:divide-[#22262B]">
              {ledgerCosts.map((cost, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-50/50 dark:hover:bg-[#1C2024]/40 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {cost.category}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {cost.purpose}
                    </div>
                  </div>
                  <div className="flex items-baseline sm:flex-col sm:items-end gap-1.5 sm:gap-0 shrink-0">
                    <span className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {cost.cost}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {cost.usd} USD {cost.note ? `• ${cost.note}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 bg-neutral-50 dark:bg-[#0B0D0E] border-t border-neutral-200 dark:border-[#22262B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                Baseline student operating infrastructure target
              </span>
              <span className="font-mono text-sm font-bold text-neutral-950 dark:text-neutral-50">
                ~₹2,079 / month (~$24.90 USD)
              </span>
            </div>
          </div>
        </section>

        {/* SECTION E: Refined Editorial Footer */}
        <footer className="border-t border-neutral-200 dark:border-[#22262B] pt-12 pb-16 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 items-start">
            
            {/* Col 1: Bio & Ethos (6 cols) */}
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0">
                  <img
                    src={PAYMENT_CONFIG.avatar}
                    alt="Advaita Chandra"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://avatars.githubusercontent.com/u/108343743?v=4'
                    }}
                  />
                </div>
                <span className="font-serif font-medium text-sm text-neutral-900 dark:text-neutral-100">
                  Advaita Chandra
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-500/20">
                  Student Builder • Age 16
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
                Independent research, open historical archives, and public software tools. 100% directly funded with zero platform intermediary cuts.
              </p>
              <div className="text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Direct P2P Settlement via FamPay UPI (<span className="font-mono text-neutral-600 dark:text-neutral-300">advaita@fam</span>)</span>
              </div>
            </div>

            {/* Col 2: Navigation Links (3 cols) */}
            <div className="md:col-span-3 space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 block">
                Ecosystem
              </span>
              <ul className="space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                <li>
                  <a
                    href="https://advaitachandra.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>advaitachandra.in</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/w1tneess"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>GitHub Repositories</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/w1tneess_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Twitter / X (@w1tneess_)</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:advaita974@gmail.com"
                    className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Direct Email</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Direct Settlement (3 cols) */}
            <div className="md:col-span-3 space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200 block">
                Direct Settlement
              </span>
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleCopy(PAYMENT_CONFIG.upiId)}
                  className="w-full text-left py-2.5 px-3 rounded-lg border border-neutral-200 dark:border-[#22262B] bg-white dark:bg-[#14171A] hover:bg-neutral-50 dark:hover:bg-[#1C2024] text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-between group cursor-pointer"
                  title="Click to copy UPI ID"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neutral-400">Virtual Payment Address</span>
                    <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      {PAYMENT_CONFIG.upiId}
                    </span>
                  </div>
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 shrink-0" />
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Sub-footer Bar with Copyright & Privacy Standards */}
          <div className="pt-6 border-t border-neutral-200/80 dark:border-[#22262B]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400 dark:text-neutral-500">
            <div className="flex items-center gap-2 flex-wrap">
              <span>© {new Date().getFullYear()} Advaita Chandra</span>
              <span>•</span>
              <span>Class 10 CBSE Student Builder</span>
              <span>•</span>
              <span>West Bengal, India</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Zero tracking cookies</span>
              <span>•</span>
              <span>Open-source client</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}
