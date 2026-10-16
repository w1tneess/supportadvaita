import React from 'react'

/**
 * Authentic Circular SVG Vector Badges for UPI Applications
 * Derived directly from the Figma Community Vector Kit:
 * https://www.figma.com/community/file/1384616256548142840/upi-apps-60-logos-svg-vector
 * ("UPI Apps • 60+ Logos • SVG (vector)" by Jahanvi Singh)
 */

export function GPayIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figma Circle Base */}
      <circle cx="24" cy="24" r="23.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      {/* 2020 Official Google Pay Folded Ribbon Vector */}
      <g transform="translate(10, 10)">
        <path
          d="M20.25 10.36c-.46-2.58-2.12-4.71-4.51-5.69a13.9 13.9 0 00-5.46-.99C6.06 3.68 2.5 6.64 1.34 10.63a13.8 13.8 0 00-.33 5.42c.46 2.57 2.12 4.7 4.51 5.68 1.72.7 3.59.89 5.46.54l-1.12-4.32a9.42 9.42 0 01-3.69-.37 5.76 5.76 0 01-3.12-3.89 5.86 5.86 0 01.14-2.32c.5-1.74 2.06-3.03 3.86-3.23 1.25-.14 2.51.14 3.58.78l3.12-3.12c1.78 1.44 2.92 3.53 3.16 5.8l3.34-1.26z"
          fill="#4285F4"
        />
        <path
          d="M26.66 13.5c0-1.89-.54-3.74-1.57-5.32l-3.8 2.2c.57.88.87 1.9.87 2.95 0 3.03-2.47 5.5-5.5 5.5-.78 0-1.54-.16-2.24-.48l-1.83 3.97c1.26.58 2.65.88 4.07.88 5.74 0 10-4.26 10-9.7z"
          fill="#34A853"
        />
        <path
          d="M16.66 4.37c2.06 0 3.96.76 5.43 2.02l3.29-3.29C23.08 1.07 19.98 0 16.66 0 11.23 0 6.55 3.03 4.22 7.51l3.96 2.3c1.3-2.51 3.93-4.21 6.94-4.21c.52 0 1.03.05 1.54.17z"
          fill="#EA4335"
        />
        <path
          d="M4.22 19.49l-3.96 2.3C2.59 26.27 7.27 29.3 12.7 29.3c3.32 0 6.42-1.07 8.72-3.1l-3.29-3.29c-1.47 1.26-3.37 2.02-5.43 2.02-3.01 0-5.64-1.7-6.94-4.21-.51-.98-.83-2.07-.94-3.23z"
          fill="#FBBC05"
        />
      </g>
    </svg>
  )
}

export function PhonePeIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figma Royal Purple Circular Container */}
      <circle cx="24" cy="24" r="24" fill="#5F259F" />
      {/* Authentic White PhonePe Devanagari Glyph */}
      <g transform="translate(11, 10)">
        <path
          fill="#FFFFFF"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.44 14.86c0-4.7-3.12-7.46-8.15-7.46H3.82c-.45 0-.82.37-.82.82v1.75c0 .45.37.82.82.82h2.24v6.86c0 4.95 2.8 7.82 7.18 7.82 1.48 0 2.74-.26 3.73-.78v4.61c0 .92.74 1.66 1.66 1.66h2.1c.92 0 1.66-.74 1.66-1.66V15.75c0-.45-.37-.82-.82-.82h-1.68c-.45 0-.82.37-.82.82v5.33c-.7.36-1.62.54-2.58.54-2.28 0-3.56-1.25-3.56-3.88v-3.7h3.76c2.02 0 3.12 1.02 3.12 2.61 0 .39.31.7.7.7h2.15c.39 0 .7-.31.7-.7zm-4.32-8.52l-5.6-5.8c-.53-.55-1.42-.55-1.95 0l-.92.95c-.53.55-.53 1.44 0 1.99l5.48 5.67c.32.33.75.51 1.2.51h2.24c.75 0 1.25-.74.92-1.41l-1.37-1.91z"
        />
      </g>
    </svg>
  )
}

export function PaytmIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figma White Circular Container */}
      <circle cx="24" cy="24" r="23.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      {/* Official Paytm Navy + Cyan Mark */}
      <g transform="translate(7.5, 17)">
        {/* 'Pay' in Dark Navy */}
        <path
          fill="#002970"
          d="M0 0h4.8c2.4 0 3.9 1.1 3.9 3.1 0 2-1.5 3.1-3.9 3.1H2.7v4.6H0V0zm2.7 4.3h1.9c.9 0 1.5-.4 1.5-1.2 0-.8-.6-1.2-1.5-1.2H2.7v2.4zm10.2 1.5c-1.1 0-1.9.5-1.9 1.6 0 .9.7 1.5 1.9 1.5.8 0 1.4-.3 1.7-.6V7.4c-.4-.8-1-.1.6-1.7-.1.6zm1.9-2.3v6.6h-2.3v-.8c-.6.5-1.2.9-2.2.9-1.8 0-2.8-1.1-2.8-2.7 0-1.8 1.3-2.7 3.3-2.7.7 0 1.2.1 1.6.3v-.3c0-.8-.5-1.3-1.7-1.3-.8 0-1.5.3-2.1.7l-.6-1.4c.9-.5 2-1.2.8 3.2-.8 2.2 0 3.4 1 3.4 2.8zm3.1-.7l2 5.4 1.9-5.4h2.2l-3 7.6-1.4 3.5H16l1.1-2.7-2.8-8.4h2.5z"
        />
        {/* 'tm' in Vivid Cyan */}
        <path
          fill="#00BAF2"
          d="M21.5-2h2v3h2.3v1.8h-2.3v4.6c0 .7.3 1 .8 1 .5 0 1-.1 1.4-.4l.4 1.6c-.7.4-1.4.5-2.3.5-1.6 0-2.4-.8-2.4-2.6V2.8H20V1h1.5v-3zm4.7 4.7h2v1c.5-.7 1.2-1.2 2.3-1.2 1.1 0 1.9.5 2.3 1.4.7-.8 1.5-1.4 2.6-1.4 1.6 0 2.6 1 2.6 2.8v5.9h-2.1V5.7c0-1-.5-1.5-1.4-1.5-.8 0-1.4.6-1.6 1.2v5.8h-2.1V5.7c0-1-.5-1.5-1.4-1.5-.8 0-1.4.6-1.6 1.2v5.8h-2.1V2.7h.5z"
        />
      </g>
    </svg>
  )
}

export function BhimIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figma White Circular Container */}
      <circle cx="24" cy="24" r="23.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      {/* Authentic BHIM Monogram & Chevrons */}
      <g transform="translate(8, 15)">
        {/* Bold Italic BHIM */}
        <text
          x="0"
          y="13"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="13"
          fill="#1A1A1A"
          letterSpacing="-0.5px"
        >
          BHIM
        </text>
        {/* Fast-Forward Chevrons: Top Saffron, Bottom Green */}
        <g transform="translate(24, 1)">
          {/* Saffron / Orange Top Triangle */}
          <path d="M0 0l6 5.5H2.5L0 3.2V0z" fill="#F37021" />
          <path d="M4 0l6 5.5H6.5L4 3.2V0z" fill="#F37021" />
          {/* Green Bottom Triangle */}
          <path d="M0 12l6-5.5H2.5L0 8.8V12z" fill="#008444" />
          <path d="M4 12l6-5.5H6.5L4 8.8V12z" fill="#008444" />
        </g>
      </g>
      {/* Subtitle */}
      <text
        x="24"
        y="33.5"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="3.8"
        fill="#555555"
        textAnchor="middle"
        letterSpacing="0.2px"
      >
        PAYMENTS
      </text>
    </svg>
  )
}

export function CredIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figma White Circular Container */}
      <circle cx="24" cy="24" r="23.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
      {/* Geometric Monogram Emblem of CRED */}
      <g transform="translate(14, 12)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2.5C0 1.12 1.12 0 2.5 0h15C18.88 0 20 1.12 20 2.5v15c0 1.38-1.12 2.5-2.5 2.5h-15C1.12 20 0 18.88 0 17.5v-15zm3 1h14v13H3v-13zm2.5 2.5h9v8h-9v-8zm2.5 2.5h4v3h-4v-3z"
          fill="#121216"
        />
      </g>
    </svg>
  )
}

export function FamPayIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Figma Yellow-Gold FamPay Circular Container */}
      <circle cx="24" cy="24" r="24" fill="#FFC72C" />
      {/* Distinct bold italic 'fam' wordmark in solid deep black */}
      <text
        x="24"
        y="30"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="18"
        fill="#111111"
        textAnchor="middle"
        letterSpacing="-1px"
      >
        fam
      </text>
    </svg>
  )
}

/**
 * Universal App Icon Renderer matching Figma Community Vector Kit
 */
export function AppIconRenderer({ appId, className = "w-7 h-7" }) {
  switch (appId) {
    case 'gpay':
      return <GPayIcon className={className} />
    case 'phonepe':
      return <PhonePeIcon className={className} />
    case 'paytm':
      return <PaytmIcon className={className} />
    case 'bhim':
      return <BhimIcon className={className} />
    case 'cred':
      return <CredIcon className={className} />
    case 'fampay':
      return <FamPayIcon className={className} />
    default:
      return null
  }
}
