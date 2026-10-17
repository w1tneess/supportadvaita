// UPI apps don't decode '+' as space (use %20) and some mishandle %40, so keep '@' literal in the VPA
const toQuery = (params) => [...params].map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%40/g, '@')}`).join('&')

// UPI per-transaction range accepted by this page: whole rupees, ₹1 to ₹1,00,000
export const MIN_AMOUNT = 1
export const MAX_AMOUNT = 100000

// Strict: digits only, no leading zero, no spaces/sign/decimals. "150abc", " 150", "1.5", "-5" all fail.
export const parseAmount = (input) => {
  if (typeof input === 'number') return Number.isInteger(input) && input >= MIN_AMOUNT && input <= MAX_AMOUNT ? input : null
  if (typeof input !== 'string' || !/^[1-9]\d{0,5}$/.test(input)) return null
  const n = Number(input)
  return n <= MAX_AMOUNT ? n : null
}

// Indian digit grouping: 100000 -> "1,00,000"
export const formatInr = (amount) => `₹${amount.toLocaleString('en-IN')}`

export const PAYMENT_CONFIG = {
  upiId: 'advaita@fam',
  recipientName: 'Advaita Chandra',
  avatar: '/pfp.webp',
  contactEmail: 'advaita974@gmail.com',

  // Shared UPI query builder. Per the NPCI linking spec only `pa` is mandatory; `mc`/`tr` are
  // merchant-only and deliberately omitted for this personal VPA. Amount is optional (payer can edit).
  // `withAmount: false` builds an open-amount link: PSP risk engines (PhonePe "For security reasons...",
  // GPay "exceeded bank limit") often decline web-initiated P2P intents with a preset `am`, while the
  // same payee with the amount typed in-app goes through.
  buildUpiQuery: (amount, note, { withAmount = true } = {}) => {
    const validAmount = parseAmount(amount)
    const params = new URLSearchParams()
    params.set('pa', PAYMENT_CONFIG.upiId)
    params.set('pn', PAYMENT_CONFIG.recipientName)
    params.set('cu', 'INR')
    if (withAmount && validAmount) params.set('am', validAmount.toFixed(2))

    // Strip &, =, ?, #, %, ; etc. to prevent parameter pollution; tn max 50 chars
    const cleanNote = typeof note === 'string'
      ? note.replace(/[^\w\s.,!?-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 50)
      : ''
    params.set('tn', cleanNote || 'Support Advaita Chandra')
    return toQuery(params)
  },

  buildUpiUri: (amount, note, opts) => `upi://pay?${PAYMENT_CONFIG.buildUpiQuery(amount, note, opts)}`,
}
