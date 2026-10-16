import QRCode from 'qrcode'

/**
 * Generate a clean vector SVG for the UPI QR Code with adaptive theme coloring
 * @param {string} text - The UPI pay URI
 * @param {'light'|'dark'} theme - Current visual mode
 * @returns {Promise<string>} - SVG markup string
 */
export async function generateQrSvg(text, theme = 'dark') {
  try {
    const isDark = theme === 'dark'
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
 * Generate a high-resolution PNG data URL for downloading
 * @param {string} text - The UPI pay URI
 * @param {'light'|'dark'} theme - Current visual mode
 * @returns {Promise<string>} - PNG Data URL
 */
export async function generateQrPng(text, theme = 'dark') {
  try {
    const isDark = theme === 'dark'
    const dataUrl = await QRCode.toDataURL(text, {
      margin: 2,
      scale: 12,
      color: {
        dark: isDark ? '#F8F6F0' : '#1D1D1F',
        light: isDark ? '#0C0B0A' : '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
    return dataUrl
  } catch (err) {
    console.error('Failed to generate QR PNG:', err)
    return ''
  }
}
