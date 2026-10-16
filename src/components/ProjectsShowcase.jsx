import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { ExternalLink, ArrowUpRight, Code, Laptop, BookOpen, LineChart, Receipt, Sparkles } from 'lucide-react'

export default function ProjectsShowcase({ onOpenBadgeModal }) {
  const getIcon = (type) => {
    switch (type) {
      case 'Website': return <Laptop className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
      case 'Repository': return <Code className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
      case 'Research': return <LineChart className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
      default: return <BookOpen className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
    }
  }

  return (
    <section className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] space-y-12 transition-colors">
      {/* Real Projects Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B]/10 dark:bg-[#C2956A]/10 border border-[#B8860B]/20 dark:border-[#C2956A]/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] dark:bg-[#C2956A]"></span>
              <span className="text-[9px] font-mono-code font-bold uppercase tracking-[0.2em] text-[#B8860B] dark:text-[#C2956A]">
                Independent Research & Software
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] dark:text-[#F8F6F0] tracking-tight">
              What Your Contribution Fuels
            </h2>
            <p className="text-xs text-[#6E6E73] dark:text-[#8E8A83] mt-1">
              Real projects, evidence archives, and utilities built and maintained by Advaita
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBadgeModal}
            className="group self-start sm:self-auto inline-flex items-center gap-2 pl-3 pr-1 py-1 rounded-full text-xs font-mono-code text-[#1D1D1F] dark:text-[#F8F6F0] bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.08] transition-all cursor-pointer shadow-sm active-press"
          >
            <span>Get Badges</span>
            <span className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:translate-x-0.5">
              <ArrowUpRight className="w-3 h-3 text-[#B8860B] dark:text-[#C2956A]" />
            </span>
          </button>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAYMENT_CONFIG.projects.map((proj, idx) => {
            const isFeatured = idx === 0

            return (
              <div
                key={proj.id}
                className={`p-1.5 rounded-[24px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08] ${
                  isFeatured ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <div className="h-full p-5 rounded-[calc(24px-0.375rem)] bg-white dark:bg-[#151412] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] flex flex-col justify-between transition-all hover:shadow-md">
                  <div>
                    {/* Header Row: Category Badge + Status + Link */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center">
                          {getIcon(proj.type)}
                        </span>
                        <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] text-[#6E6E73] dark:text-[#8E8A83] border border-black/[0.06] dark:border-white/[0.08]">
                          {proj.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono-code text-emerald-600 dark:text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>{proj.status}</span>
                        </span>

                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] dark:hover:bg-white/[0.1] text-[#6E6E73] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] transition-colors active-press"
                            title="Visit Project Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1D1D1F] dark:text-[#F8F6F0] mb-1.5">
                      {proj.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#424245] dark:text-[#A5A096] leading-relaxed mb-2 font-normal">
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
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] text-[#6E6E73] dark:text-[#8E8A83] border border-black/[0.05] dark:border-white/[0.06]"
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
      </div>

      {/* Transparent Financial Accounting with Visual Allocation Bar (Double-Bezel) */}
      <div className="p-2 rounded-[26px] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.05] dark:ring-white/[0.08]">
        <div className="p-5 sm:p-6 rounded-[calc(26px-0.5rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] relative overflow-hidden transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
            <h3 className="text-sm font-bold text-[#1D1D1F] dark:text-[#F8F6F0] uppercase tracking-wider">
              Real Financial Accounting & Transparency
            </h3>
          </div>
          <p className="text-xs text-[#6E6E73] dark:text-[#8E8A83] leading-relaxed mb-4">
            Running these independent projects as a 16-year-old student incurs recurring digital and physical costs without corporate backing:
          </p>

          {/* Visual Progress Breakdown Bar */}
          <div className="mb-5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono-code text-[#6E6E73] dark:text-[#8E8A83]">
              <span>Monthly Allocation Ratio (~₹1,500 baseline)</span>
              <span className="text-[#B8860B] dark:text-[#C2956A] font-bold">100% Peer-to-Peer</span>
            </div>
            <div className="h-2 w-full rounded-full bg-black/[0.05] dark:bg-white/[0.08] overflow-hidden flex">
              <div className="h-full bg-[#B8860B] dark:bg-[#C2956A]" style={{ width: '33%' }} title="Cloud Servers (33%)"></div>
              <div className="h-full bg-[#D4A373]" style={{ width: '27%' }} title="Books & Literature (27%)"></div>
              <div className="h-full bg-[#A98467]" style={{ width: '20%' }} title="Photography & Storage (20%)"></div>
              <div className="h-full bg-[#6C584C]" style={{ width: '20%' }} title="Domains & Uptime (20%)"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAYMENT_CONFIG.financialBreakdown.map((row) => (
              <div key={row.item} className="p-3 rounded-xl bg-[#F7F7F9] dark:bg-[#0F0E0D] border border-black/[0.06] dark:border-white/[0.06] space-y-1 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1D1D1F] dark:text-[#F8F6F0] truncate pr-2">{row.item}</span>
                  <span className="font-mono-code text-[#B8860B] dark:text-[#C2956A] font-bold shrink-0">{row.cost}</span>
                </div>
                <p className="text-[11px] text-[#6E6E73] dark:text-[#736F68] leading-snug">{row.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-[#86868B] dark:text-[#5A564F] mt-4 font-mono-code">
            * Baseline: ~₹1,500/month. 100% direct settlement to FamPay UPI (<code className="text-[#B8860B] dark:text-[#C2956A]">advaita@fam</code>).
          </p>
        </div>
      </div>
    </section>
  )
}
