import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Coffee, BookOpen, Server, Sparkles, GraduationCap, IndianRupee, Plus, RotateCcw } from 'lucide-react'

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
  const usdVal = PAYMENT_CONFIG.inrToUsd(selectedAmount)

  return (
    <div className="space-y-4">
      {/* Header with Monospace Step Indicator & Currency Priority Badge */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-black/[0.08] dark:border-neutral-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs font-bold text-[#B8860B] dark:text-[#C2956A]">01</span>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-semibold">
            Select Contribution
          </span>
          <span className="text-neutral-400 dark:text-neutral-600 font-mono text-xs">/ INR (₹) 1st Priority</span>
        </div>

        {words && (
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            {words}
          </span>
        )}
      </div>

      {/* Pro-Dev Sleek Tier Matrix with Dual-Currency Precision */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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
              className={`relative p-3 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between min-h-[104px] active-press ${
                isSelected
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-xs'
                  : 'bg-transparent hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60 border-neutral-200/90 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100'
              }`}
            >
              {/* Shagun Badge on Popular Tier */}
              {tier.popular && (
                <span className={`absolute -top-2 right-2 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold tracking-tight uppercase ${
                  isSelected
                    ? 'bg-[#B8860B] text-white dark:bg-[#C2956A] dark:text-black'
                    : 'bg-[#B8860B]/15 text-[#B8860B] dark:bg-[#C2956A]/20 dark:text-[#C2956A]'
                }`}>
                  Shagun
                </span>
              )}

              {/* Top Row: Icon + Devanagari Glyph */}
              <div className="flex items-center justify-between w-full">
                <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'opacity-90' : 'text-[#B8860B] dark:text-[#C2956A]'}`} />
                <span className={`font-mono text-[10px] ${isSelected ? 'opacity-70' : 'text-neutral-400 dark:text-neutral-500'}`}>
                  ₹{tier.devanagari}
                </span>
              </div>

              {/* Bottom Row: Primary INR Amount + Global USD Approx + Title */}
              <div className="pt-2">
                <div className="flex items-baseline gap-1.5 leading-tight">
                  <span className="font-mono text-base font-bold tracking-tight">
                    ₹{tier.amount}
                  </span>
                  <span className={`font-mono text-[10.5px] ${isSelected ? 'opacity-70' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    ~{tier.usdApprox}
                  </span>
                </div>
                <div className={`text-[11px] font-medium truncate mt-0.5 ${isSelected ? 'opacity-85' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {tier.label}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Pro-Dev Custom Amount Line with Dual-Currency Context */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500 font-mono text-xs">
            ₹
          </div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="custom amount in INR..."
            value={isCustom ? selectedAmount : ''}
            onFocus={() => setIsCustom(true)}
            onChange={handleCustomChange}
            className="w-full pl-7 pr-16 py-2 bg-transparent border border-neutral-200 dark:border-neutral-800 focus:border-neutral-900 dark:focus:border-white rounded-lg font-mono text-xs text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none transition-colors"
          />
          {selectedAmount > 0 && (
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-neutral-400 font-mono text-[10px]">
              ~${usdVal} USD
            </div>
          )}
        </div>

        {/* Quick Stepper Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-[10px] uppercase text-neutral-400 dark:text-neutral-500 mr-1">
            quick:
          </span>
          {PAYMENT_CONFIG.quickIncrements.map((inc) => (
            <button
              key={inc.label}
              type="button"
              onClick={() => handleIncrement(inc.value)}
              className={`px-2.5 py-1 rounded-md border font-mono text-[11px] transition-colors cursor-pointer active-press ${
                inc.value === 1
                  ? 'border-[#B8860B]/30 dark:border-[#C2956A]/30 text-[#B8860B] dark:text-[#C2956A] hover:bg-[#B8860B]/10'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
              }`}
            >
              +{inc.value === 1 ? '₹1 Shagun' : `₹${inc.value}`}
            </button>
          ))}

          {isCustom && (
            <button
              type="button"
              onClick={() => {
                setIsCustom(false)
                onSelectAmount(101)
              }}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors cursor-pointer"
              title="Reset to ₹101"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
