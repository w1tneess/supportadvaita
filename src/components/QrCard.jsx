import React, { useState, useEffect } from 'react'
import { generateQrSvg, generateQrPng } from '../lib/qrcode.js'
import { Download, QrCode, ShieldCheck, Check, Copy } from 'lucide-react'

export default function QrCard({ upiUri, amount, note, upiId, recipientName, onCopyUpi, resolvedTheme = 'dark' }) {
  const [svgHtml, setSvgHtml] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  useEffect(() => {
    let isCurrent = true
    generateQrSvg(upiUri, resolvedTheme).then((svg) => {
      if (isCurrent) setSvgHtml(svg)
    })
    return () => {
      isCurrent = false
    }
  }, [upiUri, resolvedTheme])

  const handleDownload = async () => {
    setDownloading(true)
    const pngUrl = await generateQrPng(upiUri, resolvedTheme)
    if (pngUrl) {
      const link = document.createElement('a')
      link.href = pngUrl
      link.download = `paytoadvaita-₹${amount || 'any'}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 2400)
    }
    setDownloading(false)
  }

  const handleCopyUpiId = () => {
    onCopyUpi(upiId)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2200)
  }

  return (
    <div className="p-2 rounded-[2rem] bg-black/[0.03] dark:bg-white/[0.03] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-xl shadow-black/[0.02] dark:shadow-2xl">
      <div className="p-5 sm:p-6 rounded-[calc(2rem-0.5rem)] bg-white dark:bg-[#141311] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden transition-colors">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#B8860B]/10 dark:bg-[#C2956A]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Card Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F8F6F0]">
              Scan with any UPI App
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#6E6E73] dark:text-[#8E8A83] font-mono-code">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
            <span>FamPay Direct</span>
          </div>
        </div>

        {/* QR Code Container with Animated Corner Markers */}
        <div className="flex flex-col items-center">
          <div className="relative p-4 sm:p-5 rounded-2xl bg-[#F7F7F9] dark:bg-[#0F0E0D] border border-black/[0.06] dark:border-white/[0.08] shadow-inner mb-4 transition-colors">
            {/* Subtle corner brackets */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#B8860B] dark:border-[#C2956A] rounded-tl-sm pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#B8860B] dark:border-[#C2956A] rounded-tr-sm pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#B8860B] dark:border-[#C2956A] rounded-bl-sm pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#B8860B] dark:border-[#C2956A] rounded-br-sm pointer-events-none"></div>

            {/* SVG Container */}
            <div
              className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block transition-transform duration-200"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />

            {/* Center Brand Badge over QR with mountain photo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#0F0E0D] border-2 border-[#B8860B] dark:border-[#C2956A] shadow-xl flex items-center justify-center overflow-hidden">
                <img
                  src="/pfp.png"
                  alt="Advaita Chandra"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextElementSibling.style.display = 'block'
                  }}
                />
                <span style={{ display: 'none' }} className="text-xs font-editorial text-[#B8860B] dark:text-[#C2956A] font-bold">
                  AC
                </span>
              </div>
            </div>
          </div>

          {/* Live Transaction Metadata Pill */}
          <div className="w-full bg-[#F2F2F7] dark:bg-[#0C0B0A] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-3.5 mb-4 space-y-1.5 text-xs font-mono-code transition-colors shadow-inner">
            <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#8E8A83]">
              <span>Amount:</span>
              <span className="text-base font-bold text-[#1D1D1F] dark:text-[#F8F6F0]">
                {amount ? `₹${amount}` : 'Any Amount'}
              </span>
            </div>

            <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#8E8A83]">
              <span>Payee:</span>
              <span className="text-[#1D1D1F] dark:text-[#F8F6F0] truncate font-medium">{recipientName}</span>
            </div>

            <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#8E8A83]">
              <span>UPI ID:</span>
              <button
                type="button"
                onClick={handleCopyUpiId}
                className="text-[#B8860B] dark:text-[#C2956A] hover:underline flex items-center gap-1 cursor-pointer font-bold active-press"
                title="Click to copy UPI ID"
              >
                <span>{upiId}</span>
                {copiedId ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3 opacity-70" />
                )}
              </button>
            </div>

            {note && (
              <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#8E8A83] pt-1.5 border-t border-black/[0.06] dark:border-white/[0.06]">
                <span>Note:</span>
                <span className="text-[#B8860B] dark:text-[#C2956A] truncate max-w-[180px] font-medium">{note}</span>
              </div>
            )}
          </div>

          {/* Download QR Button (Button-in-Button Architecture) */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="group w-full py-2.5 pl-4 pr-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.07] dark:hover:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.08] text-xs font-medium text-[#424245] dark:text-[#F8F6F0] flex items-center justify-between transition-all cursor-pointer shadow-sm active-press"
          >
            {downloadSuccess ? (
              <div className="flex items-center gap-2 w-full justify-center py-0.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Saved to Photos/Downloads!</span>
              </div>
            ) : (
              <>
                <span>{downloading ? 'Preparing Image...' : 'Save QR Code Image'}</span>
                <span className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Download className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
