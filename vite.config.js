import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Preload the above-the-fold font files (hashed names are only known after bundling), so the
// headline doesn't reflow when the web font swaps in (measured CLS ~0.1 without this)
const PRELOAD_FONTS = [/instrument-serif-latin-400-normal-.*\.woff2$/, /plus-jakarta-sans-latin-wght-normal-.*\.woff2$/]
const preloadFonts = () => ({
  name: 'preload-fonts',
  apply: 'build',
  transformIndexHtml(html, { bundle }) {
    if (!bundle) return html
    return Object.keys(bundle)
      .filter((file) => PRELOAD_FONTS.some((re) => re.test(file)))
      .map((file) => ({
        tag: 'link',
        attrs: { rel: 'preload', href: `/${file}`, as: 'font', type: 'font/woff2', crossorigin: '' },
        injectTo: 'head-prepend',
      }))
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  build: {
    sourcemap: false, // don't ship source maps publicly
    // Never inline fonts as data: URIs — the CSP's font-src 'self' blocks them (small subsets were silently failing)
    assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/.test(file) ? false : undefined),
    reportCompressedSize: true,
  },
  server: { port: 5173, open: false },
})
