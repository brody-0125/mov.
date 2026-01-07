// Load More Posts functionality
(function() {
  function init() {
    const grid = document.getElementById('posts-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const loadMoreContainer = document.getElementById('load-more-container');
    const totalInfo = document.getElementById('posts-total');

    if (!grid || !loadMoreBtn || !totalInfo) return;

    const perPage = parseInt(totalInfo.dataset.perPage) || 6;
    const posts = Array.from(grid.querySelectorAll('.post-item'));

    function updateLoadMoreVisibility() {
      const hiddenPosts = posts.filter(function(p) {
        return p.classList.contains('hidden');
      });
      if (hiddenPosts.length > 0) {
        loadMoreContainer.classList.remove('hidden');
      } else {
        loadMoreContainer.classList.add('hidden');
      }
    }

    updateLoadMoreVisibility();

    loadMoreBtn.addEventListener('click', function() {
      const hiddenPosts = posts.filter(function(p) {
        return p.classList.contains('hidden');
      });
      const toShow = hiddenPosts.slice(0, perPage);

      toShow.forEach(function(post, index) {
        setTimeout(function() {
          post.classList.remove('hidden');
          post.style.opacity = '0';
          post.style.transform = 'translateY(20px)';
          requestAnimationFrame(function() {
            post.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
          });
        }, index * 100);
      });

      setTimeout(function() {
        updateLoadMoreVisibility();
      }, toShow.length * 100 + 400);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
