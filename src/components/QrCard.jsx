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
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white/70 dark:bg-[#111111]/70 backdrop-blur-sm p-5 space-y-4 transition-colors shadow-xs">
      {/* Terminal Header with Global Rail Status */}
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-neutral-800 font-mono text-xs">
        <div className="flex items-center gap-2">
          <QrCode className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#C2956A]" />
          <span className="font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
            terminal.scan
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>UPI / FamPay Live</span>
        </div>
      </div>

      {/* QR Code Container with Precision Corner Crosshairs */}
      <div className="flex flex-col items-center">
        <div className="relative p-4 rounded-xl bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-800 shadow-inner mb-3">
          {/* Subtle Precision Corner Crosshairs (+) */}
          <span className="absolute top-1 left-1.5 text-xs font-mono text-neutral-400 select-none">+</span>
          <span className="absolute top-1 right-1.5 text-xs font-mono text-neutral-400 select-none">+</span>
          <span className="absolute bottom-1 left-1.5 text-xs font-mono text-neutral-400 select-none">+</span>
          <span className="absolute bottom-1 right-1.5 text-xs font-mono text-neutral-400 select-none">+</span>

          {/* Dynamic QR SVG */}
          <div
            className="w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />

          {/* Center Personal Avatar Badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0A0A0A] border border-[#B8860B] dark:border-[#C2956A] shadow-md flex items-center justify-center overflow-hidden">
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
        <div className="w-full bg-neutral-50 dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 rounded-lg p-3 space-y-1.5 text-xs font-mono mb-3">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span>amount (inr)</span>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">
              {amount ? `₹${amount}.00` : 'any'} {usdValue && <span className="font-normal text-neutral-400">(~${usdValue} USD)</span>}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span>currency</span>
            <span className="text-neutral-800 dark:text-neutral-200">INR (₹) • 1st Priority</span>
          </div>

          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span>rail / gateway</span>
            <span className="text-neutral-800 dark:text-neutral-200">UPI (FamPay)</span>
          </div>

          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span>vpa_handle</span>
            <button
              type="button"
              onClick={handleCopyUpiId}
              className="text-[#B8860B] dark:text-[#C2956A] hover:underline flex items-center gap-1 cursor-pointer font-bold"
              title="Copy UPI ID"
            >
              <span>{upiId}</span>
              {copiedId ? (
                <Check className="w-3 h-3 text-emerald-500" />
              ) : (
                <Copy className="w-3 h-3 opacity-60" />
              )}
            </button>
          </div>

          {note && (
            <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 pt-1 border-t border-neutral-200/60 dark:border-neutral-800/60">
              <span>remarks</span>
              <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[170px]">{note}</span>
            </div>
          )}
        </div>

        {/* Global Supporter Information Box */}
        <div className="w-full p-2.5 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/50 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 flex items-start gap-2 mb-3">
          <Globe2 className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span className="font-bold text-neutral-800 dark:text-neutral-200">Global Backers: </span>
            Canonical settlement is strictly in INR via India's UPI protocol (<code className="text-[#B8860B] dark:text-[#C2956A]">{upiId}</code> on FamPay). International card rails in development.
          </div>
        </div>

        {/* Pro-Dev Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-2 px-3 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 font-mono text-xs text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center justify-between transition-colors cursor-pointer"
        >
          {downloadSuccess ? (
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium w-full justify-center">
              <Check className="w-3.5 h-3.5" />
              <span>saved to downloads</span>
            </span>
          ) : (
            <>
              <span>{downloading ? 'exporting...' : 'export qr code'}</span>
              <Download className="w-3.5 h-3.5 text-neutral-400" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
