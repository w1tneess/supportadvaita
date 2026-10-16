import React, { useState } from 'react'

/**
 * Official Google Play Store app icon assets for Indian payment apps
 */
const APP_ICON_MAP = {
  gpay: {
    src: '/apps/gpay.png',
    alt: 'Google Pay',
  },
  phonepe: {
    src: '/apps/phonepe.png',
    alt: 'PhonePe',
  },
  paytm: {
    src: '/apps/paytm.png',
    alt: 'Paytm',
  },
  bhim: {
    src: '/apps/bhim.png',
    alt: 'BHIM UPI',
  },
  cred: {
    src: '/apps/cred.png',
    alt: 'CRED',
  },
  fampay: {
    src: '/apps/fampay.png',
    alt: 'FamPay',
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
