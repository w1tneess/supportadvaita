import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Coffee, BookOpen, Server, Sparkles, IndianRupee, Plus, RotateCcw } from 'lucide-react'

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

  const handleIncrement = (inc) => {
    setIsCustom(true)
    const current = Number(selectedAmount) || 0
    onSelectAmount(current + inc)
  }

  const words = PAYMENT_CONFIG.numberToRupeeWords(selectedAmount)

  return (
    <div className="space-y-4">
      {/* Eyebrow Label & Live Words */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/10 border border-[#B8860B]/20 dark:border-[#C2956A]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
          <span className="text-[9px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#B8860B] dark:text-[#C2956A]">
            Step 01 • Select Contribution Amount
          </span>
        </div>

        {words && (
          <span className="text-[11px] font-mono-code text-[#B8860B] dark:text-[#C2956A] font-semibold tracking-tight transition-all">
            {words}
          </span>
        )}
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
              className={`group relative p-3 sm:p-3.5 rounded-[20px] text-left transition-all cursor-pointer min-h-[110px] flex flex-col justify-between active-press ${
                isSelected
                  ? 'bg-[#FAF6F0] dark:bg-[#1E1B16] border-2 border-[#C2956A] shadow-md shadow-[#C2956A]/15 ring-2 ring-[#C2956A]/30'
                  : 'bg-white dark:bg-[#151412] hover:bg-black/[0.02] dark:hover:bg-[#1C1A17] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 shadow-sm'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono-code font-bold bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D] shadow-sm tracking-wider uppercase">
                  Popular
                </span>
              )}

              <div className="flex items-center justify-between w-full mb-1.5">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isSelected 
                    ? 'bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D]' 
                    : 'bg-black/[0.04] dark:bg-[#22201C] text-[#B8860B] dark:text-[#C2956A]'
                }`}>
                  <IconComp className="w-4 h-4" />
                </span>
                <span className="text-base sm:text-lg font-bold font-mono-code text-[#1D1D1F] dark:text-[#F8F6F0]">
                  ₹{tier.amount}
                </span>
              </div>

              <div>
                <div className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F8F6F0] mb-0.5 truncate">
                  {tier.label}
                </div>
                <div className="text-[11px] text-[#6E6E73] dark:text-[#7E7A73] leading-snug line-clamp-1">
                  {tier.desc}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Custom Amount + Quick Increment Row (Double-Bezel Architecture) */}
      <div className="p-1.5 rounded-[22px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
        <div className="p-3.5 sm:p-4 rounded-[calc(22px-0.375rem)] bg-white dark:bg-[#151412] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] space-y-3 transition-colors">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <span className="text-xs text-[#424245] dark:text-[#A5A096] font-medium">Or enter custom amount (₹):</span>

            <div className="relative flex-1 sm:max-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#B8860B] dark:text-[#C2956A]">
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
                className="w-full pl-8 pr-3 py-2 bg-[#F2F2F7] dark:bg-[#0C0B0A] border border-black/[0.08] dark:border-white/[0.08] focus:border-[#C2956A] focus:ring-2 focus:ring-[#C2956A]/20 rounded-xl text-sm font-mono-code text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Quick Adders for Easy Mobile Tapping */}
          <div className="flex items-center justify-between pt-2 border-t border-black/[0.05] dark:border-white/[0.06]">
            <span className="text-[11px] text-[#86868B] dark:text-[#736F68]">Quick add:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {PAYMENT_CONFIG.quickIncrements.map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => handleIncrement(inc)}
                  className="px-2.5 py-1 rounded-lg bg-black/[0.04] dark:bg-[#1E1D19] hover:bg-black/[0.08] dark:hover:bg-[#282621] border border-black/[0.06] dark:border-[#2D2A24] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center gap-0.5 transition-colors cursor-pointer active-press"
                >
                  <Plus className="w-3 h-3 text-[#B8860B] dark:text-[#C2956A]" />
                  <span>₹{inc}</span>
                </button>
              ))}
              {isCustom && (
                <button
                  type="button"
                  onClick={() => {
                    setIsCustom(false)
                    onSelectAmount(150)
                  }}
                  className="p-1 rounded-lg text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-colors cursor-pointer active-press"
                  title="Reset to default ₹150"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
