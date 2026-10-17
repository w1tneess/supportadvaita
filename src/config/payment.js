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
  buildUpiQuery: (amount, note) => {
    const numAmount = parseFloat(amount)
    const params = new URLSearchParams()
    params.set('pa', PAYMENT_CONFIG.upiId)
    params.set('pn', PAYMENT_CONFIG.recipientName)
    params.set('cu', 'INR')
    // UPI per-transaction limit: ₹1 to ₹1,00,000
    if (!isNaN(numAmount) && numAmount >= 1 && numAmount <= 100000) params.set('am', numAmount.toFixed(2))

    // Strip &, =, ?, #, %, ; etc. to prevent parameter pollution; tn max 50 chars
    const cleanNote = typeof note === 'string'
      ? note.replace(/[^\w\s.,!?-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 50)
      : ''
    params.set('tn', cleanNote || 'Support Advaita Chandra')
    return toQuery(params)
  },

  buildUpiUri: (amount, note) => `upi://pay?${PAYMENT_CONFIG.buildUpiQuery(amount, note)}`,

  // Generates dedicated app-specific deep links (Android Chrome Intent & native iOS schemes)
  buildAppPayLinks: (amount, note) => {
    const queryString = PAYMENT_CONFIG.buildUpiQuery(amount, note)

    return [
      {
        id: 'gpay',
        name: 'Google Pay',
        shortName: 'GPay',
        color: '#4285F4',
        androidIntent: `intent://pay?${queryString}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`,
        scheme: `gpay://upi/pay?${queryString}`,
        dotClass: 'bg-[#4285F4]',
        badge: 'Android & iOS',
      },
      {
        id: 'phonepe',
        name: 'PhonePe',
        shortName: 'PhonePe',
        color: '#5F259F',
        androidIntent: `intent://pay?${queryString}#Intent;scheme=upi;package=com.phonepe.app;end`,
        scheme: `phonepe://pay?${queryString}`,
        dotClass: 'bg-[#5F259F]',
        badge: 'Android & iOS',
      },
      {
        id: 'paytm',
        name: 'Paytm',
        shortName: 'Paytm',
        color: '#00BAF2',
        androidIntent: `intent://pay?${queryString}#Intent;scheme=upi;package=net.one97.paytm;end`,
        scheme: `paytmmp://pay?${queryString}`,
        dotClass: 'bg-[#00BAF2]',
        badge: 'Android & iOS',
      },
      {
        id: 'bhim',
        name: 'BHIM UPI',
        shortName: 'BHIM',
        color: '#005A9C',
        androidIntent: `intent://pay?${queryString}#Intent;scheme=upi;package=in.org.npci.upiapp;end`,
        scheme: `upi://pay?${queryString}`,
        dotClass: 'bg-[#005A9C]',
        badge: 'NPCI',
      },
      {
        id: 'cred',
        name: 'CRED UPI',
        shortName: 'CRED',
        color: '#111111',
        androidIntent: `intent://pay?${queryString}#Intent;scheme=upi;package=com.dreamplug.androidapp;end`,
        scheme: `upi://pay?${queryString}`,
        dotClass: 'bg-neutral-900 dark:bg-white',
        badge: 'Members',
      },
      {
        id: 'fampay',
        name: 'FamPay',
        shortName: 'FamPay',
        color: '#FF8A00',
        androidIntent: `intent://pay?${queryString}#Intent;scheme=upi;package=com.fampay.in;end`,
        scheme: `upi://pay?${queryString}`,
        dotClass: 'bg-[#FF8A00]',
        badge: 'Issuer',
      },
    ]
  },
}
