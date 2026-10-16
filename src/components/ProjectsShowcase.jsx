import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { ExternalLink, Code, Laptop, BookOpen, LineChart, Receipt } from 'lucide-react'

export default function ProjectsShowcase() {
  const getIcon = (type) => {
    switch (type) {
      case 'Website': return <Laptop className="w-3.5 h-3.5" />
      case 'Repository': return <Code className="w-3.5 h-3.5" />
      case 'Research': return <LineChart className="w-3.5 h-3.5" />
      default: return <BookOpen className="w-3.5 h-3.5" />
    }
  }

  return (
    <section className="pt-14 sm:pt-20 border-t border-black/[0.08] dark:border-neutral-800 space-y-16 sm:space-y-20 transition-colors">
      {/* 04: Projects & Research Portfolio Block */}
      <div className="space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-black/[0.08] dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#B8860B] dark:text-[#C2956A]">04</span>
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-bold">
              Projects & Research Portfolio
            </h2>
            <span className="text-neutral-600 dark:text-neutral-400 font-mono text-xs font-medium">/ Index</span>
          </div>
          <span className="text-xs font-mono text-neutral-700 dark:text-neutral-300 font-medium">
            What your Sahyog directly fuels
          </span>
        </div>

        {/* Pro-Dev Project Grid (Clean, Flat, Hairline Dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PAYMENT_CONFIG.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/70 dark:bg-[#111111]/70 backdrop-blur-xs flex flex-col justify-between space-y-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shadow-2xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono">
                    <span className="text-[#B8860B] dark:text-[#C2956A]">{getIcon(proj.type)}</span>
                    <span className="font-bold text-neutral-950 dark:text-neutral-50">{proj.name}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs font-mono">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{proj.status}</span>
                    </span>

                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition-colors p-1"
                        title="Visit link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                  {proj.summary}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {proj.details}
                </p>
              </div>

              {/* Monospace Tech Tags */}
              <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap gap-2">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 05: Operational Ledger (Clean, Monospace, Non-Boxy, Distinct Section) */}
      <div className="space-y-6 sm:space-y-8">
        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/70 dark:bg-[#111111]/70 backdrop-blur-xs space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                Operational Ledger
              </span>
              <span className="text-neutral-600 dark:text-neutral-400 font-mono text-xs font-medium">/ recurring costs</span>
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#B8860B] dark:text-[#C2956A]">
              ~₹1,500/mo baseline
            </span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-mono leading-relaxed max-w-3xl">
            Running these independent tools as a 16-year-old student incurs recurring digital and physical costs without corporate ads or trackers:
          </p>

          {/* Monospace Cost Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
            {PAYMENT_CONFIG.financialBreakdown.map((row) => (
              <div key={row.item} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#0E0E0E]/80 font-mono text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-700 dark:text-neutral-300 font-semibold text-xs truncate pr-1">{row.item}</span>
                  <span className="font-bold text-[#B8860B] dark:text-[#C2956A] shrink-0 text-sm">{row.cost}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{row.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-center justify-between flex-wrap gap-2 border-t border-neutral-200/80 dark:border-neutral-800/80">
            <span>// 100% DIRECT PEER-TO-PEER SETTLEMENT TO <code className="text-[#B8860B] dark:text-[#C2956A] font-bold">advaita@fam</code></span>
            <span className="text-emerald-700 dark:text-emerald-300 font-semibold">0.0% AGGREGATOR COMMISSION</span>
          </div>
        </div>
      </div>
    </section>
  )
}
