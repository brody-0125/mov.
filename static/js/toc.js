// Table of Contents scroll tracking
document.addEventListener('DOMContentLoaded', function() {
  const tocNavs = [
    document.getElementById('toc-nav'),
    document.getElementById('toc-nav-mobile')
  ].filter(Boolean);

  if (!tocNavs.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  tocNavs.forEach(tocNav => initTocNav(tocNav));

  function initTocNav(tocNav) {
    const tocLinks = tocNav.querySelectorAll('a');
    if (!tocLinks.length) return;

    const headings = [];
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const heading = document.getElementById(href.slice(1));
        if (heading) {
          headings.push({ element: heading, link: link });
        }
      }
    });

    if (!headings.length) return;

    function updateActiveHeading() {
      const scrollPosition = window.scrollY + 100;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = (window.scrollY + windowHeight) >= (documentHeight - 50);

      let activeHeading = headings[0];

      if (isAtBottom && headings.length > 0) {
        activeHeading = headings[headings.length - 1];
      } else {
        for (const heading of headings) {
          if (heading.element.offsetTop <= scrollPosition) {
            activeHeading = heading;
          }
        }
      }

      tocLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      });
      if (activeHeading) {
        activeHeading.link.classList.add('active');
        activeHeading.link.setAttribute('aria-current', 'location');
      }
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateActiveHeading();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    tocLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.getElementById(href.slice(1));
          if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
        }
      });
    });

    updateActiveHeading();
  }
});
