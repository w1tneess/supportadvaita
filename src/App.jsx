import React, { useState, useMemo } from 'react'
import { PAYMENT_CONFIG } from './config/payment.js'
import Header from './components/Header.jsx'
import AmountSelector from './components/AmountSelector.jsx'
import NoteField from './components/NoteField.jsx'
import QrCard from './components/QrCard.jsx'
import UpiActions from './components/UpiActions.jsx'
import ProjectsShowcase from './components/ProjectsShowcase.jsx'
import EmbedBadgesModal from './components/EmbedBadgesModal.jsx'
import Toast from './components/Toast.jsx'
import { Heart, ShieldCheck, ArrowUpRight } from 'lucide-react'

export default function App() {
  const [selectedAmount, setSelectedAmount] = useState(150)
  const [isCustom, setIsCustom] = useState(false)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = (msg) => {
    setToastMessage(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2400)
  }

  const handleCopyUpi = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(`Copied ${textToCopy} to clipboard!`)
    }).catch(() => {
      showToast(`Copied to clipboard`)
    })
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
    <div className="min-h-dvh flex flex-col justify-between bg-[#0F0E0D] text-[#F8F6F0]">
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
        <Header onOpenBadgeModal={() => setIsBadgeModalOpen(true)} />

        {/* Payment & Content Workspace */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Tiers, Custom Input & Note */}
            <div className="lg:col-span-7 space-y-6">
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

              {/* Mobile-friendly Actions (visible on mobile / below fields) */}
              <div className="pt-2">
                <UpiActions
                  upiUri={upiUri}
                  upiId={PAYMENT_CONFIG.upiId}
                  onCopyUpi={handleCopyUpi}
                  amount={selectedAmount}
                />
              </div>

              {/* Trust & Transparency Note */}
              <div className="p-3.5 rounded-xl bg-[#141311] border border-[#22201C] text-xs text-[#8E8A83] leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C2956A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#F8F6F0]">Direct Peer-to-Peer: </span>
                  No intermediaries, no 5-10% gateway commissions. 100% of your contribution lands in Advaita's FamPay account to fund domains, server compute, books, and code.
                </div>
              </div>
            </div>

            {/* Right Column: Live Dynamic QR Code Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-8">
              <QrCard
                upiUri={upiUri}
                amount={selectedAmount}
                note={note ? (name ? `${note} (${name})` : note) : (name ? `From ${name}` : '')}
                upiId={PAYMENT_CONFIG.upiId}
                recipientName={PAYMENT_CONFIG.recipientName}
                onCopyUpi={handleCopyUpi}
              />
            </div>
          </div>

          {/* Connected Projects Showcase */}
          <ProjectsShowcase onOpenBadgeModal={() => setIsBadgeModalOpen(true)} />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#262421]/60 py-8 mt-12 bg-[#0C0B0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736F68]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Advaita Chandra</span>
            <span>•</span>
            <span className="font-mono-code text-[#C2956A]">paytoadvaita</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://advaitachandra.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8F6F0] flex items-center gap-1 transition-colors"
            >
              <span>advaitachandra.in</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/w1tneess"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F8F6F0] flex items-center gap-1 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsBadgeModalOpen(true)}
              className="text-[#C2956A] hover:underline cursor-pointer"
            >
              Get Badges
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
