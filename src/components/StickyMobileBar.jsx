import React from 'react'
import { Smartphone, Copy, Check } from 'lucide-react'

export default function StickyMobileBar({ upiUri, amount, onCopyUpi, upiId }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(40) } catch {}
    }
    onCopyUpi(upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePay = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(40) } catch {}
    }
  }

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#151412]/95 backdrop-blur-md border-t border-[#2D2A24] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Current Amount Display */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-[#8E8A83] font-semibold">Total</span>
          <span className="text-lg font-bold font-mono-code text-[#F8F6F0]">
            ₹{amount || '0'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleCopy}
            className="p-3 rounded-xl bg-[#22201C] hover:bg-[#2A2722] border border-[#2D2A24] text-[#F8F6F0] flex items-center justify-center transition-colors cursor-pointer"
            title="Copy UPI ID"
            aria-label="Copy UPI ID"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-[#C2956A]" />
            )}
          </button>

          <a
            href={upiUri}
            onClick={handlePay}
            className="flex-1 max-w-[220px] py-3 px-4 rounded-xl bg-gradient-to-r from-[#C2956A] to-[#B38355] text-[#0F0E0D] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C2956A]/20 transition-transform active:scale-[0.98]"
          >
            <Smartphone className="w-4 h-4" />
            <span>Pay with UPI</span>
          </a>
        </div>
      </div>
    </div>
  )
}
