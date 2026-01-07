---
title: "Shortcode Examples"
slug: "shortcode-examples"
date: 2026-01-05
categories: ["Design"]
tags: ["Shortcodes", "Features"]
featured: false
coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800"
readTime: "3 min read"
excerpt: "A showcase of all available shortcodes in this Hugo template."
---

This post demonstrates all the shortcodes available in this template.

## Callout Boxes

Use callouts to highlight important information.

### Info Callout

{{< callout type="info" title="Did you know?" >}}
This is an informational callout. Use it to share helpful tips or additional context.
{{< /callout >}}

### Warning Callout

{{< callout type="warning" title="Caution" >}}
This is a warning callout. Use it when users need to be careful about something.
{{< /callout >}}

### Error Callout

{{< callout type="error" title="Important" >}}
This is an error callout. Use it for critical warnings or errors.
{{< /callout >}}

### Success Callout

{{< callout type="success" title="Great job!" >}}
This is a success callout. Use it to celebrate achievements or confirm actions.
{{< /callout >}}

## Text Highlighting

You can {{< highlight color="yellow" >}}highlight text in yellow{{< /highlight >}} to draw attention.

Other colors available:
- {{< highlight color="green" >}}Green highlight{{< /highlight >}}
- {{< highlight color="blue" >}}Blue highlight{{< /highlight >}}
- {{< highlight color="red" >}}Red highlight{{< /highlight >}}
- {{< highlight color="purple" >}}Purple highlight{{< /highlight >}}
- {{< highlight color="gray" >}}Gray highlight{{< /highlight >}}

## Inline Comments

Add {{< comment note="This is a hidden annotation that appears on hover!" >}}inline comments{{< /comment >}} to provide additional context without cluttering the main text.

This is useful for {{< comment note="Annotations help readers understand complex topics better." >}}explaining complex concepts{{< /comment >}} or adding {{< comment note="Like citing sources or adding personal thoughts." >}}editorial notes{{< /comment >}}.

## Code Blocks

Standard code blocks with syntax highlighting:

```javascript
// JavaScript example
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

```python
# Python example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
```

## Footnotes

You can also use standard markdown footnotes[^1] for references and citations[^2].

[^1]: This is an example footnote with additional information.
[^2]: Footnotes are great for academic writing and blog posts that need citations.

## Combining Features

You can combine multiple features together:

{{< callout type="info" >}}
Remember to {{< highlight color="yellow" >}}save your work{{< /highlight >}} frequently!
{{< /callout >}}

---

That's all the shortcodes available in this template. Feel free to use them in your posts!
