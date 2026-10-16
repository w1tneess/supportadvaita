import React, { useState, useEffect } from 'react'
import { generateQrSvg, generateQrPng } from '../lib/qrcode.js'
import { Download, QrCode, ShieldCheck, Check } from 'lucide-react'

export default function QrCard({ upiUri, amount, note, upiId, recipientName, onCopyUpi }) {
  const [svgHtml, setSvgHtml] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  useEffect(() => {
    let isCurrent = true
    generateQrSvg(upiUri).then((svg) => {
      if (isCurrent) setSvgHtml(svg)
    })
    return () => {
      isCurrent = false
    }
  }, [upiUri])

  const handleDownload = async () => {
    setDownloading(true)
    const pngUrl = await generateQrPng(upiUri)
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
    <div className="bg-[#151412] border border-[#262421] rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#C2956A]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#262421]">
        <div className="flex items-center gap-2">
          <QrCode className="w-4 h-4 text-[#C2956A]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F8F6F0]">
            Scan with any UPI App
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#8E8A83] font-mono-code">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C2956A]" />
          <span>FamPay Direct</span>
        </div>
      </div>

      {/* QR Code Container with Corner Markers */}
      <div className="flex flex-col items-center">
        <div className="relative p-4 sm:p-5 rounded-2xl bg-[#0F0E0D] border border-[#2D2A24] shadow-inner mb-4">
          {/* Subtle corner brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#C2956A]/70 rounded-tl-sm pointer-events-none"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#C2956A]/70 rounded-tr-sm pointer-events-none"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#C2956A]/70 rounded-bl-sm pointer-events-none"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#C2956A]/70 rounded-br-sm pointer-events-none"></div>

          {/* SVG Container */}
          <div
            className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block transition-transform duration-200"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />

          {/* Center Brand Badge over QR */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-[#0F0E0D] border border-[#C2956A] shadow-md flex items-center justify-center text-xs font-editorial text-[#C2956A] font-bold">
              AC
            </div>
          </div>
        </div>

        {/* Live Transaction Metadata Pill */}
        <div className="w-full bg-[#1A1916] border border-[#2D2A24] rounded-xl p-3 mb-4 space-y-1.5 text-xs font-mono-code">
          <div className="flex items-center justify-between text-[#8E8A83]">
            <span>Amount:</span>
            <span className="text-base font-bold text-[#F8F6F0]">
              {amount ? `₹${amount}` : 'Any Amount'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#8E8A83]">
            <span>Payee:</span>
            <span className="text-[#F8F6F0] truncate">{recipientName}</span>
          </div>

          <div className="flex items-center justify-between text-[#8E8A83]">
            <span>UPI ID:</span>
            <button
              onClick={() => onCopyUpi(upiId)}
              className="text-[#C2956A] hover:underline flex items-center gap-1 cursor-pointer"
              title="Click to copy UPI ID"
            >
              <span>{upiId}</span>
            </button>
          </div>

          {note && (
            <div className="flex items-center justify-between text-[#8E8A83] pt-1 border-t border-[#262421]">
              <span>Note:</span>
              <span className="text-[#C2956A] truncate max-w-[180px]">{note}</span>
            </div>
          )}
        </div>

        {/* Download QR Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-2 px-3 rounded-xl bg-[#1E1D19] hover:bg-[#282621] border border-[#2D2A24] text-xs font-medium text-[#A5A096] hover:text-[#F8F6F0] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">QR Code Saved!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Preparing PNG...' : 'Download QR Code'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
