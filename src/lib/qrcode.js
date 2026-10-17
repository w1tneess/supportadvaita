// Loaded on demand so the encoder stays out of the initial bundle and the page paints first
let qrModule
const loadQRCode = () => (qrModule ??= import('qrcode').then((m) => m.default))

/**
 * Generate a clean vector SVG for the UPI QR Code with adaptive theme coloring
 * @param {string} text - The UPI pay URI
 * @param {'light'|'dark'} theme - Current visual mode
 * @returns {Promise<string>} - SVG markup string
 */
export async function generateQrSvg(text, theme = 'dark') {
  try {
    const isDark = theme === 'dark'
    const QRCode = await loadQRCode()
    const svg = await QRCode.toString(text, {
      type: 'svg',
      margin: 1,
      color: {
        dark: isDark ? '#F8F6F0' : '#1D1D1F', // Adaptive foreground
        light: '#00000000',                  // Transparent background
      },
      errorCorrectionLevel: 'M',
    })
    return svg
  } catch (err) {
    console.error('Failed to generate QR SVG:', err)
    return ''
  }
}

/**
 * Generate a downloadable PNG "pay card": dark-on-white QR (UPI apps' gallery scanners often
 * fail on inverted codes) with the payee and amount printed underneath so the saved image is
 * self-explanatory in a photo gallery.
 * @param {string} text - The UPI pay URI
 * @param {{ title?: string, subtitle?: string, amount?: string }} caption
 * @returns {Promise<Blob|null>} - PNG blob
 */
export async function generateQrPng(text, { title = '', subtitle = '', amount = '' } = {}) {
  try {
    const QRCode = await loadQRCode()
    const qr = document.createElement('canvas')
    await QRCode.toCanvas(qr, text, {
      margin: 4,
      width: 720,
      color: { dark: '#111111', light: '#FFFFFF' },
      errorCorrectionLevel: 'M',
    })

    const pad = 60
    const W = qr.width + pad * 2
    const H = qr.height + pad + 220
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, W, H)
    ctx.drawImage(qr, pad, pad)

    const font = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#111111'
    let y = pad + qr.height + 60
    if (amount) {
      ctx.font = `700 56px ${font}`
      ctx.fillText(amount, W / 2, y)
      y += 56
    }
    ctx.font = `600 34px ${font}`
    ctx.fillText(title, W / 2, y)
    ctx.font = `400 28px ui-monospace, Menlo, Consolas, monospace`
    ctx.fillStyle = '#555555'
    ctx.fillText(subtitle, W / 2, y + 44)

    return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  } catch (err) {
    console.error('Failed to generate QR PNG:', err)
    return null
  }
}
