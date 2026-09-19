// Posts filter and sort functionality
(function() {
  const grid = document.getElementById('posts-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sortBtns = document.querySelectorAll('.sort-btn');

  if (!grid) return;

  let currentFilter = 'all';
  let currentSort = 'newest';
  let lastVisibleCount = -1;

  const announce = (message) => window.siteA11y?.announce(message);

  function setToggleState(buttons, activeBtn) {
    buttons.forEach(b => {
      const isActive = b === activeBtn;
      b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      b.classList.toggle('bg-gray-900', isActive);
      b.classList.toggle('text-white', isActive);
      b.classList.toggle('bg-gray-100', !isActive);
      b.classList.toggle('text-gray-600', !isActive);
    });
  }

  function updatePosts() {
    const posts = Array.from(grid.querySelectorAll('.post-item'));

    posts.forEach(post => {
      const category = post.dataset.category;
      if (currentFilter === 'all' || category === currentFilter) {
        post.style.display = '';
      } else {
        post.style.display = 'none';
      }
    });

    const visiblePosts = posts.filter(p => p.style.display !== 'none');
    visiblePosts.sort((a, b) => {
      if (currentSort === 'newest') {
        return b.dataset.date.localeCompare(a.dataset.date);
      }
      return a.dataset.date.localeCompare(b.dataset.date);
    });

    visiblePosts.forEach(post => grid.appendChild(post));

    if (visiblePosts.length !== lastVisibleCount) {
      lastVisibleCount = visiblePosts.length;
      announce(`${visiblePosts.length} post${visiblePosts.length === 1 ? '' : 's'} shown`);
    }
  }

  filterBtns.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.category === 'all' ? 'true' : 'false');
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.category;
      setToggleState(filterBtns, btn);
      updatePosts();
    });
  });

  sortBtns.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.dataset.sort === 'newest' ? 'true' : 'false');
    btn.addEventListener('click', () => {
      currentSort = btn.dataset.sort;
      setToggleState(sortBtns, btn);
      updatePosts();
    });
  });
})();
