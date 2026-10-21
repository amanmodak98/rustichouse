#!/usr/bin/env node
/**
 * validate-jsonld.mjs — sanity check every JSON-LD script tag emitted on a page.
 *
 * Usage:
 *   node scripts/validate-jsonld.mjs http://localhost:3000/menu
 *
 * For each schema block:
 *   - parse must succeed
 *   - @context must include schema.org
 *   - @type must be set and string-like
 *   - if @id is set it must be unique across the page
 *
 * Exits 0 on a clean run, 1 if any issue is found.
 */
const url = process.argv[2] ?? 'http://localhost:3000/';

const res = await fetch(url);
if (!res.ok) {
  console.error(`HTTP ${res.status} for ${url}`);
  process.exit(1);
}

const html = await res.text();

const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
const matches = [...html.matchAll(re)];

let exitCode = 0;
const seen = new Set();

for (const [raw, body] of matches) {
  let data;
  try {
    data = JSON.parse(body.replace(/&quot;/g, '"').replace(/\\"/g, '"'));
  } catch (err) {
    console.error(`[parse] ${url}: ${err.message}`);
    exitCode = 1;
    continue;
  }

  // The page may have one schema object or an array of them. Normalise.
  const items = Array.isArray(data) ? data : [data];

  for (const item of items) {
    if (!item['@context']) {
      console.error(`[no-context] ${url}: missing @context`);
      exitCode = 1;
      continue;
    }
    const ctx = Array.isArray(item['@context']) ? item['@context'].join(',') : item['@context'];
    if (!ctx.includes('schema.org')) {
      console.error(`[non-schema] ${url}: @context=${ctx}`);
      exitCode = 1;
      continue;
    }
    if (!item['@type']) {
      console.error(`[no-type] ${url}: ${JSON.stringify(item).slice(0, 120)}`);
      exitCode = 1;
      continue;
    }
    if (item['@id']) {
      if (seen.has(item['@id'])) {
        console.error(`[dup-id] ${url}: ${item['@id']}`);
        exitCode = 1;
      }
      seen.add(item['@id']);
    }
  }
}

if (exitCode === 0) {
  console.log(`✓ ${matches.length} JSON-LD block(s) on ${url} all parse, all schema, no duplicate @id`);
}
process.exit(exitCode);