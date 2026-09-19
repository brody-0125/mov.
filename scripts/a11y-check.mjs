#!/usr/bin/env node
/**
 * Static HTML accessibility check with axe-core + jsdom (no browser driver).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import axe from 'axe-core';

const publicDir = join(process.cwd(), 'public');

const candidates = [
  'index.html',
  'posts/index.html',
  'about/index.html',
  'contact/index.html'
];

const pages = candidates
  .map(rel => ({ rel, file: join(publicDir, rel) }))
  .filter(entry => existsSync(entry.file));

if (existsSync(join(publicDir, 'posts'))) {
  const postHtml = readdirSync(join(publicDir, 'posts'))
    .filter(name => name.endsWith('.html') && name !== 'index.html')
    .sort()[0];
  if (postHtml) {
    pages.push({ rel: `posts/${postHtml}`, file: join(publicDir, 'posts', postHtml) });
  }
}

if (!pages.length) {
  console.error('No built pages found. Run npm run css:build && npm run build first.');
  process.exit(1);
}

let failed = false;

for (const { rel, file } of pages) {
  const html = readFileSync(file, 'utf8');
  const dom = new JSDOM(html, {
    url: `https://example.com/${rel}`
  });

  const results = await axe.run(dom.window.document.documentElement, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']
    }
  });

  const serious = results.violations.filter(
    v => v.impact === 'serious' || v.impact === 'critical'
  );

  console.log(`\n--- ${rel} ---`);
  console.log(`violations: ${results.violations.length} (serious/critical: ${serious.length})`);

  for (const violation of serious) {
    failed = true;
    console.log(`  [${violation.impact}] ${violation.id}: ${violation.help}`);
    violation.nodes.slice(0, 3).forEach(node => {
      console.log(`    - ${node.html.slice(0, 120)}`);
    });
  }
}

if (failed) {
  console.error('\nAccessibility check failed.');
  process.exit(1);
}

console.log('\nAccessibility check passed (no serious/critical violations).');
