export const PAYMENT_CONFIG = {
  appName: 'paytoadvaita',
  upiId: 'advaita@fam',
  recipientName: 'Advaita Chandra',
  nickname: 'Wit',
  age: 16,
  grade: 'Class 10 (CBSE)',
  location: 'West Bengal, India',
  currency: 'INR',
  avatar: '/pfp.png',
  website: 'https://advaitachandra.in',
  email: 'advaita974@gmail.com',
  github: 'https://github.com/w1tneess',
  twitter: 'https://x.com/w1tneess_',
  instagram: 'https://instagram.com/adva1ta_',

  // Real voice and bio from Advaita's personal notebook
  bio: "I'm a 16-year-old student based in West Bengal, India. Outside school, I build independent software, investigate historical and epistemological questions, read existential philosophy, and shoot street and landscape photography.",
  subBio: "I refuse to put intrusive advertisements, tracking pop-ups, or artificial paywalls on any of my projects. Every rupee sent here directly supports independent research, server compute, book acquisitions, and hardware upkeep.",

  // Philosophical quote from Advaita's writing on Camus
  quote: {
    text: "The absurd is the friction produced when the human longing for clarity collides with an unanswering world. Rather than leaping into certainty, one must maintain the tension without illusion.",
    author: "Albert Camus (The Myth of Sisyphus)",
    note: "The epistemic foundation for my research, coding, and writing."
  },

  // Real financial breakdown: what running independent projects actually costs
  financialBreakdown: [
    { item: 'Domain Renewals (advaitachandra.in, etc.)', cost: '₹1,200 / year', desc: 'Maintains personal canonical identity on the web' },
    { item: 'Cloud Compute & Server Instances', cost: '₹500 / month', desc: 'Runs background workers, APIs, and micro-services' },
    { item: 'Books & Philosophical Texts', cost: '₹400 / month', desc: 'Physical editions of Camus, Krishnamurti, Dostoevsky, and CS textbooks' },
    { item: 'Photography Storage & Gear Upkeep', cost: '₹300 / month', desc: 'RAW photograph backups, camera maintenance, and storage disks' }
  ],

  // Grounded, meaningful tiers
  tiers: [
    {
      id: 'chai',
      amount: 50,
      label: 'A Cup of Chai',
      desc: 'Late-night debugging and reading fuel after school hours',
      tag: '₹50',
      icon: 'Coffee',
      popular: false,
    },
    {
      id: 'book',
      amount: 150,
      label: 'Book & Paper Fund',
      desc: 'Contributes to a physical philosophy or tech text',
      tag: '₹150',
      icon: 'BookOpen',
      popular: true,
    },
    {
      id: 'server',
      amount: 500,
      label: 'Server & Domain Month',
      desc: 'Covers one full month of cloud droplets, database, and domain uptime',
      tag: '₹500',
      icon: 'Server',
      popular: false,
    },
    {
      id: 'patron',
      amount: 1000,
      label: 'Patron of Independent Work',
      desc: 'Substantial backing toward hardware upkeep and open-source tooling',
      tag: '₹1,000',
      icon: 'Sparkles',
      popular: false,
    },
  ],

  // Quick increment buttons
  quickIncrements: [50, 100, 200, 500],

  // Real projects built by Advaita
  projects: [
    {
      id: 'advaitachandra-in',
      name: 'advaitachandra.in',
      category: 'Personal Space & Digital Garden',
      summary: 'Public notebook, philosophical essays, data architecture notes, and street photography.',
      details: 'Built with React 19, Tailwind CSS, Lucide, Framer Motion, and pre-rendered SSG for fast offline-first reading.',
      url: 'https://advaitachandra.in',
      repoUrl: 'https://github.com/w1tneess',
      type: 'Website',
      status: 'Active',
      tech: ['React 19', 'Tailwind', 'Philosophy', 'Photography'],
    },
    {
      id: 'osho-documentary',
      name: 'Osho Archival Documentary',
      category: 'Investigative Web Archive',
      summary: 'An impartial, evidence-graded archival platform deconstructing Osho and Rajneeshpuram.',
      details: 'Built from 5,000+ audio discourses, FBI vault files, and Wasco County court records with interactive map & timeline.',
      url: 'https://github.com/w1tneess/osho-documentary',
      repoUrl: 'https://github.com/w1tneess/osho-documentary',
      type: 'Repository',
      status: 'Public',
      tech: ['Next.js', 'TypeScript', 'Primary Sources', 'Archive'],
    },
    {
      id: 'declutter',
      name: 'declutter',
      category: 'System Utility (Python)',
      summary: 'Windows application that safely declutters messy directories without permanent data loss.',
      details: 'Categorizes by filetype, detects duplicate hashes, flags stale/large files, and previews every operation first.',
      url: 'https://github.com/w1tneess/declutter',
      repoUrl: 'https://github.com/w1tneess/declutter',
      type: 'Repository',
      status: 'Public',
      tech: ['Python', 'Automation', 'CLI', 'Windows'],
    },
    {
      id: 'terrorism-dataviz',
      name: 'Terrorism in India (1947–2026)',
      category: 'Data Reconciliation & Analysis',
      summary: 'Python data visualization project examining incident reports across seven decades.',
      details: 'Reconciles conflicting sources and marks reporting gaps explicitly instead of smoothing over historical absences.',
      url: 'https://advaitachandra.in/projects',
      repoUrl: null,
      type: 'Research',
      status: 'Completed',
      tech: ['Python', 'Matplotlib', 'Data Ethics', 'History'],
    },
  ],

  // Social Links
  socials: [
    { name: 'Website', handle: 'advaitachandra.in', url: 'https://advaitachandra.in', icon: 'Globe' },
    { name: 'GitHub', handle: 'w1tneess', url: 'https://github.com/w1tneess', icon: 'Github' },
    { name: 'Twitter / X', handle: '@w1tneess_', url: 'https://x.com/w1tneess_', icon: 'Twitter' },
    { name: 'Instagram', handle: '@adva1ta_', url: 'https://instagram.com/adva1ta_', icon: 'Instagram' },
  ],

  // UPI link generator
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

  // App-specific URI deep links
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

  // Rupee words converter
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

  // Embed badges
  embedBadges: {
    markdown: `[![Support via paytoadvaita](https://img.shields.io/badge/Support-advaita-C2956A?style=for-the-badge&logo=googlepay&logoColor=white)](https://support.advaitachandra.in)`,
    html: `<a href="https://support.advaitachandra.in" target="_blank"><img src="https://img.shields.io/badge/Support-advaita-C2956A?style=for-the-badge&logo=googlepay&logoColor=white" alt="Support via paytoadvaita" /></a>`,
    shieldUrl: `https://img.shields.io/badge/Support-advaita-C2956A?style=for-the-badge&logo=googlepay&logoColor=white`,
    textLink: `[Support my projects on support.advaitachandra.in](https://support.advaitachandra.in)`
  }
}
