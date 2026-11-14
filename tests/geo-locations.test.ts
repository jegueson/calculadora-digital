import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getPublishedCalculators } from '../src/data/calculators.ts';
import {
  GEO_HUB_PATH,
  getAllGeoLocations,
  getGeoLocation,
  geoCanonical,
  geoPath,
} from '../src/data/geo-locations.ts';
import { buildSitemapEntries } from '../src/data/sitemap-entries.ts';

const root = path.resolve(import.meta.dirname, '..');

test('geo location slugs are unique and resolvable', () => {
  const locations = getAllGeoLocations();
  assert.ok(locations.length >= 10);
  const slugs = locations.map((entry) => entry.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const location of locations) {
    assert.equal(getGeoLocation(location.slug)?.city, location.city);
    assert.equal(geoPath(location.slug), `/br/${location.slug}/`);
    assert.equal(geoCanonical(location.slug).endsWith(geoPath(location.slug)), true);
    assert.ok(location.intro.includes(location.city) || location.localContext.includes(location.city));
    assert.ok(location.faqs.length >= 1);
    assert.ok(location.tools.length >= 4);
  }
});

test('geo hub and dynamic city route files exist', () => {
  assert.equal(existsSync(path.join(root, 'src', 'app', 'calculadoras-por-cidade', 'page.tsx')), true);
  assert.equal(existsSync(path.join(root, 'src', 'app', 'br', '[slug]', 'page.tsx')), true);
  assert.equal(GEO_HUB_PATH, '/calculadoras-por-cidade/');
});

test('sitemap includes geo hub and every city page', () => {
  const entries = buildSitemapEntries('2026-11-14T00:00:00.000Z');
  const urls = entries.map((entry) => entry.url);
  assert.equal(urls.includes('https://calculadora-digital.com.br/calculadoras-por-cidade/'), true);
  for (const location of getAllGeoLocations()) {
    assert.equal(urls.includes(geoCanonical(location.slug)), true);
  }
  const published = getPublishedCalculators();
  assert.equal(entries.length, published.length + 1 + 1 + getAllGeoLocations().length);
});
