import React, { useState, useEffect } from 'react'
import { PAYMENT_CONFIG } from '../config/payment.js'
import { generateQrSvg, generateQrPng } from '../lib/qrcode.js'
import { Download, QrCode, Check, Copy, Globe2 } from 'lucide-react'

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
      link.download = `supportadvaita-₹${amount || 'any'}.png`
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

  const usdValue = PAYMENT_CONFIG.inrToUsd(amount)

  return (
    <div className="border border-neutral-300/80 dark:border-neutral-800 rounded-2xl bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md p-5 sm:p-6 space-y-4 transition-colors shadow-xs">
      {/* Terminal Header with Global Rail Status */}
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-neutral-800 font-mono text-xs">
        <div className="flex items-center gap-2">
          <QrCode className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
          <span className="font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            terminal.scan
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Any UPI App Supported</span>
        </div>
      </div>

      {/* QR Code Container with Precision Corner Crosshairs */}
      <div className="flex flex-col items-center">
        <div className="relative p-4 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-neutral-300 dark:border-neutral-800 shadow-inner mb-4 max-w-full">
          {/* Subtle Precision Corner Crosshairs (+) */}
          <span className="absolute top-1.5 left-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">+</span>
          <span className="absolute top-1.5 right-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">+</span>
          <span className="absolute bottom-1.5 left-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">+</span>
          <span className="absolute bottom-1.5 right-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">+</span>

          {/* Dynamic QR SVG */}
          <div
            className="w-44 h-44 sm:w-52 sm:h-52 max-w-[70vw] aspect-square flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />

          {/* Center Personal Avatar Badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0A0A0A] border-2 border-[#B8860B] dark:border-[#C2956A] shadow-md flex items-center justify-center overflow-hidden">
              <img
                src="/pfp.png"
                alt="Advaita Chandra"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'block'
                }}
              />
              <span style={{ display: 'none' }} className="text-xs font-mono text-[#B8860B] dark:text-[#C2956A] font-bold">
                AC
              </span>
            </div>
          </div>
        </div>

        {/* Global Pro-Dev Monospace Terminal Receipt */}
        <div className="w-full bg-neutral-100/70 dark:bg-[#0D0D0D] border border-neutral-300 dark:border-neutral-800 rounded-xl p-3.5 sm:p-4 space-y-2 text-xs font-mono mb-3.5">
          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="font-medium">amount (inr)</span>
            <span className="font-bold text-neutral-950 dark:text-white">
              {amount ? `₹${amount}.00` : 'any'} {usdValue && <span className="font-normal text-neutral-600 dark:text-neutral-400">(~${usdValue} USD)</span>}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="font-medium">currency</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-semibold">INR (₹) • Primary Settlement</span>
          </div>

          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="font-medium">payment_rail</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-semibold">NPCI UPI (Any App)</span>
          </div>

          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="font-medium">vpa_handle</span>
            <button
              type="button"
              onClick={handleCopyUpiId}
              className="text-[#B8860B] dark:text-[#C2956A] hover:underline flex items-center gap-1.5 cursor-pointer font-bold"
              title="Copy UPI ID"
            >
              <span>{upiId}</span>
              {copiedId ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-80" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300">
            <span className="font-medium">account_issuer</span>
            <span className="text-neutral-900 dark:text-neutral-100 font-semibold">FamPay (Student • 16yo)</span>
          </div>

          {note && (
            <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 pt-1.5 border-t border-neutral-300/70 dark:border-neutral-800">
              <span className="font-medium">remarks</span>
              <span className="text-neutral-900 dark:text-neutral-100 font-semibold truncate max-w-[170px]">{note}</span>
            </div>
          )}
        </div>

        {/* Global Supporter & Universal UPI Interoperability Box */}
        <div className="w-full p-3.5 rounded-xl border border-neutral-300/80 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 text-xs font-mono text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5 mb-3.5">
          <Globe2 className="w-4 h-4 text-[#B8860B] dark:text-[#C2956A] shrink-0 mt-0.5" />
          <div className="leading-relaxed space-y-1">
            <p>
              <span className="font-bold text-neutral-950 dark:text-white">Compatible with ANY UPI App: </span>
              Scan or transfer with Google Pay, PhonePe, Paytm, BHIM, Cred, or any mobile bank app.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              As a 16-year-old minor student builder, my account is hosted on FamPay (<code className="text-[#B8860B] dark:text-[#C2956A] font-semibold">{upiId}</code>). The open UPI network enables direct transfers from any app.
            </p>
          </div>
        </div>

        {/* Pro-Dev Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="w-full h-11 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#151515] hover:bg-neutral-100 dark:hover:bg-neutral-800 font-mono font-semibold text-xs sm:text-sm text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white flex items-center justify-between transition-colors cursor-pointer shadow-2xs"
        >
          {downloadSuccess ? (
            <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold w-full justify-center">
              <Check className="w-4 h-4" />
              <span>saved to downloads</span>
            </span>
          ) : (
            <>
              <span>{downloading ? 'exporting...' : 'export qr code image'}</span>
              <Download className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
