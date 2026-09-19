// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  let isMenuOpen = false;

  function setMenuOpen(open) {
    isMenuOpen = open;
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (open) {
      mobileMenu.removeAttribute('hidden');
      mobileMenu.classList.remove('max-h-0', 'opacity-0');
      mobileMenu.classList.add('max-h-[28rem]', 'opacity-100');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      const firstLink = mobileMenu.querySelector('nav a, input');
      firstLink?.focus();
    } else {
      mobileMenu.classList.remove('max-h-[28rem]', 'opacity-100');
      mobileMenu.classList.add('max-h-0', 'opacity-0');
      mobileMenu.setAttribute('hidden', '');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  if (menuToggle && mobileMenu) {
    mobileMenu.setAttribute('hidden', '');

    menuToggle.addEventListener('click', function() {
      setMenuOpen(!isMenuOpen);
    });

    menuToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        e.preventDefault();
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    mobileMenu.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function() {
        setMenuOpen(false);
      });
    });
  }

  function handleScroll() {
    if (!header) return;
    const currentScroll = window.scrollY;

    if (currentScroll > 20) {
      header.classList.remove('border-transparent', 'py-6');
      header.classList.add('bg-white/90', 'backdrop-blur-md', 'border-gray-100');
      header.style.paddingTop = '1.1rem';
      header.style.paddingBottom = '1.1rem';
    } else {
      header.classList.remove('bg-white/90', 'backdrop-blur-md', 'border-gray-100');
      header.classList.add('border-transparent', 'py-6');
      header.style.paddingTop = '';
      header.style.paddingBottom = '';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});
