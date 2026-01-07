// Inline search functionality with Fuse.js
(function() {
  let fuse = null;
  let searchIndex = null;

  // Desktop elements
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const resultsList = document.getElementById('search-results-list');
  const noResults = document.getElementById('search-no-results');

  // Mobile elements
  const mobileInput = document.getElementById('mobile-search-input');
  const mobileResultsContainer = document.getElementById('mobile-search-results');
  const mobileResultsList = document.getElementById('mobile-search-results-list');
  const mobileNoResults = document.getElementById('mobile-search-no-results');

  // Load search index
  async function loadSearchIndex() {
    if (searchIndex) return;
    try {
      const response = await fetch('/search.json');
      searchIndex = await response.json();
      fuse = new Fuse(searchIndex, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'excerpt', weight: 0.3 },
          { name: 'content', weight: 0.2 },
          { name: 'category', weight: 0.05 },
          { name: 'tags', weight: 0.05 }
        ],
        threshold: 0.3,
        includeMatches: true,
        minMatchCharLength: 2
      });
    } catch (error) {
      console.error('Failed to load search index:', error);
    }
  }

  // Render results HTML
  function renderResults(results) {
    return results.map(result => {
      const item = result.item;
      const date = new Date(item.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      return `
        <a href="${item.url}" class="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
          <div class="flex items-center gap-2 mb-0.5">
            ${item.category ? `<span class="text-xs font-medium text-gray-500">${item.category}</span>` : ''}
            <span class="text-xs text-gray-400">${date}</span>
          </div>
          <h4 class="text-sm font-medium text-gray-900">${item.title}</h4>
        </a>
      `;
    }).join('');
  }

  // Perform search and update UI
  function performSearch(query, container, list, noResultsEl) {
    if (!query || query.length < 2) {
      container.classList.add('hidden');
      return;
    }

    if (!fuse) {
      loadSearchIndex().then(() => performSearch(query, container, list, noResultsEl));
      return;
    }

    const results = fuse.search(query, { limit: 8 });

    if (results.length === 0) {
      list.classList.add('hidden');
      noResultsEl.classList.remove('hidden');
      container.classList.remove('hidden');
    } else {
      list.innerHTML = renderResults(results);
      list.classList.remove('hidden');
      noResultsEl.classList.add('hidden');
      container.classList.remove('hidden');
    }
  }

  // Hide results when clicking outside
  function handleClickOutside(e) {
    if (input && resultsContainer && !input.contains(e.target) && !resultsContainer.contains(e.target)) {
      resultsContainer.classList.add('hidden');
    }
    if (mobileInput && mobileResultsContainer && !mobileInput.contains(e.target) && !mobileResultsContainer.contains(e.target)) {
      mobileResultsContainer.classList.add('hidden');
    }
  }

  // Debounce helper
  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Setup desktop search
  if (input && resultsContainer && resultsList && noResults) {
    input.addEventListener('focus', loadSearchIndex);

    input.addEventListener('input', debounce((e) => {
      performSearch(e.target.value.trim(), resultsContainer, resultsList, noResults);
    }, 200));

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        resultsContainer.classList.add('hidden');
        input.blur();
      }
    });
  }

  // Setup mobile search
  if (mobileInput && mobileResultsContainer && mobileResultsList && mobileNoResults) {
    mobileInput.addEventListener('focus', loadSearchIndex);

    mobileInput.addEventListener('input', debounce((e) => {
      performSearch(e.target.value.trim(), mobileResultsContainer, mobileResultsList, mobileNoResults);
    }, 200));

    mobileInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        mobileResultsContainer.classList.add('hidden');
        mobileInput.blur();
      }
    });
  }

  // Global click handler
  document.addEventListener('click', handleClickOutside);

  // Keyboard shortcut (Cmd/Ctrl + K) to focus search
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (input && window.innerWidth >= 768) {
        input.focus();
      } else if (mobileInput) {
        // Open mobile menu if not open, then focus search
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('max-h-0')) {
          menuToggle?.click();
        }
        setTimeout(() => mobileInput.focus(), 100);
      }
    }
  });
})();
