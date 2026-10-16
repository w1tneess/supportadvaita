import React from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Globe, Github, Twitter, Instagram, Sparkles, ShieldCheck } from 'lucide-react'

export default function Header({ onOpenBadgeModal }) {
  const iconMap = {
    Globe: Globe,
    Github: Github,
    Twitter: Twitter,
    Instagram: Instagram,
  }

  return (
    <header className="pt-8 pb-6 border-b border-[#262421]/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top bar with status and badge trigger */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1916] border border-[#2D2A24] text-xs text-[#C2956A]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2956A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C2956A]"></span>
            </span>
            <span className="font-mono-code font-medium tracking-tight">advaita@fam • FamPay Direct</span>
          </div>

          <button
            onClick={onOpenBadgeModal}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#8E8A83] hover:text-[#F8F6F0] bg-[#151412] hover:bg-[#1E1D19] border border-[#262421] transition-all cursor-pointer"
            title="Get badges to link from your GitHub repositories & website"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C2956A]" />
            <span>Link to Repos / Badges</span>
          </button>
        </div>

        {/* Profile & Identity */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#262421] to-[#151412] border border-[#3A3630] flex items-center justify-center text-2xl font-editorial text-[#C2956A] shadow-xl shadow-black/40">
                <span>AC</span>
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-[#0F0E0D] rounded-full">
                <div className="bg-[#C2956A] text-[#0F0E0D] p-0.5 rounded-full" title="Verified UPI">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8F6F0]">
                  Advaita Chandra
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#22201C] text-[#8E8A83] font-mono-code">
                  Wit
                </span>
              </div>
              <p className="text-sm text-[#C2956A] font-mono-code mt-0.5">
                paytoadvaita
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {PAYMENT_CONFIG.socials.map((soc) => {
              const IconComp = iconMap[soc.icon] || Globe
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#151412] hover:bg-[#201E1A] border border-[#262421] hover:border-[#3A3630] text-[#8E8A83] hover:text-[#F8F6F0] transition-colors"
                  aria-label={soc.name}
                  title={`${soc.name}: ${soc.handle}`}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-[15px] text-[#A5A096] leading-relaxed max-w-2xl">
          {PAYMENT_CONFIG.bio}
        </p>

        {/* Editorial Quote Banner */}
        <div className="mt-5 p-4 rounded-xl bg-[#141311] border border-[#262421]/80 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2956A]/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-baseline gap-2">
            <span className="font-editorial text-lg italic text-[#C2956A]">
              "{PAYMENT_CONFIG.quote.text}"
            </span>
            <span className="text-xs text-[#8E8A83] font-mono-code">
              — {PAYMENT_CONFIG.quote.author}
            </span>
          </div>
          <p className="text-xs text-[#736F68] mt-1">
            {PAYMENT_CONFIG.quote.subtext}
          </p>
        </div>
      </div>
    </header>
  )
}
