import React, { useState, useEffect } from 'react'
import { generateQrSvg, generateQrPng } from '../lib/qrcode.js'
import { Download, QrCode, ShieldCheck, Check } from 'lucide-react'

export default function QrCard({ upiUri, amount, note, upiId, recipientName, onCopyUpi, resolvedTheme = 'dark' }) {
  const [svgHtml, setSvgHtml] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

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
      setTimeout(() => setDownloadSuccess(false), 2000)
    }
    setDownloading(false)
  }

  return (
    <div className="bg-white dark:bg-[#151412] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl p-5 sm:p-6 shadow-xl shadow-black/[0.03] dark:shadow-2xl relative overflow-hidden transition-colors">
      {/* Decorative subtle ambient gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#C2956A]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F8F6F0]">
            Scan with any UPI App
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#86868B] dark:text-[#8E8A83] font-mono-code">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
          <span>FamPay Direct</span>
        </div>
      </div>

      {/* QR Code Container with Corner Markers */}
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

          {/* Center Brand Badge over QR with actual avatar */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#0F0E0D] border-2 border-[#B8860B] dark:border-[#C2956A] shadow-lg flex items-center justify-center overflow-hidden">
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
        <div className="w-full bg-[#F2F2F7] dark:bg-[#1A1916] border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-3.5 mb-4 space-y-1.5 text-xs font-mono-code transition-colors">
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
              onClick={() => onCopyUpi(upiId)}
              className="text-[#B8860B] dark:text-[#C2956A] hover:underline flex items-center gap-1 cursor-pointer font-bold"
              title="Click to copy UPI ID"
            >
              <span>{upiId}</span>
            </button>
          </div>

          {note && (
            <div className="flex items-center justify-between text-[#6E6E73] dark:text-[#8E8A83] pt-1.5 border-t border-black/[0.06] dark:border-white/[0.06]">
              <span>Note:</span>
              <span className="text-[#B8860B] dark:text-[#C2956A] truncate max-w-[180px]">{note}</span>
            </div>
          )}
        </div>

        {/* Download QR Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-2.5 px-3 rounded-xl bg-black/[0.04] dark:bg-[#1E1D19] hover:bg-black/[0.08] dark:hover:bg-[#282621] border border-black/[0.06] dark:border-[#2D2A24] text-xs font-medium text-[#424245] dark:text-[#A5A096] hover:text-[#1D1D1F] dark:hover:text-[#F8F6F0] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Saved to Photos/Downloads!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
              <span>{downloading ? 'Preparing Image...' : 'Save QR Code'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
