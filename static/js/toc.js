// Table of Contents scroll tracking
document.addEventListener('DOMContentLoaded', function() {
  const tocNav = document.getElementById('toc-nav');
  if (!tocNav) return;

  const tocLinks = tocNav.querySelectorAll('a');
  if (!tocLinks.length) return;

  // Get all headings that match TOC links
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

  // Track active heading
  function updateActiveHeading() {
    const scrollPosition = window.scrollY + 100; // Offset for header
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = (window.scrollY + windowHeight) >= (documentHeight - 50);

    let activeHeading = headings[0];

    // If at bottom of page, highlight last heading
    if (isAtBottom && headings.length > 0) {
      activeHeading = headings[headings.length - 1];
    } else {
      for (const heading of headings) {
        if (heading.element.offsetTop <= scrollPosition) {
          activeHeading = heading;
        }
      }
    }

    // Update active states
    tocLinks.forEach(link => link.classList.remove('active'));
    if (activeHeading) {
      activeHeading.link.classList.add('active');
    }
  }

  // Throttle scroll handler
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

  // Smooth scroll for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (target) {
          const offset = 80; // Header height
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Initial update
  updateActiveHeading();
});
