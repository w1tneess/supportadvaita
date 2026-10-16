import QRCode from 'qrcode'

/**
 * Generate a clean vector SVG for the UPI QR Code
 * @param {string} text - The UPI pay URI
 * @returns {Promise<string>} - SVG markup string
 */
export async function generateQrSvg(text) {
  try {
    const svg = await QRCode.toString(text, {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#F8F6F0',      // Warm ivory foreground
        light: '#00000000',   // Transparent background
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
 * @returns {Promise<string>} - PNG Data URL
 */
export async function generateQrPng(text) {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      margin: 2,
      scale: 12,
      color: {
        dark: '#0F0E0D',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
    return dataUrl
  } catch (err) {
    console.error('Failed to generate QR PNG:', err)
    return ''
  }
}
