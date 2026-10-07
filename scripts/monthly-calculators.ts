/**
 * Monthly Search Console + GA4 opportunity report.
 *
 * Reads GOOGLE_SA_JSON, GSC_SITE, and GA4_PROPERTY_ID from the environment.
 * When any of them is missing, writes a blocked report and exits 0.
 * It never invents traffic numbers and never opens an implementation pull request.
 */
import { createSign } from 'node:crypto';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { getPublishedCalculators } from '../src/data/calculators.ts';
import { scoreOpportunities, type PageRow, type QueryRow } from './score-opportunities.ts';

export interface ReportEnv {
  GOOGLE_SA_JSON?: string;
  GSC_SITE?: string;
  GA4_PROPERTY_ID?: string;
}

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

interface SearchAnalyticsRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  position?: number;
}

interface Ga4Report {
  rows?: Array<{
    dimensionValues?: Array<{ value?: string }>;
    metricValues?: Array<{ value?: string }>;
  }>;
}

const REQUIRED_ENV = ['GOOGLE_SA_JSON', 'GSC_SITE', 'GA4_PROPERTY_ID'] as const;

export function missingCredentialNames(env: ReportEnv): string[] {
  return REQUIRED_ENV.filter((name) => !env[name]?.trim());
}

export function blockedReportMarkdown(monthLabel: string, missing: string[]): string {
  const lines = missing.map((name) => `- \`${name}\``).join('\n');
  return `# Monthly calculator opportunities — ${monthLabel}

Blocked on credentials.

This run did not call Search Console or GA4. It does not contain traffic numbers, and it does not propose calculator implementations from invented data.

Missing environment variables:

${lines}

Add them as GitHub Actions secrets before the monthly workflow can open a report pull request.
`;
}

function monthLabel(now: Date): string {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function parseServiceAccount(raw: string): ServiceAccount {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('GOOGLE_SA_JSON is not valid JSON.');
  }
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('GOOGLE_SA_JSON must be a service account JSON object.');
  }
  const record = parsed as { client_email?: unknown; private_key?: unknown };
  if (typeof record.client_email !== 'string' || typeof record.private_key !== 'string') {
    throw new Error('GOOGLE_SA_JSON is missing client_email or private_key.');
  }
  return { client_email: record.client_email, private_key: record.private_key };
}

async function fetchAccessToken(account: ServiceAccount, fetchImpl: typeof fetch): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(JSON.stringify({
    iss: account.client_email,
    scope: [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/analytics.readonly',
    ].join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })).toString('base64url');
  const unsigned = `${header}.${claim}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(account.private_key).toString('base64url');
  const response = await fetchImpl('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    throw new Error(`Google token request failed (${response.status}): ${detail}`);
  }
  const payload = await response.json() as { access_token?: string };
  if (!payload.access_token) {
    throw new Error('Google token response did not include an access token.');
  }
  return payload.access_token;
}

async function searchAnalytics(
  siteUrl: string,
  token: string,
  body: Record<string, unknown>,
  fetchImpl: typeof fetch,
): Promise<SearchAnalyticsRow[]> {
  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 400);
    throw new Error(`Search Console query failed (${response.status}): ${detail}`);
  }
  const payload = await response.json() as { rows?: SearchAnalyticsRow[] };
  return payload.rows ?? [];
}

function toQueryRows(rows: SearchAnalyticsRow[]): QueryRow[] {
  return rows.flatMap((row) => {
    const query = row.keys?.[0];
    if (!query) {
      return [];
    }
    return [{
      query,
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      position: row.position ?? 0,
    }];
  });
}

function toPageRows(rows: SearchAnalyticsRow[]): PageRow[] {
  return rows.flatMap((row) => {
    const page = row.keys?.[0];
    if (!page) {
      return [];
    }
    return [{
      page,
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      position: row.position ?? 0,
    }];
  });
}

async function ga4AdRevenue(
  propertyId: string,
  token: string,
  fetchImpl: typeof fetch,
): Promise<{ revenueByPath: Record<string, number>; note: string | null }> {
  const id = propertyId.replace(/^properties\//, '');
  const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${id}:runReport`;
  const requestBody = {
    dateRanges: [{ startDate: '90daysAgo', endDate: 'yesterday' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'totalAdRevenue' }],
    limit: 250,
  };
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    return {
      revenueByPath: {},
      note: `GA4 ad revenue was not available (${response.status}). Scoring continued with Search Console only. ${detail}`,
    };
  }
  const payload = await response.json() as Ga4Report;
  const revenueByPath: Record<string, number> = {};
  for (const row of payload.rows ?? []) {
    const pagePath = row.dimensionValues?.[0]?.value;
    const revenue = Number(row.metricValues?.[1]?.value ?? '');
    if (pagePath && Number.isFinite(revenue)) {
      revenueByPath[pagePath] = revenue;
    }
  }
  return { revenueByPath, note: null };
}

function reportMarkdown(options: {
  monthLabel: string;
  startDate: string;
  endDate: string;
  site: string;
  propertyId: string;
  scored: ReturnType<typeof scoreOpportunities>;
  gaNote: string | null;
}): string {
  const newSection = options.scored.newCalculators.length === 0
    ? 'No query with impressions and without a dedicated page was returned for this window.'
    : options.scored.newCalculators.map((idea, index) => [
      `### ${index + 1}. ${idea.query}`,
      '',
      `- Impressions: ${idea.impressions}`,
      `- Clicks: ${idea.clicks}`,
      `- Average position: ${idea.position.toFixed(1)}`,
      `- Score: ${idea.score.toFixed(1)}`,
      ...idea.reasons.map((reason) => `- ${reason}`),
    ].join('\n')).join('\n\n');

  const improveSection = options.scored.improvements.length === 0
    ? 'No existing page in positions 5–20 was returned for this window.'
    : options.scored.improvements.map((item, index) => [
      `### ${index + 1}. ${item.page}`,
      '',
      `- Impressions: ${item.impressions}`,
      `- Clicks: ${item.clicks}`,
      `- Average position: ${item.position.toFixed(1)}`,
      `- Score: ${item.score.toFixed(1)}`,
      ...item.reasons.map((reason) => `- ${reason}`),
    ].join('\n')).join('\n\n');

  return `# Monthly calculator opportunities — ${options.monthLabel}

Window: last 90 days (${options.startDate} to ${options.endDate}).
Search Console property: ${options.site}
GA4 property: ${options.propertyId}

Numbers below come from those APIs. Topic weights for finance, labor, and tax are a heuristic, not a made-up traffic total. This report does not open a calculator implementation pull request.

## Top new calculators

${newSection}

## Existing page improvements

${improveSection}

## Notes

${options.gaNote ?? 'GA4 totalAdRevenue was included when the Data API returned it.'}
`;
}

export async function runMonthlyCalculators(options: {
  env: ReportEnv;
  cwd?: string;
  now?: Date;
  fetchImpl?: typeof fetch;
}): Promise<{ exitCode: number; ready: boolean; reportPath: string }> {
  const now = options.now ?? new Date();
  const label = monthLabel(now);
  const root = options.cwd ?? process.cwd();
  const reportsDir = path.join(root, 'reports');
  const reportPath = path.join(reportsDir, `monthly-${label}.md`);
  const readyPath = path.join(reportsDir, '.ready');
  await mkdir(reportsDir, { recursive: true });
  await rm(readyPath, { force: true });

  const missing = missingCredentialNames(options.env);
  if (missing.length > 0) {
    await writeFile(reportPath, blockedReportMarkdown(label, missing), 'utf8');
    return { exitCode: 0, ready: false, reportPath };
  }

  const account = parseServiceAccount(options.env.GOOGLE_SA_JSON ?? '');
  const fetchImpl = options.fetchImpl ?? fetch;
  const token = await fetchAccessToken(account, fetchImpl);
  const end = now;
  const start = new Date(end.getTime() - 90 * 24 * 60 * 60 * 1000);
  const startDate = isoDate(start);
  const endDate = isoDate(end);
  const site = options.env.GSC_SITE?.trim() ?? '';
  const propertyId = options.env.GA4_PROPERTY_ID?.trim() ?? '';
  const analyticsBody = {
    startDate,
    endDate,
    rowLimit: 250,
    dataState: 'final',
  };
  const queryRows = toQueryRows(await searchAnalytics(site, token, { ...analyticsBody, dimensions: ['query'] }, fetchImpl));
  const pageRows = toPageRows(await searchAnalytics(site, token, { ...analyticsBody, dimensions: ['page'] }, fetchImpl));
  const ga4 = await ga4AdRevenue(propertyId, token, fetchImpl);
  const scored = scoreOpportunities({
    queries: queryRows,
    pages: pageRows,
    existing: getPublishedCalculators().map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      linkLabel: entry.linkLabel,
      adTopic: entry.adTopic,
    })),
    month: now.getUTCMonth() + 1,
    adRevenueByPath: ga4.revenueByPath,
  });
  await writeFile(reportPath, reportMarkdown({
    monthLabel: label,
    startDate,
    endDate,
    site,
    propertyId,
    scored,
    gaNote: ga4.note,
  }), 'utf8');
  await writeFile(readyPath, 'ok\n', 'utf8');
  return { exitCode: 0, ready: true, reportPath };
}

async function main(): Promise<void> {
  const result = await runMonthlyCalculators({
    env: {
      GOOGLE_SA_JSON: process.env.GOOGLE_SA_JSON,
      GSC_SITE: process.env.GSC_SITE,
      GA4_PROPERTY_ID: process.env.GA4_PROPERTY_ID,
    },
  });
  process.exitCode = result.exitCode;
}

const invokedPath = process.argv[1];
if (invokedPath && import.meta.url === pathToFileURL(invokedPath).href) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : 'Monthly calculator report failed.';
    console.error(message);
    process.exitCode = 1;
  });
}
