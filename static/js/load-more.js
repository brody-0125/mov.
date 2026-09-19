// Load More Posts functionality
(function() {
  const announce = (message) => window.siteA11y?.announce(message);

  function init() {
    const grid = document.getElementById('posts-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreContainer = document.getElementById('load-more-container');
    const totalInfo = document.getElementById('posts-total');

    if (!grid || !loadMoreBtn || !loadMoreContainer || !totalInfo) return;

    const perPage = parseInt(totalInfo.dataset.perPage, 10) || 6;
    const posts = Array.from(grid.querySelectorAll('.post-item'));

    function updateLoadMoreVisibility() {
      const hasHidden = posts.some(p => p.classList.contains('hidden'));
      loadMoreContainer.classList.toggle('hidden', !hasHidden);
    }

    updateLoadMoreVisibility();

    loadMoreBtn.addEventListener('click', function() {
      const hiddenPosts = posts.filter(p => p.classList.contains('hidden'));
      const toShow = hiddenPosts.slice(0, perPage);
      const reduceMotion = window.siteA11y?.prefersReducedMotion() ?? false;

      toShow.forEach(function(post, index) {
        const reveal = function() {
          post.classList.remove('hidden');
          if (!reduceMotion) {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            requestAnimationFrame(function() {
              post.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              post.style.opacity = '1';
              post.style.transform = 'translateY(0)';
            });
          }
        };
        if (reduceMotion) {
          reveal();
        } else {
          setTimeout(reveal, index * 100);
        }
      });

      const delay = reduceMotion ? 0 : toShow.length * 100 + 400;
      setTimeout(function() {
        updateLoadMoreVisibility();
        announce(`${toShow.length} more post${toShow.length === 1 ? '' : 's'} loaded`);
        toShow[0]?.querySelector('a')?.focus();
      }, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
