# paytoadvaita

> Custom, zero-fee direct UPI payment and patron page for **Advaita Chandra** (`advaita@fam` on FamPay).

A dark-editorial, minimalist web application built to receive support for open-source tools, digital experiments, photography, and philosophical writings without relying on 5–10% middleman fees.

---

## ⚡ Features

- **Direct FamPay UPI**: Zero platform fees, instant bank/wallet settlement to `advaita@fam`.
- **Dynamic Vector QR Engine**: Re-renders in real-time vector SVG with pre-filled amount and transaction note.
- **Preset Contribution Tiers**:
  - ₹50 — *Cup of Chai* (Late-night coding fuel)
  - ₹150 — *Cold Brew / Book* (Nourishment for reading & research)
  - ₹500 — *Server & Domain Fuel* (Keeping independent tools & sites live)
  - ₹1,000 — *Patron of the Craft* (Backing long-term open-source projects)
  - *Custom Amount (₹)* numeric input.
- **Mobile One-Tap Launch**: Launches directly into Google Pay, PhonePe, Paytm, BHIM, FamPay, or Cred via `upi://pay`.
- **One-Click UPI Copy**: Copies `advaita@fam` with haptic/visual feedback.
- **Connected Projects Showcase**: Directly connects and displays:
  - `advaitachandra.in` (Personal Site & Notebook)
  - `osho-documentary` (Interactive Archival Platform)
  - `declutter` (Windows Desktop App)
  - GitHub (`@w1tneess`)
- **Ready-to-Paste Badges**: Built-in modal to copy Markdown/HTML badges for your GitHub repository READMEs and website footers.

---

## 🚀 Running Locally

```bash
# Clone or navigate to the directory
cd D:\Project\paytoadvaita

# Install dependencies (using bun or npm)
bun install
# or: npm install

# Start development server
bun run dev
# or: npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

---

## 📦 Building & Deployment

```bash
bun run build
# or: npm run build
```

This creates an optimized, static production bundle in `dist/`.

### Deploying to Vercel:
1. Push this directory to a new GitHub repo: `https://github.com/w1tneess/paytoadvaita`.
2. Import repository in [vercel.com](https://vercel.com).
3. Framework preset will automatically detect **Vite**.
4. Set custom domain (e.g. `pay.advaitachandra.in` or `paytoadvaita.vercel.app`).

---

## 🏷️ How to Link in Other Repositories

Add this badge to your README.md files (e.g. in `declutter` or `osho-documentary`):

```markdown
[![Support via paytoadvaita](https://img.shields.io/badge/Support-paytoadvaita-C2956A?style=for-the-badge&logo=googlepay&logoColor=white)](https://paytoadvaita.vercel.app)
```

Or a simple text link:
```markdown
[Support my work on paytoadvaita](https://paytoadvaita.vercel.app)
```

---

## 🛠️ Stack

- **React 19**
- **Vite 6**
- **Tailwind CSS v4**
- **Lucide Icons**
- **qrcode** (Offline vector SVG generation)
- **canvas-confetti**
