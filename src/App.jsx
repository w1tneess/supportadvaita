import React, { useState, useMemo } from 'react'
import { PAYMENT_CONFIG } from './config/payment.js'
import { useTheme } from './hooks/useTheme.js'
import Header from './components/Header.jsx'
import AmountSelector from './components/AmountSelector.jsx'
import NoteField from './components/NoteField.jsx'
import QrCard from './components/QrCard.jsx'
import UpiActions from './components/UpiActions.jsx'
import StickyMobileBar from './components/StickyMobileBar.jsx'
import PostPaymentNote from './components/PostPaymentNote.jsx'
import ProjectsShowcase from './components/ProjectsShowcase.jsx'
import EmbedBadgesModal from './components/EmbedBadgesModal.jsx'
import Toast from './components/Toast.jsx'
import { ShieldCheck, ArrowUpRight, Smartphone, QrCode, Copy, Check, Sparkles, Heart } from 'lucide-react'

export default function App() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [selectedAmount, setSelectedAmount] = useState(101)
  const [isCustom, setIsCustom] = useState(false)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [mobileTab, setMobileTab] = useState('pay') // 'pay' or 'qr' for small mobile viewports
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [copiedBadge, setCopiedBadge] = useState(false)

  const showToast = (msg) => {
    setToastMessage(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2400)
  }

  const handleCopyUpi = (textToCopy) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`)
      }).catch(() => {
        showToast(`Copied to clipboard`)
      })
    }
  }

  const handleCopyBadge = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(PAYMENT_CONFIG.embedBadges.markdown).then(() => {
        setCopiedBadge(true)
        showToast('README Markdown badge copied!')
        setTimeout(() => setCopiedBadge(false), 2200)
      })
    }
  }

  // Canonical UPI payment URI (sanitized, NPCI bounds enforced)
  const upiUri = useMemo(() => {
    let fullNote = ''
    if (note && note.trim()) {
      fullNote = note.trim()
      if (name && name.trim()) fullNote += ` (${name.trim()})`
    } else if (name && name.trim()) {
      fullNote = `From ${name.trim()}`
    } else {
      fullNote = `Support paytoadvaita`
    }
    return PAYMENT_CONFIG.buildUpiUri(selectedAmount, fullNote)
  }, [selectedAmount, name, note])

  return (
    <div className="relative min-h-dvh flex flex-col justify-between bg-[#FBFBFD] dark:bg-[#0C0B0A] text-[#1D1D1F] dark:text-[#F8F6F0] pb-24 lg:pb-0 transition-colors overflow-x-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-[#B8860B]/8 to-transparent dark:from-[#C2956A]/10 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#B8860B]/5 dark:bg-[#C2956A]/5 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      {/* Toast Notification */}
      <Toast message={toastMessage} visible={toastVisible} />

      {/* Embed Badges & Links Modal */}
      <EmbedBadgesModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        onCopy={(txt) => showToast('Badge code copied to clipboard!')}
      />

      {/* Primary Application Workspace */}
      <div className="flex-1">
        {/* Full-Width Executive Header */}
        <Header
          onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Main Content Hub: Expands gracefully across desktop viewports */}
        <main className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Mobile Tab Switcher (Visible only on mobile screens < lg) */}
          <div className="lg:hidden p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] ring-1 ring-black/[0.05] dark:ring-white/[0.08] mb-6">
            <div className="flex items-center p-0.5 rounded-full bg-white dark:bg-[#151412] shadow-inner">
              <button
                type="button"
                onClick={() => setMobileTab('pay')}
                className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active-press ${
                  mobileTab === 'pay'
                    ? 'bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D] shadow-sm'
                    : 'text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>1. Pay via UPI</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('qr')}
                className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer active-press ${
                  mobileTab === 'qr'
                    ? 'bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D] shadow-sm'
                    : 'text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>2. Scan QR Code</span>
              </button>
            </div>
          </div>

          {/* Master 12-Column Executive Desktop Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Contribution Workflow Form (7 cols on desktop) */}
            <div className={`space-y-6 ${mobileTab === 'qr' ? 'hidden lg:block lg:col-span-7 xl:col-span-7' : 'lg:col-span-7 xl:col-span-7'}`}>
              {/* Step 1: Sahyog & Shagun Selection */}
              <AmountSelector
                selectedAmount={selectedAmount}
                onSelectAmount={setSelectedAmount}
                isCustom={isCustom}
                setIsCustom={setIsCustom}
              />

              {/* Step 2: Supporter Name & Note */}
              <NoteField
                name={name}
                setName={setName}
                note={note}
                setNote={setNote}
              />

              {/* Step 3: Complete Contribution Console */}
              <UpiActions
                upiUri={upiUri}
                upiId={PAYMENT_CONFIG.upiId}
                onCopyUpi={handleCopyUpi}
                amount={selectedAmount}
                note={note ? `${note}${name ? ` (${name})` : ''}` : ''}
              />

              {/* Step 4: Post Payment Acknowledgment */}
              <PostPaymentNote
                amount={selectedAmount}
                name={name}
                note={note}
              />
            </div>

            {/* Right Column: Sticky Interactive Terminal & Patron Badges (5 cols on desktop) */}
            <div className={`space-y-6 lg:col-span-5 xl:col-span-5 lg:sticky lg:top-8 ${mobileTab === 'pay' ? 'hidden lg:block' : 'block'}`}>
              {/* Interactive Dynamic QR Terminal */}
              <QrCard
                upiUri={upiUri}
                amount={selectedAmount}
                note={note ? (name ? `${note} (${name})` : note) : (name ? `From ${name}` : '')}
                upiId={PAYMENT_CONFIG.upiId}
                recipientName={PAYMENT_CONFIG.recipientName}
                onCopyUpi={handleCopyUpi}
                resolvedTheme={resolvedTheme}
              />

              {/* Desktop Quick Badge & Repo Integration Card */}
              <div className="p-1.5 sm:p-2 rounded-[28px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
                <div className="p-5 rounded-[calc(28px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-3 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
                      <span className="text-xs font-bold text-[#1D1D1F] dark:text-[#F8F6F0]">
                        GitHub README Badge
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsBadgeModalOpen(true)}
                      className="text-[11px] font-mono-code text-[#B8860B] dark:text-[#C2956A] hover:underline cursor-pointer"
                    >
                      More formats →
                    </button>
                  </div>

                  <p className="text-[11px] text-[#6E6E73] dark:text-[#8E8A83] leading-relaxed">
                    Embed this badge directly in your open-source repositories or blog footers to link here:
                  </p>

                  <div className="p-3 rounded-xl bg-[#F8F8FA] dark:bg-[#0E0D0C] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between shadow-inner">
                    <img
                      src={PAYMENT_CONFIG.embedBadges.shieldUrl}
                      alt="Support Advaita Chandra"
                      className="h-6 rounded shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={handleCopyBadge}
                      className="px-3 py-1 rounded-lg bg-white dark:bg-[#1A1815] hover:bg-black/[0.03] dark:hover:bg-[#25221D] border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono-code font-semibold text-[#1D1D1F] dark:text-[#F8F6F0] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active-press"
                    >
                      {copiedBadge ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#B8860B] dark:text-[#C2956A]" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Peer-to-Peer Integrity Seal */}
              <div className="p-1.5 rounded-[24px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
                <div className="p-4 rounded-[calc(24px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] text-xs text-[#6E6E73] dark:text-[#8E8A83] leading-relaxed flex items-start gap-3 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#1D1D1F] dark:text-[#F8F6F0]">Direct Peer-to-Peer Settlement: </span>
                    100% of your contribution reaches Advaita directly without third-party aggregator commissions or hold periods.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Open Projects & Research Portfolio */}
          <ProjectsShowcase onOpenBadgeModal={() => setIsBadgeModalOpen(true)} />
        </main>
      </div>

      {/* Sticky Mobile Checkout Bar (Visible on mobile viewports only) */}
      <StickyMobileBar
        upiUri={upiUri}
        amount={selectedAmount}
        onCopyUpi={handleCopyUpi}
        upiId={PAYMENT_CONFIG.upiId}
      />

      {/* Executive Footer */}
      <footer className="border-t border-black/[0.06] dark:border-white/[0.08] py-8 mt-16 bg-white/60 dark:bg-[#0C0B0A]/80 backdrop-blur-md transition-colors">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868B] dark:text-[#736F68]">
          <div className="flex items-center gap-2.5">
            <span>© {new Date().getFullYear()} Advaita Chandra</span>
            <span>•</span>
            <span className="font-mono-code text-[#B8860B] dark:text-[#C2956A] font-semibold">support.advaitachandra.in</span>
            <span>•</span>
            <span>Independent Patron Hub</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://advaitachandra.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1 transition-colors"
            >
              <span>advaitachandra.in</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/w1tneess"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsBadgeModalOpen(true)}
              className="text-[#B8860B] dark:text-[#C2956A] hover:underline cursor-pointer font-medium active-press"
            >
              Embed Badges
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
