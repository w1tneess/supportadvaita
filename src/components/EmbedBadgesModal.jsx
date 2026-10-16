import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { X, Copy, Check, Sparkles } from 'lucide-react'

export default function EmbedBadgesModal({ isOpen, onClose, onCopy }) {
  const [copiedKey, setCopiedKey] = useState(null)

  if (!isOpen) return null

  const copySnippet = (key, text) => {
    onCopy(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const snippets = [
    {
      key: 'readme-md',
      title: 'GitHub README.md Badge (Recommended)',
      desc: 'Paste this into your repositories (declutter, osho-documentary) at the top or bottom of README.md',
      code: PAYMENT_CONFIG.embedBadges.markdown,
    },
    {
      key: 'html-embed',
      title: 'HTML Website Embed',
      desc: 'Use in website footers, sidebars, or documentation pages',
      code: PAYMENT_CONFIG.embedBadges.html,
    },
    {
      key: 'badge-url',
      title: 'Raw Shield.io Badge Image URL',
      desc: 'Vector SVG badge URL for any custom markdown setup',
      code: PAYMENT_CONFIG.embedBadges.shieldUrl,
    },
    {
      key: 'plain-link',
      title: 'Direct Link for Bios & Footers',
      desc: 'Use in your X bio, Instagram link-in-bio, or website footer',
      code: 'https://support.advaitachandra.in',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#151412] border border-black/[0.1] dark:border-white/[0.1] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors">
        {/* Modal Header */}
        <div className="p-5 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-black/[0.04] dark:bg-[#22201C] text-[#B8860B] dark:text-[#C2956A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1D1D1F] dark:text-[#F8F6F0]">
                Connect to Repositories & Websites
              </h3>
              <p className="text-xs text-[#86868B] dark:text-[#8E8A83]">
                Copy ready-made badges linking to <strong className="font-mono-code text-[#B8860B] dark:text-[#C2956A]">support.advaitachandra.in</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#86868B] dark:text-[#8E8A83] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] bg-black/[0.04] dark:bg-[#1E1D19] hover:bg-black/[0.08] dark:hover:bg-[#282621] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Live Badge Preview */}
          <div className="p-4 rounded-2xl bg-[#F7F7F9] dark:bg-[#0F0E0D] border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono-code text-[#86868B] dark:text-[#736F68] block mb-1.5">Official Badge:</span>
              <img
                src={PAYMENT_CONFIG.embedBadges.shieldUrl}
                alt="Support via paytoadvaita"
                className="h-7 rounded"
              />
            </div>
            <span className="text-xs text-[#B8860B] dark:text-[#C2956A] font-mono-code font-medium">Auto-Themed</span>
          </div>

          {/* Snippets List */}
          {snippets.map((snip) => (
            <div key={snip.key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1D1D1F] dark:text-[#F8F6F0]">{snip.title}</span>
                <button
                  type="button"
                  onClick={() => copySnippet(snip.key, snip.code)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#B8860B] dark:text-[#C2956A] hover:opacity-80 font-mono-code cursor-pointer font-medium"
                >
                  {copiedKey === snip.key ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#86868B] dark:text-[#736F68]">{snip.desc}</p>
              <pre className="p-3 rounded-xl bg-[#F2F2F7] dark:bg-[#0F0E0D] border border-black/[0.06] dark:border-white/[0.08] text-xs font-mono-code text-[#424245] dark:text-[#A5A096] overflow-x-auto whitespace-pre-wrap break-all shadow-inner">
                {snip.code}
              </pre>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FBFBFD] dark:bg-[#11100E] border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
          <p className="text-xs text-[#86868B] dark:text-[#736F68]">
            Links directly to <span className="text-[#B8860B] dark:text-[#C2956A] font-mono-code">support.advaitachandra.in</span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1D1D1F] dark:bg-[#22201C] hover:opacity-90 text-xs font-medium text-white dark:text-[#F8F6F0] transition-colors cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
