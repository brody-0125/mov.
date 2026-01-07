// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  let isMenuOpen = false;

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        mobileMenu.classList.remove('max-h-0', 'opacity-0');
        mobileMenu.classList.add('max-h-64', 'opacity-100');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.remove('max-h-64', 'opacity-100');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        isMenuOpen = false;
        mobileMenu.classList.remove('max-h-64', 'opacity-100');
        mobileMenu.classList.add('max-h-0', 'opacity-0');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // Scroll handling for header
  function handleScroll() {
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

  // Initial check
  handleScroll();
});
