/* Toggle buttons for abstracts / summaries on the Research, Talks, and Teaching pages.
   A button with [data-toggle-panel] shows/hides the element named in its aria-controls.
   Visiting page.html#entry-id opens that entry's panel automatically. */
(function () {
  function setOpen(btn, open) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-toggle-panel]') : null;
    if (!btn) return;
    setOpen(btn, btn.getAttribute('aria-expanded') !== 'true');
  });

  function openFromHash() {
    if (!location.hash) return;
    var entry = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!entry) return;
    var btn = entry.querySelector('[data-toggle-panel]');
    if (btn) setOpen(btn, true);
  }

  if (document.readyState !== 'loading') openFromHash();
  else document.addEventListener('DOMContentLoaded', openFromHash);
  window.addEventListener('hashchange', openFromHash);
})();
