// Inline comment tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
  const commentTexts = document.querySelectorAll('.inline-comment-text');

  commentTexts.forEach(text => {
    const wrapper = text.closest('.inline-comment-wrapper');
    const tooltip = wrapper.querySelector('.inline-comment-tooltip');

    if (!tooltip) return;

    // Show tooltip on hover
    text.addEventListener('mouseenter', () => {
      tooltip.classList.remove('hidden');
    });

    wrapper.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
    });

    // Show tooltip on click for mobile
    text.addEventListener('click', (e) => {
      e.stopPropagation();
      // Hide all other tooltips
      document.querySelectorAll('.inline-comment-tooltip').forEach(t => {
        if (t !== tooltip) t.classList.add('hidden');
      });
      tooltip.classList.toggle('hidden');
    });
  });

  // Hide tooltips when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.inline-comment-tooltip').forEach(t => {
      t.classList.add('hidden');
    });
  });
});
