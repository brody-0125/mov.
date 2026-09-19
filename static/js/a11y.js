(function() {
  const statusEl = document.getElementById('a11y-status');
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  window.siteA11y = {
    announce(message) {
      if (!statusEl || !message) return;
      statusEl.textContent = '';
      window.setTimeout(() => {
        statusEl.textContent = message;
      }, 50);
    },
    prefersReducedMotion() {
      return reduceMotionQuery.matches;
    }
  };
})();
