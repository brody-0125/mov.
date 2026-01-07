# Mov. - Minimalist Blog Template

<p align="center">
  <img src="logo.png" alt="Mov. Logo" width="480">
</p>

<p align="center">
  English | <a href="README_ko.md">한국어</a>
</p>

A clean, modern blog template built with Hugo and Tailwind CSS. Designed for clarity, performance, and the love of writing.

*Mov. = Mono + Groove*

## Features

- **Minimalist Design** - Clean typography with Playfair Display and Inter fonts
- **Responsive Layout** - Mobile-first design that works on all devices
- **Fast Performance** - Static site generation with Hugo
- **Search** - Client-side fuzzy search powered by Fuse.js
- **Category Filtering** - Filter posts by category on the posts page
- **Date Sorting** - Sort posts by newest or oldest
- **Load More** - Progressive loading of posts on homepage
- **Table of Contents** - Auto-generated sticky TOC for long articles
- **Code Highlighting** - Syntax highlighting with copy button
- **Math Support** - KaTeX integration for mathematical expressions
- **Callout Boxes** - Info, warning, error, and success callouts

## Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version recommended)
- Node.js 18+

### Install Hugo

```bash
# macOS
brew install hugo

# Windows
choco install hugo-extended

# Linux
sudo apt install hugo
```

## Quick Start

```bash
# Install dependencies
npm install

# Build Tailwind CSS (required first time)
npm run css:build

# Start development server
npm run dev
```

Visit `http://localhost:1313` to see your blog.

## Development Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run css:build` | Build Tailwind CSS |
| `npm run css:dev` | Watch CSS changes |
| `npm run dev` | Start Hugo dev server |
| `npm run build` | Build for production |

## Project Structure

```
├── content/
│   └── posts/           # Blog posts (Markdown)
├── data/
│   └── authors.yaml     # Author information
├── layouts/
│   ├── _default/        # Default templates
│   │   ├── baseof.html  # Base HTML template
│   │   ├── single.html  # Post detail page
│   │   └── list.html    # List/archive pages
│   ├── partials/        # Reusable components
│   │   ├── header.html  # Site header with search
│   │   ├── footer.html  # Site footer
│   │   ├── post-card.html
│   │   └── toc.html     # Table of contents
│   └── shortcodes/      # Custom shortcodes
├── static/
│   ├── css/main.css     # Compiled CSS
│   └── js/
│       ├── main.js      # Mobile menu, scroll header
│       ├── search.js    # Search functionality
│       ├── sort.js      # Filter/sort for posts page
│       ├── load-more.js # Load more posts
│       ├── copy-code.js # Code copy button
│       └── toc.js       # TOC scroll tracking
├── assets/
│   └── css/main.css     # Tailwind source
└── hugo.toml            # Hugo configuration
```

## Creating Posts

Create a new Markdown file in `content/posts/`:

```yaml
---
title: "Your Post Title"
slug: "your-post-slug"
date: 2024-01-01
categories: ["Design"]
tags: ["Tag1", "Tag2"]
author: "author-id"
featured: true
coverImage: "https://example.com/image.jpg"
readTime: "5 min read"
excerpt: "A brief description of your post."
math: true  # Enable KaTeX (optional)
---

Your content here...
```

### Example: Adding Your First Post

1. Create `content/posts/my-first-post.md`:

```markdown
---
title: "My First Post"
slug: "my-first-post"
date: 2024-01-15
categories: ["Tech"]
tags: ["Blog", "Hugo"]
author: "john-doe"
featured: false
coverImage: "https://images.unsplash.com/photo-xxx"
readTime: "3 min read"
excerpt: "Welcome to my new blog built with Hugo."
---

## Hello World

This is my first blog post. Here's what I learned today...

### Code Example

\`\`\`javascript
console.log("Hello, World!");
\`\`\`
```

2. Add your author info to `data/authors.yaml`:

```yaml
john-doe:
  name: "John Doe"
  bio: "Developer & Writer"
  avatar: "https://example.com/john.jpg"
```

3. Start the dev server and see your post:

```bash
npm run dev
```

### Categories

Categories are automatically created when you use them in posts. Default categories used in the template:

- `Design` - Visual design, UI/UX topics
- `Development` - Programming, code tutorials
- `Lifestyle` - Personal, productivity topics
- `Tech` - Technology news and reviews

To add a new category, simply use it in your post's front matter:

```yaml
categories: ["Photography"]
```

The category will automatically appear in the navigation filter.

## Shortcodes

### Callout Boxes

```markdown
{{</* callout type="info" title="Note" */>}}
This is an informational callout.
{{</* /callout */>}}
```

Available types: `info`, `warning`, `error`, `success`

## Customization

### Site Configuration

Edit `hugo.toml` to customize:

```toml
title = "Mov."

[params]
  blogName = "Mov."
  blogDescription = "Your blog description"
```

### Styling

1. Edit `assets/css/main.css` for custom styles
2. Run `npm run css:build` after changes
3. Tailwind configuration in `tailwind.config.js`

### Authors

Add authors in `data/authors.yaml`:

```yaml
author-id:
  name: "Author Name"
  bio: "Short bio"
  avatar: "https://example.com/avatar.jpg"
```

## Build for Production

```bash
npm run css:build
npm run build
```

Output will be in the `public/` directory.

## License

MIT License

---

Built with [Hugo](https://gohugo.io) and [Tailwind CSS](https://tailwindcss.com)
