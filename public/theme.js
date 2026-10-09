'use strict';
(() => {
  let preference = null;
  try { preference = localStorage.getItem('ciphercamp-theme'); } catch {}
  const system = window.matchMedia?.('(prefers-color-scheme: dark)');
  let theme = preference === 'dark' || preference === 'light' ? preference : (system?.matches ? 'dark' : 'light');
  const icon = dark => dark
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A9 9 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"/></svg>';
  function apply() {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#090c12' : '#f7f9fc');
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    button.innerHTML = icon(theme === 'dark') + '<span>' + (theme === 'dark' ? 'Light mode' : 'Dark mode') + '</span>';
    button.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.title = 'Theme preference stays in this browser';
  }
  function init() {
    apply();
    const button = document.getElementById('theme-toggle');
    if (button) button.onclick = () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      preference = theme;
      try { localStorage.setItem('ciphercamp-theme', theme); } catch {}
      apply();
    };
  }
  apply(); // Set colors before the stylesheet paints.
  system?.addEventListener?.('change', event => {
    if (preference !== 'dark' && preference !== 'light') {
      theme = event.matches ? 'dark' : 'light';
      apply();
    }
  });
  window.CAMP_THEME = {init};
})();
