// Inline comment tooltip — keyboard and screen reader friendly
document.addEventListener('DOMContentLoaded', function() {
  const triggers = document.querySelectorAll('.inline-comment-trigger');

  function closeAll(except) {
    triggers.forEach(trigger => {
      const tooltipId = trigger.getAttribute('aria-controls');
      const tooltip = tooltipId ? document.getElementById(tooltipId) : null;
      if (tooltip && tooltip !== except) {
        tooltip.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  triggers.forEach(trigger => {
    const tooltipId = trigger.getAttribute('aria-controls');
    const tooltip = tooltipId ? document.getElementById(tooltipId) : null;
    if (!tooltip) return;

    function setOpen(open) {
      tooltip.classList.toggle('hidden', !open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = tooltip.classList.contains('hidden');
      closeAll(willOpen ? tooltip : null);
      setOpen(willOpen);
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    });
  });

  document.addEventListener('click', () => closeAll(null));
});
