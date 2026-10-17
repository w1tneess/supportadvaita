import React, { useState, useMemo, useEffect, useRef } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Moon,
  QrCode,
  Share2,
  Smartphone,
  Sun,
  Info,
  Github,
  X
} from 'lucide-react'
import { PAYMENT_CONFIG, MAX_AMOUNT, parseAmount, formatInr } from '../config/payment.js'
import { generateQrSvg, generateQrPng } from '../lib/qrcode.js'

const AMOUNT_ERROR = `Enter a whole amount between ₹1 and ${formatInr(MAX_AMOUNT)}.`

/**
 * Editorial, Humanist Support Page for Advaita Chandra
 * Designed with the minimal, high-craft ethos of Linear, Stripe Press, and Vercel.
 */
export default function SupportPage({ theme, setTheme }) {
  const [amount, setAmount] = useState(150)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [supporterName, setSupporterName] = useState('')
  const [supporterNote, setSupporterNote] = useState('')
  const [qrSvg, setQrSvg] = useState('')
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState(null)

  // Determine active amount. An invalid custom entry never falls back to a partial parse ("150abc" ≠ ₹150).
  const customParsed = parseAmount(customAmount)
  const amountInvalid = isCustom && customParsed === null
  const activeAmount = isCustom ? (customParsed ?? 0) : amount
  const amountLabel = activeAmount ? formatInr(activeAmount) : ''

  const fullNote = useMemo(() => {
    const note = supporterNote.trim()
    const name = supporterName.trim()
    if (note) return name ? `${note} (${name})` : note
    return name ? `From ${name}` : 'Support Advaita Chandra'
  }, [supporterName, supporterNote])

  // Canonical UPI payment URI (amount preset) — used for the QR, where scans pass PSP risk checks
  const upiUri = useMemo(() => PAYMENT_CONFIG.buildUpiUri(activeAmount, fullNote), [activeAmount, fullNote])
  // Mobile tap links default to open-amount: web-initiated P2P intents with a preset amount are
  // often declined by PSP risk engines, so the payer types (or pastes) the amount in-app instead
  const openUpiUri = useMemo(() => PAYMENT_CONFIG.buildUpiUri(activeAmount, fullNote, { withAmount: false }), [activeAmount, fullNote])

  // iPadOS reports a Mac UA, so also check for touch
  const { isAndroid, isIOS } = useMemo(() => {
    if (typeof navigator === 'undefined') return { isAndroid: false, isIOS: false }
    const ua = navigator.userAgent
    return {
      isAndroid: /android/i.test(ua),
      isIOS: /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1),
    }
  }, [])
  const isMobile = isAndroid || isIOS

  // After a pay link hands off to an app and the user comes back, offer fallbacks:
  // a declined in-app payment can't be detected from the browser.
  const [showPayHelp, setShowPayHelp] = useState(false)
  const launchedAt = useRef(0)
  const markLaunch = ({ copyAmount = true } = {}) => {
    launchedAt.current = Date.now()
    // Not awaited: the copy starts inside the tap gesture, and intent navigation doesn't unload the page
    if (copyAmount && activeAmount) {
      writeClipboard(String(activeAmount)).then((ok) => {
        if (ok) showToast(`${amountLabel} copied — paste it in the app`)
      })
    }
  }
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible' && launchedAt.current && Date.now() - launchedAt.current > 1500) {
        launchedAt.current = 0
        setShowPayHelp(true)
      }
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  // Re-render QR code dynamically whenever URI or theme changes
  useEffect(() => {
    let isMounted = true
    // Always generate high-contrast black QR on white background for camera readability
    generateQrSvg(upiUri, 'light').then((svg) => {
      if (isMounted) setQrSvg(svg)
    })
    return () => {
      isMounted = false
    }
  }, [upiUri])

  const toastTimer = useRef(null)
  const copiedTimer = useRef(null)
  useEffect(() => () => {
    clearTimeout(toastTimer.current)
    clearTimeout(copiedTimer.current)
  }, [])

  const showToast = (message, ok = true) => {
    setToast({ message, ok })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2500)
  }

  // Async Clipboard API needs a secure context; fall back to execCommand for older/in-app browsers
  const writeClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      try {
        return document.execCommand('copy')
      } catch {
        return false
      } finally {
        document.body.removeChild(ta)
      }
    }
  }

  const handleCopy = async (text = PAYMENT_CONFIG.upiId, message = 'UPI ID copied to clipboard') => {
    if (await writeClipboard(text)) {
      setCopied(true)
      clearTimeout(copiedTimer.current)
      copiedTimer.current = setTimeout(() => setCopied(false), 2000)
      showToast(message)
    } else {
      showToast(`Copy failed. UPI ID: ${PAYMENT_CONFIG.upiId}`, false)
    }
  }

  const handleDownloadQr = async () => {
    if (amountInvalid) return
    const blob = await generateQrPng(upiUri, {
      title: PAYMENT_CONFIG.recipientName,
      subtitle: PAYMENT_CONFIG.upiId,
      amount: amountLabel,
    })
    if (!blob) return showToast('Could not create the QR image', false)
    const filename = `upi-qr-advaita-${activeAmount || 'custom'}.png`

    // iOS Safari ignores <a download> for images; the share sheet offers "Save Image" instead
    if (isIOS) {
      const file = new File([blob], filename, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file] })
        } catch {
          // User dismissed the share sheet
        }
        return
      }
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    showToast(isMobile ? 'QR saved — scan it from your gallery in your UPI app' : 'QR image downloaded')
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Support Advaita Chandra',
      text: `Support Advaita Chandra's independent research and open-source tools via UPI (${PAYMENT_CONFIG.upiId}).`,
      url: window.location.href,
    }
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // User dismissed the share sheet
      }
    } else {
      handleCopy(window.location.href, 'Page link copied to clipboard')
    }
  }

  const presetTiers = [
    { value: 50, note: 'Chai' },
    { value: 150, note: 'A book', badge: 'Suggested' },
    { value: 500, note: 'Hosting' },
    { value: 1000, note: 'Hardware' },
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
    },
    {
      category: 'Archival Storage & Redundancy',
      purpose: 'Public dataset backups, historical scan preservation, and media storage',
      cost: '₹450 / mo',
    },
    {
      category: 'Research Books & Academic Texts',
      purpose: 'Primary editions, philosophy monographs, and technical literature',
      cost: '₹650 / mo',
    },
    {
      category: 'Domain & Canonical Web Namespace',
      purpose: 'Annual renewal for advaitachandra.in and personal digital infrastructure',
      cost: '₹179 / mo',
      note: '₹2,148/yr',
    },
  ]

  const ctaClass = 'w-full py-4 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:active:bg-zinc-300 dark:text-zinc-950 font-semibold text-base flex items-center justify-between gap-3 text-left transition-all duration-150 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-900 dark:disabled:hover:bg-zinc-50 disabled:active:scale-100 disabled:shadow-none'
  const ctaContent = (
    <>
      <span className="flex items-center gap-2.5">
        <Smartphone className="w-5 h-5 shrink-0 text-zinc-300 dark:text-zinc-700" aria-hidden="true" />
        <span>
          {isMobile
            ? `Pay ${amountLabel || 'any amount'} with a UPI app`
            : `Scan the QR to pay${amountLabel ? ` ${amountLabel}` : ''} from your phone`}
        </span>
      </span>
      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
    </>
  )

  return (
    <div>
      <a
        href="#support"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-3 focus:py-2 focus:rounded-lg focus:bg-white focus:text-zinc-900 dark:focus:bg-zinc-900 dark:focus:text-zinc-100 focus:shadow-lg text-sm font-medium"
      >
        Skip to payment
      </a>

      {/* Toast Notification (live region stays mounted so screen readers announce each message) */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 flex justify-center pointer-events-none"
      >
        {toast && (
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#14171A] text-white border border-neutral-700/80 shadow-xl text-xs font-medium">
            {toast.ok ? (
              <Check className="w-4 h-4 shrink-0 text-emerald-400" aria-hidden="true" />
            ) : (
              <Info className="w-4 h-4 shrink-0 text-amber-400" aria-hidden="true" />
            )}
            <span>{toast.message}</span>
          </div>
        )}
      </div>

      {/* Top Editorial Nav Header */}
      <header className="border-b border-[#E5E7EB] dark:border-[#22262B] bg-[#FBFBFA]/80 dark:bg-[#0B0D0E]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0">
              <img
                src={PAYMENT_CONFIG.avatar}
                alt="" width="384" height="384" decoding="async" fetchPriority="high"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 leading-none">
                Advaita Chandra
              </span>
              <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-normal mt-0.5">
                Independent Research & Code
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleCopy()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-neutral-100 dark:bg-[#14171A] hover:bg-neutral-200/70 dark:hover:bg-[#1C2024] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-[#22262B] transition-colors cursor-pointer"
              title="Copy UPI ID"
            >
              <span className="sr-only">Copy UPI ID </span>
              <span className="text-neutral-500 dark:text-neutral-400" aria-hidden="true">upi:</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {PAYMENT_CONFIG.upiId}
              </span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-[#14171A] border border-transparent hover:border-neutral-200 dark:hover:border-[#22262B] transition-all cursor-pointer"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-600" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Primary Page Container - max-w-5xl for balanced editorial density */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">

        {/* SECTION A: Hero & Narrative Header */}
        <section className="space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight sm:leading-[1.12] text-neutral-950 dark:text-neutral-50 max-w-3xl">
            Support public research, digital archives, and open software.
          </h1>

          <p className="text-[15px] sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl leading-relaxed font-normal">
            I am Advaita Chandra, a 16-year-old student, independent researcher, and developer based in West Bengal, India. Outside of my school curriculum, I build open-source utilities, investigate philosophical and historical records, and curate free digital archives.
          </p>

          <div className="pt-2 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 py-1">
            <p className="font-serif italic text-base sm:text-lg text-neutral-800 dark:text-neutral-200 leading-snug">
              "Building open digital archives, cultural preservation tools, and free educational software without institutional gates."
            </p>
          </div>
        </section>

        {/* SECTION B: Unified Support Module (Split View) */}
        <section id="support" aria-labelledby="support-heading" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Contribution Configurator (7 cols on md+) */}
          <div className="md:col-span-7 flex flex-col justify-between bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xs">
            <div className="space-y-6">
              <div>
                <h2 id="support-heading" className="text-2xl sm:text-3xl font-serif text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Support the Research
                </h2>
                <p className="text-[15px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                  Choose an amount or enter your own. Voluntary personal support helps cover infrastructure, books, and archive hosting. No platform fee is charged by this website.
                </p>
              </div>

              {/* Tiered Amount Selection (Responsive 2x2 grid on mobile, 4-col on desktop) */}
              <div className="space-y-3">
                <p id="amount-label" className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Select Amount (INR)
                </p>

                <div role="group" aria-labelledby="amount-label" className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1.5">
                  {presetTiers.map((tier) => {
                    const isSelected = !isCustom && amount === tier.value
                    return (
                      <button
                        key={tier.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setAmount(tier.value)
                          setIsCustom(false)
                          setCustomAmount('')
                        }}
                        className={`relative p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[76px] ${
                          isSelected
                            ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-950 shadow-sm'
                            : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100'
                        }`}
                      >
                        {tier.badge && (
                          <span
                            className={`absolute -top-2.5 inset-x-0 mx-auto w-fit text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full pointer-events-none tracking-wide shadow-xs ${
                              isSelected
                                ? 'bg-amber-400 text-zinc-950'
                                : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700/60'
                            }`}
                          >
                            {tier.badge}
                          </span>
                        )}
                        <span className="text-lg font-semibold tracking-tight">{formatInr(tier.value)}</span>
                        <span
                          className={`text-xs mt-0.5 ${
                            isSelected ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-600 dark:text-zinc-400'
                          }`}
                        >
                          {tier.note}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Custom Amount (always visible; typing selects it, picking a tier clears it) */}
                <div className="pt-1">
                  <label htmlFor="custom-amount" className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1.5">
                    Or enter a custom amount (whole rupees)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 font-medium" aria-hidden="true">
                      ₹
                    </span>
                    {/* type="text" so the raw value is validated as typed; type="number" hides "150abc"/"1e3" from JS */}
                    <input
                      id="custom-amount"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="e.g. 250"
                      value={customAmount}
                      aria-invalid={amountInvalid}
                      aria-describedby="custom-amount-error"
                      onFocus={() => customAmount && setIsCustom(true)}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setIsCustom(e.target.value !== '')
                      }}
                      className={`w-full pl-8 pr-4 py-2.5 rounded-xl border bg-white dark:bg-[#121214] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-base sm:text-sm ${
                        amountInvalid
                          ? 'border-red-600 dark:border-red-400'
                          : isCustom ? 'border-zinc-900 dark:border-white' : 'border-zinc-200 dark:border-zinc-800'
                      }`}
                    />
                  </div>
                  <p id="custom-amount-error" aria-live="polite" className="text-xs text-red-700 dark:text-red-400 mt-1.5">
                    {amountInvalid ? AMOUNT_ERROR : ''}
                  </p>
                </div>
              </div>

              {/* Optional Supporter Details */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Optional Note & Handle
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="supporter-name" className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1.5">Your name or handle</label>
                    <input
                      id="supporter-name"
                      type="text"
                      autoComplete="nickname"
                      placeholder="Optional"
                      value={supporterName}
                      onChange={(e) => setSupporterName(e.target.value)}
                      maxLength={30}
                      aria-describedby="supporter-hint"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-base sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="supporter-note" className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1.5">Short note</label>
                    <input
                      id="supporter-note"
                      type="text"
                      autoComplete="off"
                      placeholder="Optional"
                      value={supporterNote}
                      onChange={(e) => setSupporterNote(e.target.value)}
                      maxLength={50}
                      aria-describedby="supporter-hint"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 text-base sm:text-sm"
                    />
                  </div>
                </div>
                <p id="supporter-hint" className="text-xs text-zinc-600 dark:text-zinc-400">
                  Added to the UPI payment note (up to 50 characters; symbols are removed).
                </p>
              </div>

              {/* Dynamic Primary Execution Call-to-Action (desktop can't open upi:// — point to the QR) */}
              <div className="pt-2">
                {amountInvalid ? (
                  <button type="button" disabled aria-describedby="custom-amount-error" className={ctaClass}>
                    {ctaContent}
                  </button>
                ) : (
                  <a
                    href={isMobile ? openUpiUri : '#scan-qr'}
                    onClick={() => isMobile && markLaunch()}
                    className={ctaClass}
                  >
                    {ctaContent}
                  </a>
                )}
                {isMobile && (
                  <div className="mt-2.5 flex items-center justify-between gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                    <span>
                      {amountInvalid
                        ? 'Fix the amount above to continue.'
                        : activeAmount
                          ? <>Opens your UPI app — <span className="font-semibold text-zinc-900 dark:text-zinc-100">{amountLabel}</span> is copied, just paste it.</>
                          : 'Opens your UPI app — enter any amount.'}
                    </span>
                    <button
                      type="button"
                      onClick={handleDownloadQr}
                      disabled={amountInvalid}
                      className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <QrCode className="w-3.5 h-3.5" aria-hidden="true" />
                      Save QR
                    </button>
                  </div>
                )}
              </div>

              {/* Recovery options for app-side declines (shown after returning from an app, or on demand) */}
              {isMobile && (showPayHelp ? (
                <div role="region" aria-label="Payment troubleshooting" className="rounded-xl border border-amber-300/70 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-950/30 p-4 space-y-3 text-xs text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-start justify-between gap-3">
                    <p className="leading-relaxed">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">Payment declined in the app?</span>{' '}
                      A failed UPI payment is normally not debited; if money left your account, contact your bank or UPI app. Try one of these:
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPayHelp(false)}
                      className="shrink-0 -m-1.5 w-8 h-8 inline-flex items-center justify-center rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-amber-100 dark:hover:bg-amber-900/40 cursor-pointer"
                      aria-label="Dismiss payment help"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <ol className="space-y-2.5 list-decimal pl-4">
                    <li>
                      <button
                        type="button"
                        onClick={handleDownloadQr}
                        disabled={amountInvalid}
                        className="font-semibold underline underline-offset-2 text-zinc-900 dark:text-zinc-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Save the QR
                      </button>
                      <span>, then in your UPI app tap Scan → upload from gallery.</span>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => handleCopy()}
                        className="font-semibold underline underline-offset-2 text-zinc-900 dark:text-zinc-100 cursor-pointer"
                      >
                        Copy UPI ID
                      </button>
                      <span> ({PAYMENT_CONFIG.upiId}) and pay it via "Pay to UPI ID" in your app.</span>
                    </li>
                    {activeAmount ? (
                      <li>
                        <a
                          href={upiUri}
                          onClick={() => markLaunch({ copyAmount: false })}
                          className="font-semibold underline underline-offset-2 text-zinc-900 dark:text-zinc-100"
                        >
                          Open UPI app with {amountLabel} pre-filled
                        </a>
                        <span> (some apps block this for personal UPI IDs).</span>
                      </li>
                    ) : null}
                  </ol>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPayHelp(true)}
                  className="py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-4 cursor-pointer"
                >
                  Payment failed in the app?
                </button>
              ))}
            </div>

            {/* Micro Trust Banner */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span>Voluntary personal support via UPI</span>
              <span>No platform fee is charged by this website</span>
            </div>
          </div>

          {/* Right Column: Direct Scan & VPA Container (5 cols, stacked below on mobile) */}
          <div id="scan-qr" className="scroll-mt-20 flex md:col-span-5 flex-col justify-between bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xs">

            {/* Header & Copyable VPA */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  {isMobile ? 'Pay by QR' : 'Scan to Pay'}
                </h3>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                  UPI · INR only
                </span>
              </div>

              {/* Copyable UPI Bar with feedback */}
              <button
                type="button"
                onClick={() => handleCopy()}
                className="w-full text-left flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
                title="Copy UPI ID"
              >
                <span className="flex flex-col min-w-0">
                  <span className="text-[10px] text-zinc-600 dark:text-zinc-400 uppercase tracking-wider font-mono">
                    <span className="sr-only">Copy </span>UPI ID (VPA)
                  </span>
                  <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {PAYMENT_CONFIG.upiId}
                  </span>
                </span>
                <span className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors shrink-0 ml-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </span>
              </button>
            </div>

            {/* High-contrast QR "pay card": always white so phone cameras read it in dark mode too */}
            <div className="flex flex-col items-center rounded-xl bg-white border border-zinc-200 dark:border-zinc-700 shadow-sm overflow-hidden">
              <div className="w-full flex items-baseline justify-between gap-2 px-4 pt-3.5">
                <span className="text-sm font-semibold text-zinc-900 truncate">{PAYMENT_CONFIG.recipientName}</span>
                <span className="text-base font-bold text-zinc-900 font-mono shrink-0">
                  {amountInvalid ? '—' : amountLabel || 'Any amount'}
                </span>
              </div>
              <div className="w-full flex justify-center p-3">
                {amountInvalid ? (
                  <div className="w-full max-w-56 aspect-square flex items-center justify-center text-center px-6 text-zinc-600 text-xs">
                    Enter a valid amount to show the QR code.
                  </div>
                ) : qrSvg ? (
                  <div
                    role="img"
                    aria-label={`UPI QR code to pay ${amountLabel ? `${amountLabel} ` : ''}to ${PAYMENT_CONFIG.upiId}`}
                    className="w-full max-w-56 aspect-square flex items-center justify-center select-none [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                ) : (
                  <div className="w-full max-w-56 aspect-square flex items-center justify-center text-zinc-600 text-xs">
                    Generating QR…
                  </div>
                )}
              </div>
              <p className="w-full border-t border-zinc-100 px-4 py-2.5 text-center text-[11px] leading-relaxed text-zinc-600">
                Works with most UPI apps. If the link does not open, scan the QR code or copy the UPI ID.
              </p>
            </div>

            {/* How to scan — on a phone the QR has to come from the gallery */}
            <ol className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
              {(isMobile
                ? ['Tap “Save QR to gallery” below', 'Open your UPI app → Scan → pick the image from gallery', 'Check the payee, amount, and pay']
                : ['Open a UPI app on your phone', 'Tap Scan and point it at this QR', 'Check the payee, amount, and pay']
              ).map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-4 h-4 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-center" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {/* Action Row & Disclaimer */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  disabled={amountInvalid}
                  className={`flex-1 min-h-11 py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    isMobile
                      ? 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950'
                      : 'border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isMobile ? 'Save QR to gallery' : 'Download QR'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 min-h-11 py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Share Page</span>
                </button>
              </div>

              {/* Payment disclaimer: visible next to the QR, not buried in the footer */}
              <div role="note" aria-labelledby="disclaimer-heading" className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 p-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-1.5">
                <p id="disclaimer-heading" className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
                  <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Voluntary personal support.
                </p>
                <p>
                  Contributions are sent by UPI to a FamPay UPI ID operated by Advaita Chandra with parental/guardian permission and supervision. This is a voluntary personal contribution — not a charitable donation, purchase, or commercial transaction. No goods or services are provided in exchange. This website charges no platform fee. Your UPI app may apply its own limits, security checks, or policies. Payments are voluntary and non-refundable except where required by law. Questions or payment issues:{' '}
                  <a
                    href={`mailto:${PAYMENT_CONFIG.contactEmail}`}
                    className="font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-2 whitespace-nowrap"
                  >
                    {PAYMENT_CONFIG.contactEmail}
                  </a>
                </p>
                <p>Only UPI payments in Indian rupees (INR) are supported.</p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION C: Selected Work & Repositories */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-300 dark:border-[#22262B] pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-neutral-950 dark:text-neutral-50 tracking-tight">
                Selected Work & Digital Archives
              </h2>
              <p className="text-[15px] text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                Public software repositories, digital notebooks, and empirical datasets built independently.
              </p>
            </div>
            <a
              href="https://github.com/w1tneess"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-neutral-100 inline-flex items-center gap-1"
            >
              <span>View GitHub</span>
              <span className="sr-only">(opens in new tab)</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {featuredProjects.map((project, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl border border-neutral-300 dark:border-[#262A30] bg-white dark:bg-[#14171A] hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
                      {project.tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-neutral-950 dark:text-neutral-50 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-neutral-200 dark:border-[#22262B] flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="font-mono text-xs truncate max-w-[55%]">{project.stack}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors"
                        aria-label={`${project.title}: source code on GitHub (opens in new tab)`}
                      >
                        <Github className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="text-xs font-medium">Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 inline-flex items-center gap-1 text-neutral-950 dark:text-neutral-50 font-semibold hover:underline underline-offset-2 transition-all"
                        aria-label={`${project.title}: live site (opens in new tab)`}
                      >
                        <span className="text-xs">Live</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION D: Operational Transparency (Structured Table & Progress Indicator) */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-neutral-300 dark:border-[#22262B] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif text-neutral-950 dark:text-neutral-50 tracking-tight">
                Operational Transparency
              </h2>
              <p className="text-[15px] text-neutral-700 dark:text-neutral-300 mt-1 leading-relaxed">
                Itemized real monthly maintenance and infrastructure costs required to sustain these public tools.
              </p>
            </div>
            <div className="text-left sm:text-right font-mono shrink-0">
              <span className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 block">Monthly Target</span>
              <span className="text-lg font-bold text-neutral-950 dark:text-neutral-50">₹2,079 / mo</span>
            </div>
          </div>

          {/* Itemized Table Container */}
          <div className="border border-neutral-300 dark:border-[#22262B] rounded-2xl overflow-hidden bg-white dark:bg-[#14171A] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Monthly infrastructure costs in Indian rupees</caption>
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-[#22262B] bg-neutral-50/80 dark:bg-[#0E1012] text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    <th scope="col" className="py-3 px-5 sm:px-6 font-semibold">Infrastructure Item</th>
                    <th scope="col" className="py-3 px-5 sm:px-6 font-semibold hidden sm:table-cell">Function & Scope</th>
                    <th scope="col" className="py-3 px-5 sm:px-6 font-semibold text-right">Monthly Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-[#22262B] text-sm">
                  {ledgerCosts.map((cost, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-neutral-50/60 dark:hover:bg-[#1C2024]/40 transition-colors"
                    >
                      <td className="py-4 px-5 sm:px-6">
                        <div className="font-medium text-neutral-950 dark:text-neutral-50 text-[15px]">
                          {cost.category}
                        </div>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 sm:hidden mt-0.5">
                          {cost.purpose}
                        </div>
                      </td>
                      <td className="py-4 px-5 sm:px-6 text-neutral-600 dark:text-neutral-400 text-xs hidden sm:table-cell leading-relaxed">
                        {cost.purpose}
                      </td>
                      <td className="py-4 px-5 sm:px-6 text-right shrink-0 whitespace-nowrap">
                        <div className="font-mono text-sm font-bold text-neutral-950 dark:text-neutral-50">
                          {cost.cost}
                        </div>
                        {cost.note && (
                          <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                            {cost.note}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 sm:p-5 bg-neutral-50 dark:bg-[#0B0D0E] border-t border-neutral-200 dark:border-[#22262B] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                Baseline student operating infrastructure target
              </span>
              <span className="font-mono text-sm font-bold text-neutral-950 dark:text-neutral-50">
                ₹2,079 / month
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* SECTION E: Refined Editorial Footer */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-neutral-200 dark:border-[#22262B] pt-12 pb-16 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 items-start">

            {/* Col 1: Bio & Ethos (6 cols) */}
            <div className="md:col-span-6 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800 shrink-0">
                  <img
                    src={PAYMENT_CONFIG.avatar}
                    alt="" width="384" height="384" decoding="async" loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif font-medium text-sm text-neutral-900 dark:text-neutral-100">
                  Advaita Chandra
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-medium border border-emerald-500/20">
                  Student Builder • Age 16
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm">
                Independent research, open historical archives, and public software tools, supported by voluntary personal contributions. No platform fee is charged by this website.
              </p>
              <div className="text-[11px] text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true"></span>
                <span>Receives UPI at <span className="font-mono text-neutral-700 dark:text-neutral-300">{PAYMENT_CONFIG.upiId}</span> (a FamPay UPI ID)</span>
              </div>
            </div>

            {/* Col 2: Navigation Links (3 cols) */}
            <nav aria-labelledby="footer-links-heading" className="md:col-span-3 space-y-2.5">
              <h2 id="footer-links-heading" className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
                Ecosystem
              </h2>
              <ul className="space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                {[
                  { href: 'https://advaitachandra.in', label: 'advaitachandra.in' },
                  { href: 'https://github.com/w1tneess', label: 'GitHub Repositories' },
                  { href: 'https://x.com/w1tneess_', label: 'Twitter / X (@w1tneess_)' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <span className="sr-only">(opens in new tab)</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" aria-hidden="true" />
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${PAYMENT_CONFIG.contactEmail}`}
                    className="py-1 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Email ({PAYMENT_CONFIG.contactEmail})</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>

            {/* Col 3: UPI ID (3 cols) */}
            <div className="md:col-span-3 space-y-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
                UPI ID
              </h2>
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleCopy()}
                  className="w-full text-left py-2.5 px-3 rounded-lg border border-neutral-200 dark:border-[#22262B] bg-white dark:bg-[#14171A] hover:bg-neutral-50 dark:hover:bg-[#1C2024] text-neutral-700 dark:text-neutral-300 transition-all flex items-center justify-between group cursor-pointer"
                  title="Copy UPI ID"
                >
                  <span className="flex flex-col">
                    <span className="text-[10px] text-neutral-600 dark:text-neutral-400"><span className="sr-only">Copy </span>Virtual Payment Address</span>
                    <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      {PAYMENT_CONFIG.upiId}
                    </span>
                  </span>
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100 shrink-0" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Privacy disclosure (kept accurate to the code: no analytics, no cookies, one localStorage key) */}
          <section aria-labelledby="privacy-heading" className="max-w-2xl space-y-1.5">
            <h2 id="privacy-heading" className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
              Privacy
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              This website does not use analytics, advertising trackers, or third-party cookies. Any name or note you enter is used only to create your UPI payment reference and is not stored on this website’s server. It stays in your browser until you open your UPI app, which receives it as the payment note (visible to you and the recipient). Your light/dark theme choice is saved in your browser’s local storage. Cloudflare, which hosts this site, may keep standard request logs (such as IP address) for security.
            </p>
          </section>

          {/* Sub-footer Bar with Copyright & Privacy Standards */}
          <div className="pt-6 border-t border-neutral-200/80 dark:border-[#22262B]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span>© {new Date().getFullYear()} Advaita Chandra</span>
              <span aria-hidden="true">•</span>
              <span>Class 10 CBSE Student Builder</span>
              <span aria-hidden="true">•</span>
              <span>West Bengal, India</span>
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap text-center">
              <span>No analytics or tracking cookies</span>
              <span aria-hidden="true">•</span>
              <span>Not affiliated with or endorsed by FamPay or any UPI app</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
