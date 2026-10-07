import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CALCULATORS, getPublishedCalculators, getRelatedCalculators } from '../src/data/calculators.ts';
import { buildSitemapEntries } from '../src/data/sitemap-entries.ts';

const root = path.resolve(import.meta.dirname, '..');

test('every calculator slug is unique and has a page', () => {
  const slugs = CALCULATORS.map((entry) => entry.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const entry of CALCULATORS) {
    const page = path.join(root, 'src', 'app', entry.slug, 'page.tsx');
    assert.equal(existsSync(page), true, `missing page for ${entry.slug}`);
  }
});

test('related slugs point at other registry entries', () => {
  for (const entry of CALCULATORS) {
    assert.equal(entry.related.includes(entry.slug), false, entry.slug);
    for (const related of entry.related) {
      assert.equal(CALCULATORS.some((item) => item.slug === related), true, related);
    }
    const resolved = getRelatedCalculators(entry.slug);
    assert.equal(resolved.every((item) => item.published), true);
  }
});

test('sitemap lists the home page and published calculators only', () => {
  const entries = buildSitemapEntries('2026-10-04T00:00:00.000Z');
  const published = getPublishedCalculators();
  assert.equal(entries.length, published.length + 1);
  assert.equal(entries[0]?.url, 'https://calculadora-digital.com.br');
  assert.equal(entries[0]?.priority, 1);
  const urls = entries.map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  for (const entry of published) {
    assert.equal(urls.includes(`https://calculadora-digital.com.br/${entry.slug}/`), true);
  }
  assert.equal(urls.some((url) => url.includes('calculo-hipoteca')), false);
  assert.equal(urls.some((url) => url.includes('calendario-feriados')), false);
  assert.equal(entries.length, 24);
});
