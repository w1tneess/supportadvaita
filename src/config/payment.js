export const PAYMENT_CONFIG = {
  appName: 'paytoadvaita',
  upiId: 'advaita@fam',
  recipientName: 'Advaita Chandra',
  currency: 'INR',
  tagline: 'Direct, zero-fee patron support for independent code, research, and reflections.',
  bio: 'Advaita Chandra (Wit) is a 16-year-old student, builder, and photographer from West Bengal, India. Fuelling open-source tools, digital experiments, and philosophical writing.',
  
  // Philosophical quote matching Advaita's intellectual interests (Camus / Krishnamurti)
  quote: {
    text: "To create is to live twice.",
    author: "Albert Camus",
    subtext: "Supporting independent craftsmanship in an age of automated noise."
  },

  // Expanded Presets with common increments
  tiers: [
    {
      id: 'chai',
      amount: 50,
      label: 'Cup of Chai',
      desc: 'Late-night debugging fuel',
      tag: '₹50',
      icon: 'Coffee',
      popular: false,
    },
    {
      id: 'book',
      amount: 150,
      label: 'Cold Brew / Book',
      desc: 'Nourishment for literature & essays',
      tag: '₹150',
      icon: 'BookOpen',
      popular: true,
    },
    {
      id: 'server',
      amount: 500,
      label: 'Server & Domain',
      desc: 'Keeps cloud instances & projects live',
      tag: '₹500',
      icon: 'Server',
      popular: false,
    },
    {
      id: 'patron',
      amount: 1000,
      label: 'Patron of Craft',
      desc: 'Substantial backing for open source',
      tag: '₹1,000',
      icon: 'Sparkles',
      popular: false,
    },
  ],

  // Quick increment buttons for easy mobile adjustment
  quickIncrements: [50, 100, 200, 500],

  // Specific UPI app deep-link definitions
  supportedApps: [
    { id: 'all', name: 'Any UPI App', protocol: 'upi://pay' },
    { id: 'gpay', name: 'Google Pay', protocol: 'tez://upi/pay' },
    { id: 'phonepe', name: 'PhonePe', protocol: 'phonepe://pay' },
    { id: 'paytm', name: 'Paytm', protocol: 'paytmmp://pay' },
    { id: 'bhim', name: 'BHIM', protocol: 'bhim://upi/pay' },
  ],

  // Connected Repositories & Websites
  projects: [
    {
      id: 'advaitachandra-in',
      name: 'advaitachandra.in',
      category: 'Personal Space & Digital Garden',
      description: 'Personal site, public notebook, philosophical inquiries, photography, and interactive art.',
      url: 'https://advaitachandra.in',
      repoUrl: 'https://github.com/w1tneess',
      type: 'Website',
      status: 'Live',
      stars: 'Digital Space',
      tags: ['React', 'Tailwind', 'Philosophy', 'Photography'],
    },
    {
      id: 'osho-documentary',
      name: 'osho-documentary',
      category: 'Interactive Archival Site',
      description: 'Interactive documentary platform exploring Osho and Rajneeshpuram with archival timelines and map navigation.',
      url: 'https://github.com/w1tneess/osho-documentary',
      repoUrl: 'https://github.com/w1tneess/osho-documentary',
      type: 'Repository',
      status: 'Public',
      stars: 'TypeScript',
      tags: ['Next.js', 'TypeScript', 'History', 'Archive'],
    },
    {
      id: 'declutter',
      name: 'declutter',
      category: 'Windows Desktop Utility',
      description: 'Windows application that safely declutters messy folders: sorts by type, finds duplicates and old files with instant preview.',
      url: 'https://github.com/w1tneess/declutter',
      repoUrl: 'https://github.com/w1tneess/declutter',
      type: 'Repository',
      status: 'Public',
      stars: 'Python',
      tags: ['Python', 'Automation', 'Utility', 'CLI'],
    },
  ],

  // Social Channels
  socials: [
    { name: 'GitHub', handle: 'w1tneess', url: 'https://github.com/w1tneess', icon: 'Github' },
    { name: 'X / Twitter', handle: '@w1tneess_', url: 'https://x.com/w1tneess_', icon: 'Twitter' },
    { name: 'Instagram', handle: '@adva1ta_', url: 'https://instagram.com/adva1ta_', icon: 'Instagram' },
    { name: 'Website', handle: 'advaitachandra.in', url: 'https://advaitachandra.in', icon: 'Globe' },
  ],

  // Helper to generate compliant UPI link
  buildUpiUri: (amount, note) => {
    const cleanAmount = Number(amount) > 0 ? Number(amount).toFixed(2) : ''
    const cleanNote = note && note.trim().length > 0 
      ? note.trim().replace(/[^a-zA-Z0-9 -]/g, '')
      : 'Support paytoadvaita'
    
    let uri = `upi://pay?pa=advaita@fam&pn=Advaita%20Chandra&cu=INR`
    if (cleanAmount) uri += `&am=${cleanAmount}`
    if (cleanNote) uri += `&tn=${encodeURIComponent(cleanNote)}`
    return uri
  },

  // Helper for specific app deep links
  buildAppUpiUri: (appId, amount, note) => {
    const baseUri = PAYMENT_CONFIG.buildUpiUri(amount, note)
    const queryString = baseUri.replace('upi://pay?', '')
    switch (appId) {
      case 'gpay': return `tez://upi/pay?${queryString}`
      case 'phonepe': return `phonepe://pay?${queryString}`
      case 'paytm': return `paytmmp://pay?${queryString}`
      case 'bhim': return `bhim://upi/pay?${queryString}`
      default: return baseUri
    }
  },

  // Helper to format Indian Rupee into words
  numberToRupeeWords: (num) => {
    if (!num || isNaN(num) || num <= 0) return ''
    const n = Math.floor(num)
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

    if (n < 20) return `${ones[n]} Rupees`
    if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + ones[n % 10] : ''} Rupees`
    if (n < 1000) {
      const rem = n % 100
      return `${ones[Math.floor(n / 100)]} Hundred${rem ? ' ' + (rem < 20 ? ones[rem] : tens[Math.floor(rem / 10)] + (rem % 10 ? ' ' + ones[rem % 10] : '')) : ''} Rupees`
    }
    if (n < 100000) {
      const th = Math.floor(n / 1000)
      const rem = n % 1000
      const thStr = th < 20 ? ones[th] : tens[Math.floor(th / 10)] + (th % 10 ? ' ' + ones[th % 10] : '')
      return `${thStr} Thousand${rem ? ' ' + PAYMENT_CONFIG.numberToRupeeWords(rem) : ' Rupees'}`
    }
    return `₹${num.toLocaleString('en-IN')} Rupees`
  },

  // Ready-to-use badges
  embedBadges: {
    markdown: `[![Support via paytoadvaita](https://img.shields.io/badge/Support-paytoadvaita-C2956A?style=for-the-badge&logo=googlepay&logoColor=white)](https://paytoadvaita.pages.dev)`,
    html: `<a href="https://paytoadvaita.pages.dev" target="_blank"><img src="https://img.shields.io/badge/Support-paytoadvaita-C2956A?style=for-the-badge&logo=googlepay&logoColor=white" alt="Support via paytoadvaita" /></a>`,
    shieldUrl: `https://img.shields.io/badge/Support-paytoadvaita-C2956A?style=for-the-badge&logo=googlepay&logoColor=white`,
    textLink: `[Support my projects on paytoadvaita](https://paytoadvaita.pages.dev)`
  }
}
