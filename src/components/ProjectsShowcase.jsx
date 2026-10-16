import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { ExternalLink, ArrowUpRight, Code, Laptop, BookOpen, LineChart, Receipt } from 'lucide-react'

export default function ProjectsShowcase({ onOpenBadgeModal }) {
  const getIcon = (type) => {
    switch (type) {
      case 'Website': return <Laptop className="w-4 h-4 text-[#C2956A]" />
      case 'Repository': return <Code className="w-4 h-4 text-[#C2956A]" />
      case 'Research': return <LineChart className="w-4 h-4 text-[#C2956A]" />
      default: return <BookOpen className="w-4 h-4 text-[#C2956A]" />
    }
  }

  return (
    <section className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] space-y-10 transition-colors">
      {/* Real Projects Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1D1D1F] dark:text-[#F8F6F0] tracking-tight">
              What Your Contribution Fuels
            </h2>
            <p className="text-xs text-[#6E6E73] dark:text-[#8E8A83] mt-1">
              Active projects, research platforms, and tools built by Advaita Chandra
            </p>
          </div>

          <button
            onClick={onOpenBadgeModal}
            className="self-start sm:self-auto text-xs font-mono-code text-[#B8860B] dark:text-[#C2956A] hover:opacity-80 flex items-center gap-1 cursor-pointer transition-opacity"
          >
            <span>Get Repo Badges</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Real Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAYMENT_CONFIG.projects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#151412] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 flex flex-col justify-between transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-black/[0.04] dark:bg-[#22201C] transition-colors">
                      {getIcon(proj.type)}
                    </span>
                    <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-md bg-black/[0.03] dark:bg-[#1C1A17] text-[#6E6E73] dark:text-[#8E8A83] border border-black/[0.06] dark:border-white/[0.08]">
                      {proj.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] hover:bg-black/[0.04] dark:hover:bg-[#22201C] transition-colors"
                        title="Visit Live Site / Project"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#1D1D1F] dark:text-[#F8F6F0] mb-1.5">
                  {proj.name}
                </h3>
                <p className="text-xs text-[#424245] dark:text-[#A5A096] leading-relaxed mb-2">
                  {proj.summary}
                </p>
                <p className="text-[11px] text-[#6E6E73] dark:text-[#736F68] leading-relaxed mb-4">
                  {proj.details}
                </p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap gap-1.5">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-black/[0.03] dark:bg-[#1C1A17] text-[#6E6E73] dark:text-[#8E8A83] border border-black/[0.06] dark:border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparent Financial Accounting */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141311] border border-black/[0.08] dark:border-white/[0.08] shadow-sm relative overflow-hidden transition-colors">
        <div className="flex items-center gap-2.5 mb-2">
          <Receipt className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
          <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F8F6F0] uppercase tracking-wider">
            Real Cost Breakdown & Transparency
          </h3>
        </div>
        <p className="text-xs text-[#6E6E73] dark:text-[#8E8A83] leading-relaxed mb-4">
          Running these independent experiments as a 16-year-old student incurs recurring digital and physical costs without corporate sponsorship:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PAYMENT_CONFIG.financialBreakdown.map((row) => (
            <div key={row.item} className="p-3 rounded-xl bg-[#F7F7F9] dark:bg-[#0F0E0D] border border-black/[0.06] dark:border-white/[0.08] space-y-1 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1D1D1F] dark:text-[#F8F6F0] truncate pr-2">{row.item}</span>
                <span className="font-mono-code text-[#B8860B] dark:text-[#C2956A] font-bold shrink-0">{row.cost}</span>
              </div>
              <p className="text-[11px] text-[#6E6E73] dark:text-[#736F68] leading-snug">{row.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-[#86868B] dark:text-[#5A564F] mt-4 font-mono-code">
          * Total recurring baseline: ~₹1,500/month. 100% peer-to-peer funded via FamPay UPI (advaita@fam).
        </p>
      </div>
    </section>
  )
}
