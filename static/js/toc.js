// Table of Contents scroll tracking
document.addEventListener('DOMContentLoaded', function() {
  const tocNavs = [
    document.getElementById('toc-nav'),
    document.getElementById('toc-nav-mobile')
  ].filter(Boolean);

  if (!tocNavs.length) return;

  const prefersReducedMotion = window.siteA11y?.prefersReducedMotion() ?? false;
  const primaryLinks = tocNavs[0].querySelectorAll('a');
  const headings = [];

  primaryLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const heading = document.getElementById(href.slice(1));
    if (heading) {
      headings.push({ element: heading, href });
    }
  });

  if (!headings.length) return;

  const linksByHref = new Map();
  tocNavs.forEach(nav => {
    nav.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (!linksByHref.has(href)) linksByHref.set(href, []);
      linksByHref.get(href).push(link);
    });
  });

  let activeHref = '';

  function setActiveHref(href) {
    if (href === activeHref) return;
    activeHref = href;
    linksByHref.forEach((links, linkHref) => {
      links.forEach(link => {
        const isActive = linkHref === href;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }

  function updateActiveHeading() {
    const scrollPosition = window.scrollY + 100;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = (window.scrollY + windowHeight) >= (documentHeight - 50);

    let active = headings[0];

    if (isAtBottom) {
      active = headings[headings.length - 1];
    } else {
      for (const entry of headings) {
        if (entry.element.offsetTop <= scrollPosition) {
          active = entry;
        }
      }
    }

    setActiveHref(active.href);
  }

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function() {
      updateActiveHeading();
      ticking = false;
    });
  }, { passive: true });

  linksByHref.forEach(links => {
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });
  });

  updateActiveHeading();
});
