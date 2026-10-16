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
import { ArrowUpRight, Smartphone, QrCode, ShieldCheck } from 'lucide-react'

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

  // Canonical UPI payment URI (sanitized, NPCI bounds enforced)
  const upiUri = useMemo(() => {
    let fullNote = ''
    if (note && note.trim()) {
      fullNote = note.trim()
      if (name && name.trim()) fullNote += ` (${name.trim()})`
    } else if (name && name.trim()) {
      fullNote = `From ${name.trim()}`
    } else {
      fullNote = `Support supportadvaita`
    }
    return PAYMENT_CONFIG.buildUpiUri(selectedAmount, fullNote)
  }, [selectedAmount, name, note])

  return (
    <div className="relative min-h-dvh flex flex-col justify-between bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-[#B8860B]/20 dark:selection:bg-[#C2956A]/20">
      {/* Precision Developer Dot Grid Texture */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] -z-10 opacity-70"></div>

      {/* Toast Notification */}
      <Toast message={toastMessage} visible={toastVisible} />

      {/* Embed Badges Modal (Accessed purely from subtle footer link) */}
      <EmbedBadgesModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        onCopy={() => showToast('Badge code copied to clipboard!')}
      />

      {/* Primary Pro-Dev Workspace */}
      <div className="flex-1 pb-16 lg:pb-0">
        {/* Unboxed Minimalist Header */}
        <Header theme={theme} setTheme={setTheme} />

        {/* Main Content Layout */}
        <main className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
          {/* Mobile Tab Switcher (< lg screens) */}
          <div className="lg:hidden flex items-center p-1 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6">
            <button
              type="button"
              onClick={() => setMobileTab('pay')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                mobileTab === 'pay'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>01. Pay via UPI</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('qr')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                mobileTab === 'qr'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>02. Scan Terminal</span>
            </button>
          </div>

          {/* Master 12-Column Layout (Clean, Unboxed, Open Lines) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Form Steps (7 cols) */}
            <div className={`space-y-8 ${mobileTab === 'qr' ? 'hidden lg:block lg:col-span-7 xl:col-span-7' : 'lg:col-span-7 xl:col-span-7'}`}>
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

              <UpiActions
                upiUri={upiUri}
                upiId={PAYMENT_CONFIG.upiId}
                onCopyUpi={handleCopyUpi}
                amount={selectedAmount}
                note={note ? `${note}${name ? ` (${name})` : ''}` : ''}
              />

              <PostPaymentNote
                amount={selectedAmount}
                name={name}
                note={note}
              />
            </div>

            {/* Right Column: Precision Terminal (5 cols) */}
            <div className={`space-y-4 lg:col-span-5 xl:col-span-5 lg:sticky lg:top-8 ${mobileTab === 'pay' ? 'hidden lg:block' : 'block'}`}>
              <QrCard
                upiUri={upiUri}
                amount={selectedAmount}
                note={note ? (name ? `${note} (${name})` : note) : (name ? `From ${name}` : '')}
                upiId={PAYMENT_CONFIG.upiId}
                recipientName={PAYMENT_CONFIG.recipientName}
                onCopyUpi={handleCopyUpi}
                resolvedTheme={resolvedTheme}
              />

              {/* Protocol Integrity Badge */}
              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#111111]/50 backdrop-blur-xs flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>NPCI UPI Protocol Live</span>
                </span>
                <span className="text-neutral-400 dark:text-neutral-600">p2p direct</span>
              </div>
            </div>
          </div>

          {/* Full-Width Open Projects & Financial Ledger */}
          <ProjectsShowcase />
        </main>
      </div>

      {/* Sticky Mobile Bar (< lg screens) */}
      <StickyMobileBar
        upiUri={upiUri}
        amount={selectedAmount}
        onCopyUpi={handleCopyUpi}
        upiId={PAYMENT_CONFIG.upiId}
      />

      {/* Pro-Dev Minimal Footer */}
      <footer className="border-t border-black/[0.08] dark:border-neutral-800 py-6 mt-16 bg-white/40 dark:bg-[#0A0A0A]/40 backdrop-blur-md transition-colors font-mono text-xs text-neutral-400 dark:text-neutral-500">
        <div className="max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Advaita Chandra</span>
            <span>•</span>
            <span className="text-[#B8860B] dark:text-[#C2956A]">support.advaitachandra.in</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://advaitachandra.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
            >
              <span>site</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/w1tneess"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 transition-colors"
            >
              <span>github</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            {/* Discreet footer modal trigger */}
            <button
              type="button"
              onClick={() => setIsBadgeModalOpen(true)}
              className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
            >
              embed badge
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
