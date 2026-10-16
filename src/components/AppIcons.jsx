import React, { useState } from 'react'

/**
 * Official Google Play Store app icon assets for Indian payment apps
 */
const APP_ICON_MAP = {
  gpay: {
    src: '/apps/gpay.svg',
    alt: 'Google Pay',
  },
  phonepe: {
    src: '/apps/phonepe.png',
    alt: 'PhonePe',
  },
  paytm: {
    src: '/apps/paytm.svg',
    alt: 'Paytm',
  },
  bhim: {
    src: '/apps/bhim.svg',
    alt: 'BHIM UPI',
  },
  cred: {
    src: '/apps/cred.png',
    alt: 'CRED',
  },
  fampay: {
    src: '/apps/fampay.svg',
    alt: 'FamPay',
    tile: 'bg-black',
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
      className={`${className} object-contain rounded-md select-none pointer-events-none shadow-2xs`}
      loading="eager"
      decoding="async"
    />
  )
}

// Brand logos need a fixed tile (not theme-dependent) so official colors stay legible in light and dark.
export const appTileClass = (appId) => APP_ICON_MAP[appId]?.tile || 'bg-white'
