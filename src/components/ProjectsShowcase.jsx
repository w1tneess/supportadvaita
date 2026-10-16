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
    <section className="pt-10 border-t border-black/[0.08] dark:border-neutral-800 space-y-8 transition-colors">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-black/[0.08] dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-[#B8860B] dark:text-[#C2956A]">04</span>
          <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 font-semibold">
            Projects & Research Portfolio
          </h2>
          <span className="text-neutral-400 dark:text-neutral-600 font-mono text-xs">/ Index</span>
        </div>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
          What your Sahyog directly powers
        </span>
      </div>

      {/* Pro-Dev Project Grid (Clean, Flat, Hairline Dividers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAYMENT_CONFIG.projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/50 dark:bg-[#111111]/50 backdrop-blur-xs flex flex-col justify-between space-y-3 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#B8860B] dark:text-[#C2956A]">{getIcon(proj.type)}</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{proj.name}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{proj.status}</span>
                  </span>

                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                      title="Visit link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                {proj.summary}
              </p>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-snug">
                {proj.details}
              </p>
            </div>

            {/* Monospace Tech Tags */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap gap-1.5">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pro-Dev Financial Ledger (Clean, Monospace, Non-Boxy) */}
      <div className="p-5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/50 dark:bg-[#111111]/50 backdrop-blur-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              Operational Ledger
            </span>
            <span className="text-neutral-400 dark:text-neutral-500 font-mono text-xs">/ recurring costs</span>
          </div>
          <span className="font-mono text-xs text-[#B8860B] dark:text-[#C2956A]">
            ~₹1,500/mo baseline
          </span>
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono leading-relaxed">
          Running these independent tools as a 16-year-old student incurs recurring digital and physical costs without corporate ads or trackers:
        </p>

        {/* Monospace Cost Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {PAYMENT_CONFIG.financialBreakdown.map((row) => (
            <div key={row.item} className="p-3 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#0E0E0E]/50 font-mono text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 text-[11px] truncate pr-1">{row.item}</span>
                <span className="font-bold text-[#B8860B] dark:text-[#C2956A] shrink-0">{row.cost}</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-snug">{row.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-2 text-[11px] font-mono text-neutral-400 dark:text-neutral-500 flex items-center justify-between flex-wrap gap-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <span>// 100% DIRECT PEER-TO-PEER SETTLEMENT TO <code className="text-[#B8860B] dark:text-[#C2956A]">advaita@fam</code></span>
          <span className="text-emerald-600 dark:text-emerald-400">0.0% AGGREGATOR COMMISSION</span>
        </div>
      </div>
    </section>
  )
}
