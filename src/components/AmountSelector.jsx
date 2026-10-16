import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Coffee, BookOpen, Server, Sparkles, GraduationCap, IndianRupee, Plus, RotateCcw, Check } from 'lucide-react'

export default function AmountSelector({ selectedAmount, onSelectAmount, isCustom, setIsCustom }) {
  const iconMap = {
    Coffee: Coffee,
    BookOpen: BookOpen,
    Server: Server,
    Sparkles: Sparkles,
    GraduationCap: GraduationCap,
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
    <div className="p-1.5 sm:p-2 rounded-[28px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
      <div className="p-5 sm:p-6 rounded-[calc(28px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-5 transition-colors">
        {/* Step Header & Live Words */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-black/[0.05] dark:border-white/[0.06]">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
            <span className="text-xs font-mono-code font-bold uppercase tracking-[0.15em] text-[#B8860B] dark:text-[#C2956A]">
              Step 01 • Select Sahyog (सहयोग) / Shagun
            </span>
          </div>

          {words && (
            <span className="text-xs font-mono-code text-[#B8860B] dark:text-[#C2956A] font-semibold tracking-tight">
              {words}
            </span>
          )}
        </div>

        {/* Generous 5-Card Grid for Sahyog & Shagun Tiers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PAYMENT_CONFIG.tiers.map((tier) => {
            const IconComp = iconMap[tier.icon] || Coffee
            const isSelected = !isCustom && Number(selectedAmount) === tier.amount

            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => {
                  setIsCustom(false)
                  onSelectAmount(tier.amount)
                }}
                className={`group relative p-3.5 sm:p-4 rounded-2xl text-left transition-all cursor-pointer min-h-[140px] flex flex-col justify-between active-press ${
                  isSelected
                    ? 'bg-[#FAF6F0] dark:bg-[#1E1B16] border-2 border-[#C2956A] shadow-md shadow-[#C2956A]/15 ring-2 ring-[#C2956A]/20'
                    : 'bg-[#F9F9FB] dark:bg-[#181714] hover:bg-[#F2F2F5] dark:hover:bg-[#201E1A] border border-black/[0.06] dark:border-white/[0.08] shadow-xs'
                }`}
              >
                {/* Popular / Shagun Badge */}
                {tier.popular && (
                  <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D] shadow-sm tracking-wider uppercase">
                    {tier.tag || 'शुभ शगुन'}
                  </span>
                )}

                {/* Top Row: Icon + Devanagari Glyph */}
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isSelected
                        ? 'bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D] shadow-xs'
                        : 'bg-black/[0.04] dark:bg-[#24221E] text-[#B8860B] dark:text-[#C2956A]'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </span>

                  <span className="text-xs font-mono-code font-bold text-[#86868B] dark:text-[#736F68]">
                    ₹{tier.devanagari}
                  </span>
                </div>

                {/* Bottom Row: Amount & Descriptions */}
                <div className="space-y-0.5 pt-2">
                  <div className="text-lg sm:text-xl font-bold font-mono-code text-[#1D1D1F] dark:text-[#F8F6F0] leading-tight">
                    ₹{tier.amount}
                  </div>
                  <div className="text-[11px] font-bold text-[#B8860B] dark:text-[#C2956A] leading-tight">
                    {tier.hindiName}
                  </div>
                  <div className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F8F6F0] truncate">
                    {tier.label}
                  </div>
                  <div className="text-[10px] text-[#6E6E73] dark:text-[#8E8A83] leading-snug line-clamp-2 pt-0.5">
                    {tier.desc}
                  </div>
                </div>

                {/* Selected Indicator Checkmark */}
                {isSelected && (
                  <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-[#B8860B] dark:bg-[#C2956A] text-white dark:text-[#0F0E0D] flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Custom Amount & Quick Increment Bar */}
        <div className="p-4 rounded-2xl bg-[#F8F8FA] dark:bg-[#100F0D] border border-black/[0.06] dark:border-white/[0.08] space-y-3.5 shadow-inner">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs sm:text-[13px] font-bold text-[#1D1D1F] dark:text-[#F8F6F0] block">
                Custom Amount / Shagun:
              </span>
              <span className="text-[11px] text-[#86868B] dark:text-[#736F68]">
                Contribute any specific amount or add auspicious ₹1 Shagun
              </span>
            </div>

            <div className="relative flex-1 sm:max-w-[240px]">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#B8860B] dark:text-[#C2956A]">
                <IndianRupee className="w-4 h-4" />
              </div>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="e.g. 101, 251, 501"
                value={isCustom ? selectedAmount : ''}
                onFocus={() => setIsCustom(true)}
                onChange={handleCustomChange}
                className="w-full pl-9 pr-3.5 py-2.5 bg-white dark:bg-[#181714] border border-black/[0.08] dark:border-white/[0.1] focus:border-[#C2956A] focus:ring-2 focus:ring-[#C2956A]/20 rounded-xl text-sm font-mono-code font-bold text-[#1D1D1F] dark:text-[#F8F6F0] placeholder-[#86868B] dark:placeholder-[#5A564F] focus:outline-none transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Quick Increment Steppers */}
          <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.06] dark:border-white/[0.06] flex-wrap gap-2">
            <span className="text-xs font-mono-code text-[#86868B] dark:text-[#736F68]">
              Quick Adders:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {PAYMENT_CONFIG.quickIncrements.map((inc) => (
                <button
                  key={inc.label}
                  type="button"
                  onClick={() => handleIncrement(inc.value)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono-code flex items-center gap-1 transition-all cursor-pointer active-press ${
                    inc.value === 1
                      ? 'bg-[#B8860B]/10 dark:bg-[#C2956A]/15 text-[#B8860B] dark:text-[#C2956A] border-[#B8860B]/30 dark:border-[#C2956A]/30 font-bold shadow-xs'
                      : 'bg-white dark:bg-[#1B1A17] hover:bg-black/[0.03] dark:hover:bg-[#25231F] border-black/[0.08] dark:border-white/[0.08] text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0]'
                  }`}
                  title={inc.value === 1 ? 'Add ₹1 traditional Shagun' : `Add ₹${inc.value}`}
                >
                  <Plus className="w-3 h-3 text-[#B8860B] dark:text-[#C2956A]" />
                  <span>{inc.label}</span>
                </button>
              ))}

              {isCustom && (
                <button
                  type="button"
                  onClick={() => {
                    setIsCustom(false)
                    onSelectAmount(101)
                  }}
                  className="p-1.5 rounded-xl text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] bg-white dark:bg-[#1B1A17] border border-black/[0.08] dark:border-white/[0.08] transition-colors cursor-pointer active-press"
                  title="Reset to default ₹101 (Kitab Sahyog)"
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
