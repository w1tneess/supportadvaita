import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { ExternalLink, Code, Laptop, BookOpen, LineChart, Receipt } from 'lucide-react'

export default function ProjectsShowcase() {
  const getIcon = (type) => {
    switch (type) {
      case 'Website': return <Laptop className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
      case 'Repository': return <Code className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
      case 'Research': return <LineChart className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
      default: return <BookOpen className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
    }
  }

  return (
    <section className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] space-y-10 transition-colors">
      {/* Clean Section Header (No badge button clutter) */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/10 border border-[#B8860B]/20 dark:border-[#C2956A]/20 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
          <span className="text-[9.5px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#B8860B] dark:text-[#C2956A]">
            Open Research & Software Portfolio
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1D1D1F] dark:text-[#F8F6F0] tracking-tight">
          What Your Contribution Fuels
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#8E8A83] mt-1">
          Independent software, epistemological archives, and utilities built and maintained by Advaita
        </p>
      </div>

      {/* Responsive Bento Grid: 2 columns on tablet and desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {PAYMENT_CONFIG.projects.map((proj) => {
          return (
            <div
              key={proj.id}
              className="p-1.5 sm:p-2 rounded-[28px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm flex flex-col"
            >
              <div className="h-full p-5 sm:p-6 rounded-[calc(28px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col justify-between transition-all hover:shadow-md">
                <div className="space-y-3">
                  {/* Category + Status + External Link Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-black/[0.04] dark:bg-[#22201C] flex items-center justify-center">
                        {getIcon(proj.type)}
                      </span>
                      <span className="text-[11px] font-mono-code px-2.5 py-1 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] text-[#6E6E73] dark:text-[#8E8A83] border border-black/[0.06] dark:border-white/[0.08]">
                        {proj.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-600 dark:text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{proj.status}</span>
                      </span>

                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-colors active-press"
                          title="Visit Project"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#1D1D1F] dark:text-[#F8F6F0]">
                    {proj.name}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] text-[#424245] dark:text-[#A5A096] leading-relaxed font-normal">
                    {proj.summary}
                  </p>

                  <p className="text-[11.5px] text-[#6E6E73] dark:text-[#7E7A73] leading-relaxed">
                    {proj.details}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 mt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono-code px-2.5 py-0.5 rounded-md bg-black/[0.03] dark:bg-white/[0.04] text-[#6E6E73] dark:text-[#8E8A83] border border-black/[0.05] dark:border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Transparent Financial Accounting & Allocation Bar */}
      <div className="p-1.5 sm:p-2 rounded-[32px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-sm">
        <div className="p-6 sm:p-8 rounded-[calc(32px-0.375rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden transition-colors space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/[0.05] dark:border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <Receipt className="w-5 h-5 text-[#B8860B] dark:text-[#C2956A]" />
              <h3 className="text-sm sm:text-base font-bold text-[#1D1D1F] dark:text-[#F8F6F0] uppercase tracking-wider font-mono-code">
                Real Financial Accounting & Open Costs
              </h3>
            </div>
            <span className="text-xs font-mono-code text-[#B8860B] dark:text-[#C2956A] font-bold">
              Baseline: ~₹1,500 / month
            </span>
          </div>

          <p className="text-xs sm:text-[13px] text-[#6E6E73] dark:text-[#8E8A83] leading-relaxed max-w-3xl">
            Operating these independent tools, writing essays, and archiving historical evidence as a 16-year-old student incurs recurring digital and physical costs without corporate sponsorship:
          </p>

          {/* Visual Progress Breakdown Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-code text-[#6E6E73] dark:text-[#8E8A83]">
              <span>Monthly Allocation Ratio</span>
              <span className="text-[#B8860B] dark:text-[#C2956A] font-bold">100% Direct P2P</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-black/[0.05] dark:bg-white/[0.08] overflow-hidden flex">
              <div className="h-full bg-[#B8860B] dark:bg-[#C2956A]" style={{ width: '33%' }} title="Cloud Servers (33%)"></div>
              <div className="h-full bg-[#D4A373]" style={{ width: '27%' }} title="Philosophy & CS Books (27%)"></div>
              <div className="h-full bg-[#A98467]" style={{ width: '20%' }} title="Photography & Storage (20%)"></div>
              <div className="h-full bg-[#6C584C]" style={{ width: '20%' }} title="Canonical Domains & Uptime (20%)"></div>
            </div>
          </div>

          {/* 4 Cost Breakdown Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {PAYMENT_CONFIG.financialBreakdown.map((row) => (
              <div
                key={row.item}
                className="p-3.5 rounded-2xl bg-[#F8F8FA] dark:bg-[#181714] border border-black/[0.06] dark:border-white/[0.06] space-y-1.5 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1D1D1F] dark:text-[#F8F6F0] truncate pr-2">{row.item}</span>
                  <span className="font-mono-code text-[#B8860B] dark:text-[#C2956A] font-extrabold shrink-0">{row.cost}</span>
                </div>
                <p className="text-[11px] text-[#6E6E73] dark:text-[#8E8A83] leading-snug">{row.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs font-mono-code text-[#86868B] dark:text-[#736F68] flex items-center justify-between flex-wrap gap-2">
            <span>* 100% direct peer-to-peer settlement to UPI VPA: <strong className="text-[#B8860B] dark:text-[#C2956A]">advaita@fam</strong></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Zero Commission Intermediaries</span>
          </div>
        </div>
      </div>
    </section>
  )
}
