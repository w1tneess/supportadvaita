import React, { useState } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { X, Copy, Check, Sparkles, Terminal, Code2 } from 'lucide-react'

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
      previewBadge: true,
    },
    {
      key: 'html-embed',
      title: 'HTML Website Embed',
      desc: 'Use in website footers, sidebars, or documentation pages',
      code: PAYMENT_CONFIG.embedBadges.html,
      previewBadge: true,
    },
    {
      key: 'badge-url',
      title: 'Raw Shield.io Badge Image URL',
      desc: 'Vector SVG badge URL for any custom markdown setup',
      code: PAYMENT_CONFIG.embedBadges.shieldUrl,
      previewBadge: false,
    },
    {
      key: 'plain-link',
      title: 'Direct Link for Bios & Footers',
      desc: 'Use in your X bio, Instagram link-in-bio, or website footer',
      code: 'https://paytoadvaita.vercel.app',
      previewBadge: false,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#151412] border border-[#2D2A24] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#262421] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#22201C] text-[#C2956A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F8F6F0]">
                Connect to Repositories & Websites
              </h3>
              <p className="text-xs text-[#8E8A83]">
                Copy ready-made badges for your GitHub READMEs & projects
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8E8A83] hover:text-[#F8F6F0] bg-[#1E1D19] hover:bg-[#282621] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Live Badge Preview */}
          <div className="p-3.5 rounded-xl bg-[#0F0E0D] border border-[#262421] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono-code text-[#736F68] block mb-1">Badge Preview:</span>
              <img
                src={PAYMENT_CONFIG.embedBadges.shieldUrl}
                alt="Support via paytoadvaita"
                className="h-7 rounded"
              />
            </div>
            <span className="text-xs text-[#C2956A] font-mono-code">Dark Editorial Theme</span>
          </div>

          {/* Snippets List */}
          {snippets.map((snip) => (
            <div key={snip.key} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#F8F6F0]">{snip.title}</span>
                <button
                  type="button"
                  onClick={() => copySnippet(snip.key, snip.code)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C2956A] hover:text-[#DFC3A5] font-mono-code cursor-pointer"
                >
                  {copiedKey === snip.key ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-[#736F68]">{snip.desc}</p>
              <pre className="p-2.5 rounded-lg bg-[#0F0E0D] border border-[#262421] text-xs font-mono-code text-[#A5A096] overflow-x-auto whitespace-pre-wrap break-all">
                {snip.code}
              </pre>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#11100E] border-t border-[#262421] flex items-center justify-between">
          <p className="text-xs text-[#736F68]">
            Links directly to your standalone <span className="text-[#C2956A]">paytoadvaita</span> page.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#22201C] hover:bg-[#2C2924] text-xs font-medium text-[#F8F6F0] transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
