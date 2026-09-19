/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./content/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#1a1a1a',
        secondary: '#4b5563',
        accent: '#e5e7eb',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#1a1a1a',
              textDecoration: 'none',
              borderBottom: '1px solid #d1d5db',
              '&:hover': {
                borderBottomColor: '#1a1a1a',
              },
            },
            'h1, h2, h3, h4': {
              fontFamily: 'Playfair Display, serif',
              fontWeight: '500',
            },
            blockquote: {
              borderLeftColor: '#e5e7eb',
              fontStyle: 'italic',
              color: '#6b7280',
            },
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1a1a1a',
              color: '#e5e7eb',
              borderRadius: '0.75rem',
              padding: '1rem 1.25rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
            },
            img: {
              borderRadius: '0.75rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
