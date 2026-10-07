import assert from 'node:assert/strict';
import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { scoreOpportunities } from '../scripts/score-opportunities.ts';
import { blockedReportMarkdown, missingCredentialNames, runMonthlyCalculators } from '../scripts/monthly-calculators.ts';

const existing = [
  { slug: 'calculadora-imc', title: 'Calculadora de IMC', linkLabel: 'calculadora de IMC', adTopic: 'other' as const },
  { slug: 'juros-compostos', title: 'Juros Compostos', linkLabel: 'calculadora de juros compostos', adTopic: 'finance' as const },
  { slug: 'calculadora-13-ferias', title: '13º e Férias', linkLabel: 'calculadora de 13º e férias', adTopic: 'labor' as const },
];

test('scores queries without a page and pages in positions 5 to 20', () => {
  const result = scoreOpportunities({
    month: 11,
    existing,
    queries: [
      { query: 'calculadora de imc', impressions: 500, clicks: 20, position: 4 },
      { query: 'calculadora 13 salario', impressions: 80, clicks: 2, position: 9 },
      { query: 'simulador ipva', impressions: 40, clicks: 1, position: 12 },
      { query: 'sem impressoes', impressions: 0, clicks: 0, position: 30 },
    ],
    pages: [
      { page: 'https://calculadora-digital.com.br/juros-compostos/', impressions: 100, clicks: 5, position: 8 },
      { page: 'https://calculadora-digital.com.br/calculadora-imc/', impressions: 300, clicks: 40, position: 2 },
      { page: 'https://calculadora-digital.com.br/calculadora-13-ferias/', impressions: 50, clicks: 3, position: 15 },
    ],
  });

  assert.equal(result.newCalculators.some((idea) => idea.query === 'calculadora de imc'), false);
  assert.equal(result.newCalculators.some((idea) => idea.query === 'sem impressoes'), false);
  assert.equal(result.newCalculators[0]?.query, 'calculadora 13 salario');
  assert.equal(result.newCalculators[0]?.reasons.some((reason) => reason.includes('13º')), true);
  assert.equal(result.improvements.length, 2);
  assert.equal(result.improvements.some((item) => item.page.includes('calculadora-imc')), false);
  assert.equal(result.improvements[0]?.page.includes('juros-compostos'), true);
});

test('missing credentials produce a blocked report and exit 0', async () => {
  const missing = missingCredentialNames({});
  assert.deepEqual(missing, ['GOOGLE_SA_JSON', 'GSC_SITE', 'GA4_PROPERTY_ID']);
  const markdown = blockedReportMarkdown('2026-10', missing);
  assert.match(markdown, /Blocked on credentials/);
  assert.equal(markdown.includes('Impressions:'), false);

  const dir = await mkdtemp(path.join(tmpdir(), 'calc-report-'));
  const result = await runMonthlyCalculators({
    env: {},
    cwd: dir,
    now: new Date('2026-10-04T12:00:00.000Z'),
    fetchImpl: async () => {
      throw new Error('network must not be called');
    },
  });
  assert.equal(result.exitCode, 0);
  assert.equal(result.ready, false);
  const written = await readFile(result.reportPath, 'utf8');
  assert.match(written, /Blocked on credentials/);
  assert.equal(written.includes('Impressions:'), false);
});
