import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { Globe, Github, Twitter, Instagram, Sparkles, ShieldCheck, MapPin, GraduationCap } from 'lucide-react'

export default function Header({ onOpenBadgeModal }) {
  const [imgError, setImgError] = useState(false)

  const iconMap = {
    Globe: Globe,
    Github: Github,
    Twitter: Twitter,
    Instagram: Instagram,
  }

  return (
    <header className="pt-8 sm:pt-10 pb-6 border-b border-[#262421]/60">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Status & Fast Links */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181714] border border-[#2D2A24] text-xs text-[#C2956A]">
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
            <span>Badges & Embeds</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#151412] border border-[#3A3630] flex items-center justify-center shadow-xl shadow-black/50">
                {!imgError ? (
                  <img
                    src={PAYMENT_CONFIG.avatar}
                    alt={PAYMENT_CONFIG.recipientName}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-editorial text-[#C2956A]">AC</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-[#0F0E0D] rounded-full">
                <div className="bg-[#C2956A] text-[#0F0E0D] p-0.5 rounded-full" title="Verified Peer-to-Peer UPI">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F8F6F0]">
                  {PAYMENT_CONFIG.recipientName}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[#22201C] text-[#8E8A83] font-mono-code">
                  {PAYMENT_CONFIG.nickname}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#8E8A83] mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C2956A]" />
                  <span>{PAYMENT_CONFIG.grade} • {PAYMENT_CONFIG.age}yo</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#736F68]" />
                  <span>{PAYMENT_CONFIG.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {PAYMENT_CONFIG.socials.map((soc) => {
              const IconComp = iconMap[soc.icon] || Globe
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#151412] hover:bg-[#201E1A] border border-[#262421] hover:border-[#38342D] text-[#8E8A83] hover:text-[#F8F6F0] transition-colors"
                  aria-label={soc.name}
                  title={`${soc.name}: ${soc.handle}`}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* Authentic Statement & Bio */}
        <p className="text-sm sm:text-[14.5px] text-[#A5A096] leading-relaxed max-w-2xl">
          {PAYMENT_CONFIG.bio}
        </p>

        <p className="text-xs text-[#7E7A73] leading-relaxed mt-2 max-w-2xl">
          {PAYMENT_CONFIG.subBio}
        </p>

        {/* Epistemic Quote Banner */}
        <div className="mt-5 p-4 rounded-xl bg-[#141311] border border-[#262421] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2956A]/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <span className="font-editorial text-base sm:text-lg italic text-[#C2956A] leading-snug">
              "{PAYMENT_CONFIG.quote.text}"
            </span>
            <span className="text-[11px] text-[#8E8A83] font-mono-code shrink-0">
              — {PAYMENT_CONFIG.quote.author}
            </span>
          </div>
          <p className="text-[11px] text-[#5A564F] mt-1.5 font-mono-code">
            {PAYMENT_CONFIG.quote.note}
          </p>
        </div>
      </div>
    </header>
  )
}
