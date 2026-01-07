// Posts filter and sort functionality
(function() {
  const grid = document.getElementById('posts-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortBtns = document.querySelectorAll('.sort-btn');

  if (!grid) return;

  let currentFilter = 'all';
  let currentSort = 'newest';

  function updatePosts() {
    const posts = Array.from(grid.querySelectorAll('.post-item'));

    // Filter
    posts.forEach(post => {
      const category = post.dataset.category;
      if (currentFilter === 'all' || category === currentFilter) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });

    // Sort visible posts
    const visiblePosts = posts.filter(p => p.style.display !== 'none');
    visiblePosts.sort((a, b) => {
      if (currentSort === 'newest') {
        return b.dataset.date.localeCompare(a.dataset.date);
      } else {
        return a.dataset.date.localeCompare(b.dataset.date);
      }
    });

    // Re-append sorted posts
    visiblePosts.forEach(post => grid.appendChild(post));
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.category;

      filterBtns.forEach(b => {
        b.classList.remove('bg-gray-900', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-600');
      });
      btn.classList.remove('bg-gray-100', 'text-gray-600');
      btn.classList.add('bg-gray-900', 'text-white');

      updatePosts();
    });
  });

  // Sort click handlers
  sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSort = btn.dataset.sort;

      sortBtns.forEach(b => {
        b.classList.remove('bg-gray-900', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-600');
      });
      btn.classList.remove('bg-gray-100', 'text-gray-600');
      btn.classList.add('bg-gray-900', 'text-white');

      updatePosts();
    });
  });
})();
