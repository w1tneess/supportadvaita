import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Coffee, BookOpen, Server, Sparkles, IndianRupee } from 'lucide-react'

export default function AmountSelector({ selectedAmount, onSelectAmount, isCustom, setIsCustom }) {
  const iconMap = {
    Coffee: Coffee,
    BookOpen: BookOpen,
    Server: Server,
    Sparkles: Sparkles,
  }

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    onSelectAmount(val ? parseInt(val, 10) : '')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#8E8A83]">
          1. Choose Contribution Tier
        </label>
        <span className="text-xs text-[#C2956A] font-mono-code">
          100% directly to UPI
        </span>
      </div>

      {/* Preset Tier Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {PAYMENT_CONFIG.tiers.map((tier) => {
          const IconComp = iconMap[tier.icon] || Coffee
          const isSelected = !isCustom && selectedAmount === tier.amount

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                setIsCustom(false)
                onSelectAmount(tier.amount)
              }}
              className={`group relative p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1E1B16] border-[#C2956A] shadow-lg shadow-[#C2956A]/10 ring-1 ring-[#C2956A]'
                  : 'bg-[#151412] hover:bg-[#1A1916] border-[#262421] hover:border-[#38342D]'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded text-[10px] font-mono-code font-medium bg-[#C2956A] text-[#0F0E0D]">
                  Popular
                </span>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className={`p-1.5 rounded-lg ${
                  isSelected ? 'bg-[#C2956A] text-[#0F0E0D]' : 'bg-[#22201C] text-[#C2956A] group-hover:bg-[#2A2722]'
                }`}>
                  <IconComp className="w-4 h-4" />
                </span>
                <span className="text-base font-bold font-mono-code text-[#F8F6F0]">
                  ₹{tier.amount}
                </span>
              </div>

              <div className="text-xs font-semibold text-[#F8F6F0] mb-0.5 truncate">
                {tier.label}
              </div>
              <div className="text-[11px] text-[#7E7A73] leading-snug line-clamp-2">
                {tier.desc}
              </div>
            </button>
          )
        })}
      </div>

      {/* Custom Amount Field */}
      <div className="pt-1">
        <div className={`p-3 rounded-xl border transition-all ${
          isCustom
            ? 'bg-[#1E1B16] border-[#C2956A] ring-1 ring-[#C2956A]'
            : 'bg-[#151412] border-[#262421]'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8E8A83] font-medium">Or enter custom amount:</span>
            </div>

            <div className="relative w-full sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C2956A]">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="e.g. 250"
                value={isCustom ? selectedAmount : ''}
                onFocus={() => setIsCustom(true)}
                onChange={handleCustomChange}
                className="w-full pl-8 pr-3 py-1.5 bg-[#0F0E0D] border border-[#2D2A24] rounded-lg text-sm text-[#F8F6F0] placeholder-[#5A564F] focus:outline-none focus:border-[#C2956A] font-mono-code"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
