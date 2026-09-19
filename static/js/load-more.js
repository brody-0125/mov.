// Load More Posts functionality
(function() {
  function announce(message) {
    const region = document.getElementById('a11y-status');
    if (region && message) {
      region.textContent = '';
      window.setTimeout(() => {
        region.textContent = message;
      }, 50);
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function init() {
    const grid = document.getElementById('posts-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreContainer = document.getElementById('load-more-container');
    const totalInfo = document.getElementById('posts-total');

    if (!grid || !loadMoreBtn || !totalInfo) return;

    const perPage = parseInt(totalInfo.dataset.perPage, 10) || 6;
    const posts = Array.from(grid.querySelectorAll('.post-item'));

    function updateLoadMoreVisibility() {
      const hiddenPosts = posts.filter(p => p.classList.contains('hidden'));
      if (hiddenPosts.length > 0) {
        loadMoreContainer.classList.remove('hidden');
      } else {
        loadMoreContainer.classList.add('hidden');
      }
    }

    updateLoadMoreVisibility();

    loadMoreBtn.addEventListener('click', function() {
      const hiddenPosts = posts.filter(p => p.classList.contains('hidden'));
      const toShow = hiddenPosts.slice(0, perPage);

      toShow.forEach(function(post, index) {
        const reveal = function() {
          post.classList.remove('hidden');
          if (!prefersReducedMotion()) {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            requestAnimationFrame(function() {
              post.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              post.style.opacity = '1';
              post.style.transform = 'translateY(0)';
            });
          }
        };
        if (prefersReducedMotion()) {
          reveal();
        } else {
          setTimeout(reveal, index * 100);
        }
      });

      const delay = prefersReducedMotion() ? 0 : toShow.length * 100 + 400;
      setTimeout(function() {
        updateLoadMoreVisibility();
        announce(`${toShow.length} more post${toShow.length === 1 ? '' : 's'} loaded`);
        if (toShow[0]) {
          toShow[0].querySelector('a')?.focus();
        }
      }, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
