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
import { ShieldCheck, ArrowUpRight, Smartphone, QrCode } from 'lucide-react'

export default function App() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [selectedAmount, setSelectedAmount] = useState(150)
  const [isCustom, setIsCustom] = useState(false)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [mobileTab, setMobileTab] = useState('pay') // 'pay' or 'qr'
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

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

  // Live UPI pay URI based on state
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
      {/* Ambient Lighting Orbs (Hardware-accelerated, fixed, pointer-events-none) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#B8860B]/8 to-transparent dark:from-[#C2956A]/10 blur-[130px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#B8860B]/5 dark:bg-[#C2956A]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Toast Notification */}
      <Toast message={toastMessage} visible={toastVisible} />

      {/* Badges / Repo Connection Modal */}
      <EmbedBadgesModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        onCopy={(txt) => showToast('Badge code copied to clipboard!')}
      />

      {/* Main Page Container */}
      <div className="flex-1">
        {/* Header Section */}
        <Header
          onOpenBadgeModal={() => setIsBadgeModalOpen(true)}
          theme={theme}
          setTheme={setTheme}
        />

        {/* Payment & Content Workspace */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Mobile Tab Switcher (Pay directly vs Show QR code) with Double-Bezel Architecture */}
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
                <span>1. Pay via App</span>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form & App Actions */}
            <div className={`space-y-6 ${mobileTab === 'qr' ? 'hidden lg:block lg:col-span-7' : 'lg:col-span-7'}`}>
              <AmountSelector
                selectedAmount={selectedAmount}
                onSelectAmount={setSelectedAmount}
                isCustom={isCustom}
                setIsCustom={setIsCustom}
              />

              <NoteField
                name={name}
                setName={setName}
                note={note}
                setNote={setNote}
              />

              {/* Direct UPI Action Launchers */}
              <div className="pt-1">
                <UpiActions
                  upiUri={upiUri}
                  upiId={PAYMENT_CONFIG.upiId}
                  onCopyUpi={handleCopyUpi}
                  amount={selectedAmount}
                  note={note ? `${note}${name ? ` (${name})` : ''}` : ''}
                />
              </div>

              {/* After payment acknowledgment */}
              <PostPaymentNote
                amount={selectedAmount}
                name={name}
                note={note}
              />

              {/* Trust & Transparency Note with Double-Bezel Architecture */}
              <div className="p-1 rounded-[20px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
                <div className="p-4 rounded-[calc(20px-0.25rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] text-xs text-[#6E6E73] dark:text-[#8E8A83] leading-relaxed flex items-start gap-2.5 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#1D1D1F] dark:text-[#F8F6F0]">Direct Peer-to-Peer Settlement: </span>
                    No payment aggregators or gateways extracting cuts. 100% of your contribution reaches Advaita's FamPay account to directly fund domains, cloud compute, books, and code.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Dynamic QR Code Card */}
            <div className={`lg:col-span-5 lg:sticky lg:top-8 ${mobileTab === 'pay' ? 'hidden lg:block' : 'block'}`}>
              <QrCard
                upiUri={upiUri}
                amount={selectedAmount}
                note={note ? (name ? `${note} (${name})` : note) : (name ? `From ${name}` : '')}
                upiId={PAYMENT_CONFIG.upiId}
                recipientName={PAYMENT_CONFIG.recipientName}
                onCopyUpi={handleCopyUpi}
                resolvedTheme={resolvedTheme}
              />
            </div>
          </div>

          {/* Connected Projects Showcase */}
          <ProjectsShowcase onOpenBadgeModal={() => setIsBadgeModalOpen(true)} />
        </main>
      </div>

      {/* Sticky Mobile Checkout Bar (Visible on mobile viewports) */}
      <StickyMobileBar
        upiUri={upiUri}
        amount={selectedAmount}
        onCopyUpi={handleCopyUpi}
        upiId={PAYMENT_CONFIG.upiId}
      />

      {/* Footer */}
      <footer className="border-t border-black/[0.06] dark:border-white/[0.08] py-8 mt-12 bg-white/50 dark:bg-[#0C0B0A] backdrop-blur-sm transition-colors">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868B] dark:text-[#736F68]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Advaita Chandra</span>
            <span>•</span>
            <span className="font-mono-code text-[#B8860B] dark:text-[#C2956A] font-semibold">paytoadvaita</span>
          </div>

          <div className="flex items-center gap-4">
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
              Get Badges
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
