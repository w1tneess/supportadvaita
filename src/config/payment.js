// UPI apps don't decode '+' as space (use %20) and some mishandle %40, so keep '@' literal in the VPA
const toQuery = (params) => [...params].map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%40/g, '@')}`).join('&')

const USD_TO_INR = 83.5 // rough display-only approximation

export const PAYMENT_CONFIG = {
  upiId: 'advaita@fam',
  recipientName: 'Advaita Chandra',
  avatar: '/pfp.webp',

  // Display-only USD approximation
  inrToUsd: (amount) => {
    const num = parseFloat(amount)
    if (isNaN(num) || num <= 0) return ''
    return (num / USD_TO_INR).toFixed(2)
  },

  // Shared UPI query builder. Per the NPCI linking spec only `pa` is mandatory; `mc`/`tr` are
  // merchant-only and deliberately omitted for this personal VPA. Amount is optional (payer can edit).
  // `withAmount: false` builds an open-amount link: PSP risk engines (PhonePe "For security reasons...",
  // GPay "exceeded bank limit") often decline web-initiated P2P intents with a preset `am`, while the
  // same payee with the amount typed in-app goes through.
  buildUpiQuery: (amount, note, { withAmount = true } = {}) => {
    const numAmount = parseFloat(amount)
    const params = new URLSearchParams()
    params.set('pa', PAYMENT_CONFIG.upiId)
    params.set('pn', PAYMENT_CONFIG.recipientName)
    params.set('cu', 'INR')
    // UPI per-transaction limit: ₹1 to ₹1,00,000
    if (withAmount && !isNaN(numAmount) && numAmount >= 1 && numAmount <= 100000) params.set('am', numAmount.toFixed(2))

    // Strip &, =, ?, #, %, ; etc. to prevent parameter pollution; tn max 50 chars
    const cleanNote = typeof note === 'string'
      ? note.replace(/[^\w\s.,!?-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 50)
      : ''
    params.set('tn', cleanNote || 'Support Advaita Chandra')
    return toQuery(params)
  },

  buildUpiUri: (amount, note, opts) => `upi://pay?${PAYMENT_CONFIG.buildUpiQuery(amount, note, opts)}`,
}
