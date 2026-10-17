// Runs before first paint to avoid a theme flash. External (not inline) so the CSP can drop 'unsafe-inline' for scripts.
(function () {
  try {
    var saved = localStorage.getItem('supportadvaita_theme')
    var dark = saved === 'dark' || ((!saved || saved === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  } catch (e) {}
})()
