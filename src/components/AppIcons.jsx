import React, { useState } from 'react'

/**
 * UPI Payment App Icons — app-icon-style SVGs with official brand colors
 * Stored in /icons/upi/ as clean vector SVGs for crisp Retina rendering
 */
const APP_ICON_MAP = {
  gpay: {
    src: '/icons/upi/gpay.svg',
    alt: 'Google Pay',
  },
  phonepe: {
    src: '/icons/upi/phonepe.svg',
    alt: 'PhonePe',
  },
  paytm: {
    src: '/icons/upi/paytm.svg',
    alt: 'Paytm',
  },
  bhim: {
    src: '/icons/upi/bhim.svg',
    alt: 'BHIM UPI',
  },
  cred: {
    src: '/icons/upi/cred.svg',
    alt: 'CRED',
  },
  fampay: {
    src: '/icons/upi/fampay.svg',
    alt: 'FamPay',
    tile: 'bg-neutral-900',
  },
}

export function AppIconRenderer({ appId, className = "w-6 h-6" }) {
  const [error, setError] = useState(false)
  const app = APP_ICON_MAP[appId]

  if (!app) return null

  if (error) {
    return (
      <span className="font-mono text-[10px] font-bold text-neutral-600 dark:text-neutral-400">
        {app.alt.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={app.src}
      alt={app.alt}
      onError={() => setError(true)}
      className={`${className} object-contain select-none pointer-events-none`}
      loading="eager"
      decoding="async"
    />
  )
}

// Brand logos need a fixed tile (not theme-dependent) so official colors stay legible in light and dark.
export const appTileClass = (appId) => APP_ICON_MAP[appId]?.tile || ''
