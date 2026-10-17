# Support My Work — Advaita Chandra (`supportadvaita`)

> *"To create is to live twice."* — Albert Camus

Hi, I'm **Advaita Chandra** (known online as **Wit**). I am a 16-year-old student, independent developer, and photographer from West Bengal, India, currently studying in Class 10 (CBSE).

I spend most of my time outside school building software, experimenting with web technologies and AI, reading existential philosophy, and documenting the world through street and everyday photography.

This repository powers **supportadvaita** — my personal, zero-fee direct support portal.

---

## ⚡ Direct Support (UPI)

Since I am 16 and live in India, I don't use high-commission international payment gateways that take 5–10% cuts. Every rupee sent via UPI reaches me directly with **0% middleman fees**.

| Detail | Information |
| :--- | :--- |
| **UPI ID** | `advaita@fam` |
| **Provider** | FamPay / FamApp |
| **Beneficiary** | Advaita Chandra |
| **Interactive Payment App** | [supportadvaita](https://support.advaitachandra.in) |
| **Accepted Apps** | Google Pay, PhonePe, Paytm, BHIM, FamPay, Cred, any UPI app |

---

## 🥀 Why I Need Your Support

Building things on the internet while being a high school student comes with real financial friction:

1. **Server & Cloud Costs**: Keeping my personal digital garden ([advaitachandra.in](https://advaitachandra.in)), interactive platforms ([osho-documentary](https://github.com/w1tneess/osho-documentary)), database instances, and experimental tools running requires recurring domain and hosting renewals.
2. **Learning & Books**: I read deeply into philosophy (J. Krishnamurti, Albert Camus, Dostoevsky, Nietzsche, Kafka), history, and computer science. Quality physical books, papers, and courses cost real money.
3. **Hardware & Photography Gear**: Developing software, testing builds, and capturing photography requires hardware upkeep, storage disks, and equipment maintenance.
4. **No Intrusive Ads or Paywalls**: I refuse to put annoying pop-up ads, affiliate clickbait, or artificial paywalls on my websites. I believe the internet should be quiet, beautifully crafted, and open to all.

Because I don't have a salaried job or corporate backing, **patron support from people who appreciate what I build is what keeps me going**.

---

## 🍵 What Your Contribution Fuels

Every contribution, whether small or large, has an immediate tangible impact on my ability to create:

- **₹50 — *A Cup of Chai***  
  Fuel for late-night coding, debugging sessions, and quiet reflection after a long day of school.
- **₹150 — *A Good Book / Reading Fund***  
  Helps me buy a physical copy of a philosophical text, literature, or programming book.
- **₹500 — *Domain & Server Lifeline***  
  Funds domain renewals, cloud compute, or API tokens to keep my software experiments live on the internet.
- **₹1,000+ — *Patron of the Craft***  
  Substantial backing that relieves financial stress, helping me afford necessary hardware repairs, photography storage, and focus on ambitious open-source projects.
- **Custom Amount**  
  Any amount you feel comfortable contributing. Everything is appreciated.

---

## 🔨 Proof of Work (What I've Built)

Here is what your support fuels:

- **[advaitachandra.in](https://advaitachandra.in)** — My personal digital home: public notebook, essays on philosophy, data architecture notes, and photography.
- **[osho-documentary](https://github.com/w1tneess/osho-documentary)** — An interactive archival documentary exploring Osho and Rajneeshpuram with timelines, maps, and primary sources. Built with Next.js & TypeScript.
- **[declutter](https://github.com/w1tneess/declutter)** — A lightweight Windows utility in Python to safely organize messy directories, detect duplicate/large files, with instant preview before action.
- **Ongoing Experiments** — AI tools, creative computing, algorithmic art, and open-source utilities.

---

## 🛠️ Tech Stack & Development

**Stack:** React 19 · Vite · Tailwind CSS v4 · Lucide React · `qrcode`

- Single-page, fully responsive layout (320px phones → desktop). QR card stacks under the payment widget on mobile.
- Light / Dark / System theming (class-based `dark` variant, no flash on load, `theme-color` meta for mobile browser UI).
- Dynamic UPI QR code that updates with the selected amount and note; on phones it can be saved to the gallery and scanned from any UPI app.
- The mobile "Pay via any UPI app" link omits the amount (copied to clipboard instead), since UPI apps often decline website links to personal UPI IDs that arrive with a pre-filled amount.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # serve the production build
```

Key files: `src/components/SupportPage.jsx` (page), `src/config/payment.js` (UPI ID, UPI link builder), `src/lib/qrcode.js` (QR SVG + downloadable pay card), `src/hooks/useTheme.js` (theme).

Deploys to Vercel (`vercel.json`) or Cloudflare (`wrangler.jsonc`).

---

## 📬 Leave a Note / Get in Touch

If you send a contribution, please feel free to reach out with a book recommendation, feedback on my projects, or just to say hello:

- **Email**: [advaita974@gmail.com](mailto:advaita974@gmail.com)
- **Twitter / X**: [@w1tneess_](https://x.com/w1tneess_)
- **Instagram**: [@adva1ta_](https://instagram.com/adva1ta_)
- **Website**: [advaitachandra.in](https://advaitachandra.in)

Thank you for helping a young student and builder stay independent.
