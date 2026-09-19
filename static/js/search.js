// Inline search with combobox keyboard support (Fuse.js)
(function() {
  let fuse = null;
  let searchIndex = null;
  let indexLoadPromise = null;

  const announce = (message) => window.siteA11y?.announce(message);

  function createSearchController(config) {
    const { input, resultsContainer, resultsList, noResults } = config;

    if (!input || !resultsContainer || !resultsList || !noResults) {
      return null;
    }

    let activeIndex = -1;
    let optionNodes = [];

    function setExpanded(expanded) {
      input.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    function clearActiveOption() {
      optionNodes.forEach(node => node.setAttribute('aria-selected', 'false'));
      input.setAttribute('aria-activedescendant', '');
      activeIndex = -1;
    }

    function setActiveOption(index) {
      if (!optionNodes.length) {
        clearActiveOption();
        return;
      }
      const clamped = Math.max(0, Math.min(index, optionNodes.length - 1));
      optionNodes.forEach((node, i) => {
        node.setAttribute('aria-selected', i === clamped ? 'true' : 'false');
      });
      input.setAttribute('aria-activedescendant', optionNodes[clamped].id);
      activeIndex = clamped;
      optionNodes[clamped].scrollIntoView({ block: 'nearest' });
    }

    function renderResults(results) {
      return results.map((result, index) => {
        const item = result.item;
        const date = new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        const optionId = `${input.id}-option-${index}`;

        return `
          <a href="${item.url}" id="${optionId}" role="option" aria-selected="false" class="block px-4 py-3 hover:bg-gray-50 focus-visible:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 outline-none">
            <div class="flex items-center gap-2 mb-0.5">
              ${item.category ? `<span class="text-xs font-medium text-gray-600">${item.category}</span>` : ''}
              <span class="text-xs text-gray-600">${date}</span>
            </div>
            <span class="text-sm font-medium text-gray-900">${item.title}</span>
          </a>
        `;
      }).join('');
    }

    function closeResults() {
      resultsContainer.classList.add('hidden');
      setExpanded(false);
      clearActiveOption();
      optionNodes = [];
    }

    function containsTarget(target) {
      return input.contains(target) || resultsContainer.contains(target);
    }

    function performSearch(query) {
      if (!query || query.length < 2) {
        closeResults();
        return;
      }

      if (!fuse) {
        loadSearchIndex().then(() => performSearch(query));
        return;
      }

      const results = fuse.search(query, { limit: 8 });

      if (results.length === 0) {
        resultsList.innerHTML = '';
        resultsList.classList.add('hidden');
        noResults.classList.remove('hidden');
        resultsContainer.classList.remove('hidden');
        setExpanded(true);
        clearActiveOption();
        announce('No search results');
      } else {
        resultsList.innerHTML = renderResults(results);
        resultsList.classList.remove('hidden');
        noResults.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        setExpanded(true);
        optionNodes = Array.from(resultsList.querySelectorAll('[role="option"]'));
        clearActiveOption();
        announce(`${results.length} result${results.length === 1 ? '' : 's'}`);
      }
    }

    input.addEventListener('focus', loadSearchIndex);

    input.addEventListener('input', debounce((e) => {
      performSearch(e.target.value.trim());
    }, 200));

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeResults();
        input.blur();
        return;
      }

      if (!optionNodes.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveOption(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveOption(activeIndex <= 0 ? optionNodes.length - 1 : activeIndex - 1);
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        optionNodes[activeIndex].click();
      }
    });

    return { closeResults, containsTarget };
  }

  const desktop = createSearchController({
    input: document.getElementById('search-input'),
    resultsContainer: document.getElementById('search-results'),
    resultsList: document.getElementById('search-results-list'),
    noResults: document.getElementById('search-no-results')
  });

  const mobile = createSearchController({
    input: document.getElementById('mobile-search-input'),
    resultsContainer: document.getElementById('mobile-search-results'),
    resultsList: document.getElementById('mobile-search-results-list'),
    noResults: document.getElementById('mobile-search-no-results')
  });

  function loadSearchIndex() {
    if (searchIndex) return Promise.resolve();
    if (indexLoadPromise) return indexLoadPromise;

    indexLoadPromise = fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        searchIndex = data;
        fuse = new Fuse(searchIndex, {
          keys: [
            { name: 'title', weight: 0.4 },
            { name: 'excerpt', weight: 0.3 },
            { name: 'content', weight: 0.2 },
            { name: 'category', weight: 0.05 },
            { name: 'tags', weight: 0.05 }
          ],
          threshold: 0.3,
          minMatchCharLength: 2
        });
      })
      .catch(error => {
        indexLoadPromise = null;
        console.error('Failed to load search index:', error);
      });

    return indexLoadPromise;
  }

  function handleClickOutside(e) {
    if (desktop && !desktop.containsTarget(e.target)) {
      desktop.closeResults();
    }
    if (mobile && !mobile.containsTarget(e.target)) {
      mobile.closeResults();
    }
  }

  function debounce(fn, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  document.addEventListener('click', handleClickOutside);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.getElementById('search-input');
      const mobileInput = document.getElementById('mobile-search-input');
      if (input && window.innerWidth >= 768) {
        input.focus();
      } else if (mobileInput) {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        if (menuToggle && menuToggle.getAttribute('aria-expanded') !== 'true') {
          menuToggle.click();
        }
        window.setTimeout(() => mobileInput.focus(), 150);
      }
    }
  });
})();
