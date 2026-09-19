#!/usr/bin/env node
/**
 * Static HTML accessibility check with axe-core + jsdom (no browser driver).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const axeSource = readFileSync(
  join(__dirname, '../node_modules/axe-core/axe.min.js'),
  'utf8'
);

const root = process.cwd();
const publicDir = join(root, 'public');

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
  const postHtml = readdirSync(join(publicDir, 'posts')).find(
    name => name.endsWith('.html') && name !== 'index.html'
  );
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

  const { window } = dom;
  window.eval(axeSource);

  const results = await window.axe.run(window.document.documentElement, {
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
