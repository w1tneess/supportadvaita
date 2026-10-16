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

  // Authentic narrative and ethos
  bio: "I am a 16-year-old student, independent researcher, and developer based in West Bengal, India. Outside Class 10 coursework, I build open-source tools, investigate historical and philosophical questions, read existentialism, and pursue street and landscape photography.",
  subBio: "I refuse intrusive advertisements, corporate tracking scripts, or artificial paywalls on my work. Every rupee contributed here directly funds server compute, domain renewals, book acquisitions, and research equipment.",

  // Philosophical foundation
  quote: {
    text: "The absurd is the friction produced when the human longing for clarity collides with an unanswering world. Rather than leaping into certainty, one must maintain the tension without illusion.",
    author: "Albert Camus",
    source: "The Myth of Sisyphus",
    note: "The epistemic principle guiding my research, software, and writing."
  },

  // Key platform metrics
  metrics: [
    { label: 'Settlement', value: '100% P2P' },
    { label: 'Intermediary Cut', value: '0% (Zero Fee)' },
    { label: 'Active Projects', value: '4 Maintained' },
    { label: 'Student Patronage', value: 'Class 10 CBSE' },
  ],

  // Real financial breakdown: what running independent projects actually costs
  financialBreakdown: [
    { item: 'Cloud Compute & Server Workers', cost: '₹500 / mo', desc: 'Background workers, static hosting, and API micro-services' },
    { item: 'Philosophy & CS Physical Books', cost: '₹400 / mo', desc: 'Physical editions of Camus, Krishnamurti, Dostoevsky, and CS textbooks' },
    { item: 'Photography Storage & Backups', cost: '₹300 / mo', desc: 'RAW photograph archives, camera upkeep, and hard disk storage' },
    { item: 'Canonical Domain Renewals', cost: '₹1,200 / yr', desc: 'Maintains advaitachandra.in and personal web namespace' }
  ],

  // Grounded Indian Sahyog & Shagun tiers
  tiers: [
    {
      id: 'chai',
      amount: 51,
      devanagari: '५१',
      label: 'Kulhad Chai',
      hindiName: 'कुल्हड़ चाय',
      desc: 'Late-night debugging & reading fuel after school hours',
      icon: 'Coffee',
      popular: false,
    },
    {
      id: 'book',
      amount: 101,
      devanagari: '१०१',
      label: 'Kitab Sahyog',
      hindiName: 'किताब सहयोग',
      desc: 'Contributes to a physical philosophy or computer science book',
      icon: 'BookOpen',
      popular: true,
      tag: 'शुभ शगुन',
    },
    {
      id: 'server',
      amount: 251,
      devanagari: '२५१',
      label: 'Server Seva',
      hindiName: 'सर्वर सेवा',
      desc: 'Covers personal domain uptime & cloud droplets for a month',
      icon: 'Server',
      popular: false,
    },
    {
      id: 'vidya',
      amount: 501,
      devanagari: '५०१',
      label: 'Vidya Sahyog',
      hindiName: 'विद्या सहयोग',
      desc: 'Substantial student backing for open-source research and tools',
      icon: 'Sparkles',
      popular: false,
    },
    {
      id: 'patron',
      amount: 1101,
      devanagari: '११०१',
      label: 'Maha Sahyog',
      hindiName: 'महा सहयोग',
      desc: 'True patron of independent writing, archives & software',
      icon: 'GraduationCap',
      popular: false,
    },
  ],

  // Quick increment buttons with traditional Shagun amounts
  quickIncrements: [
    { value: 1, label: '+₹1 Shagun' },
    { value: 51, label: '+₹51' },
    { value: 101, label: '+₹101' },
    { value: 251, label: '+₹251' },
    { value: 501, label: '+₹501' },
  ],

  // Real projects built and maintained by Advaita
  projects: [
    {
      id: 'advaitachandra-in',
      name: 'advaitachandra.in',
      category: 'Personal Space & Digital Garden',
      summary: 'Public digital notebook, philosophical essays, data architecture notes, and street photography.',
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

  // UPI link generator with strict parameter injection prevention and NPCI bounds
  buildUpiUri: (amount, note) => {
    const numAmount = parseFloat(amount)
    let cleanAmount = ''
    // Enforce NPCI UPI limits: positive number up to ₹1,00,000
    if (!isNaN(numAmount) && numAmount >= 1 && numAmount <= 100000) {
      cleanAmount = numAmount.toFixed(2)
    }

    // Sanitize transaction note strictly to prevent UPI URI parameter pollution
    let cleanNote = 'Support paytoadvaita'
    if (typeof note === 'string' && note.trim().length > 0) {
      const sanitized = note
        .trim()
        .replace(/[^\w\s.,!?-]/gi, '') // Strip any &, =, ?, #, %, ;, etc.
        .replace(/\s+/g, ' ')
        .slice(0, 50) // NPCI tn character limit
      if (sanitized.length > 0) {
        cleanNote = sanitized
      }
    }

    // Build canonical params safely
    const params = new URLSearchParams()
    params.set('pa', 'advaita@fam')
    params.set('pn', 'Advaita Chandra')
    params.set('cu', 'INR')
    if (cleanAmount) params.set('am', cleanAmount)
    params.set('tn', cleanNote)

    return `upi://pay?${params.toString()}`
  },

  // Rupee words converter with Hindi/Devanagari cultural touch
  numberToRupeeWords: (num) => {
    if (!num || isNaN(num) || num <= 0) return ''
    const n = Math.floor(num)
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']

    let eng = ''
    if (n < 20) eng = `${ones[n]} Rupees`
    else if (n < 100) eng = `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + ones[n % 10] : ''} Rupees`
    else if (n < 1000) {
      const rem = n % 100
      eng = `${ones[Math.floor(n / 100)]} Hundred${rem ? ' ' + (rem < 20 ? ones[rem] : tens[Math.floor(rem / 10)] + (rem % 10 ? ' ' + ones[rem % 10] : '')) : ''} Rupees`
    } else if (n < 100000) {
      const th = Math.floor(n / 1000)
      const rem = n % 1000
      const thStr = th < 20 ? ones[th] : tens[Math.floor(th / 10)] + (th % 10 ? ' ' + ones[th % 10] : '')
      eng = `${thStr} Thousand${rem ? ' ' + PAYMENT_CONFIG.numberToRupeeWords(rem).replace(' Rupees', '') : ''} Rupees`
    } else {
      eng = `₹${num.toLocaleString('en-IN')} Rupees`
    }

    // Convert digits to Devanagari script: 0123456789 -> ०१२३४५६७८९
    const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
    const devanagariNum = n.toString().split('').map(d => devanagariDigits[parseInt(d, 10)] || d).join('')

    // Auspicious Shagun check (+1)
    const isShagun = n % 10 === 1 && n !== 11
    const shagunTag = isShagun ? ' • शुभ शगुन' : ''

    return `${eng} (₹${devanagariNum}${shagunTag})`
  },

  // Ready-to-use embed badges for GitHub READMEs & Websites (Neutral, zero-company branding)
  embedBadges: {
    markdown: `[![Support Advaita Chandra](https://img.shields.io/badge/Patron-Advaita_Chandra-C2956A?style=for-the-badge&logoColor=white)](https://support.advaitachandra.in)`,
    html: `<a href="https://support.advaitachandra.in" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Patron-Advaita_Chandra-C2956A?style=for-the-badge&logoColor=white" alt="Support Advaita Chandra" /></a>`,
    shieldUrl: `https://img.shields.io/badge/Patron-Advaita_Chandra-C2956A?style=for-the-badge&logoColor=white`,
    textLink: `[Support my independent work on support.advaitachandra.in](https://support.advaitachandra.in)`
  }
}
