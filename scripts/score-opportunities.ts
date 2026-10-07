import type { AdTopic } from '../src/data/calculators.ts';

export interface QueryRow {
  query: string;
  impressions: number;
  clicks: number;
  position: number;
}

export interface PageRow {
  page: string;
  impressions: number;
  clicks: number;
  position: number;
}

export interface ExistingCalculator {
  slug: string;
  title: string;
  linkLabel: string;
  adTopic: AdTopic;
}

export interface NewCalculatorIdea {
  query: string;
  impressions: number;
  clicks: number;
  position: number;
  score: number;
  reasons: string[];
}

export interface PageImprovement {
  page: string;
  impressions: number;
  clicks: number;
  position: number;
  score: number;
  reasons: string[];
}

export interface ScoreInput {
  queries: QueryRow[];
  pages: PageRow[];
  existing: ExistingCalculator[];
  /** Calendar month 1-12, used only to weight rows already present in the data. */
  month: number;
  /** Optional GA4 ad revenue by path. Absent means the report must not invent revenue. */
  adRevenueByPath?: Record<string, number>;
}

const TOPIC_WEIGHT: Record<AdTopic, number> = {
  finance: 1.4,
  labor: 1.35,
  tax: 1.35,
  other: 1,
};

const TOPIC_KEYWORDS: Record<Exclude<AdTopic, 'other'>, string[]> = {
  finance: ['financiamento', 'juros', 'cdb', 'cdi', 'cartao', 'cartão', 'consorcio', 'consórcio', 'investimento', 'emprestimo', 'empréstimo'],
  labor: ['salario', 'salário', 'fgts', 'rescisao', 'rescisão', 'ferias', 'férias', 'hora extra', 'horas extras', 'inss', 'clt', '13'],
  tax: ['imposto', 'irpf', 'irrf', 'das', 'mei', 'receita'],
};

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const TOKEN_STOPWORDS = new Set([
  'calculadora',
  'calculo',
  'online',
  'para',
  'com',
  'digital',
  'gratis',
]);

function distinctiveTokens(entry: ExistingCalculator): string[] {
  const raw = `${entry.slug} ${entry.title} ${entry.linkLabel}`;
  return normalize(raw)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 3 && !TOKEN_STOPWORDS.has(token));
}

function queryHasDedicatedPage(query: string, existing: ExistingCalculator[]): boolean {
  const normalized = normalize(query);
  return existing.some((entry) =>
    distinctiveTokens(entry).some((token) => normalized.includes(token)),
  );
}

function topicForText(text: string, fallback: AdTopic = 'other'): AdTopic {
  const normalized = normalize(text);
  if (TOPIC_KEYWORDS.tax.some((keyword) => normalized.includes(normalize(keyword)))) {
    return 'tax';
  }
  if (TOPIC_KEYWORDS.labor.some((keyword) => normalized.includes(normalize(keyword)))) {
    return 'labor';
  }
  if (TOPIC_KEYWORDS.finance.some((keyword) => normalized.includes(normalize(keyword)))) {
    return 'finance';
  }
  return fallback;
}

function seasonalReasons(text: string, month: number): string[] {
  const normalized = normalize(text);
  const reasons: string[] = [];
  if ((month === 11 || month === 12) && (normalized.includes('13') || normalized.includes('decimo'))) {
    reasons.push('Seasonal demand: 13º salário in November and December.');
  }
  if (month >= 3 && month <= 5 && (normalized.includes('imposto') || normalized.includes('irpf') || normalized.includes('renda'))) {
    reasons.push('Seasonal demand: Imposto de Renda from March through May.');
  }
  if (month === 1 && (normalized.includes('ipva') || normalized.includes('iptu'))) {
    reasons.push('Seasonal demand: IPVA and IPTU in January.');
  }
  if ([12, 1, 2, 7].includes(month) && normalized.includes('ferias')) {
    reasons.push('Seasonal demand: férias in December–February and July.');
  }
  return reasons;
}

function topicReason(topic: AdTopic): string | null {
  if (topic === 'other') {
    return null;
  }
  return `Higher AdSense-value topic (${topic}) applied as a weight, not as measured revenue.`;
}

export function scoreOpportunities(input: ScoreInput): {
  newCalculators: NewCalculatorIdea[];
  improvements: PageImprovement[];
} {
  const newCalculators = input.queries
    .filter((row) => row.impressions > 0 && !queryHasDedicatedPage(row.query, input.existing))
    .map((row) => {
      const topic = topicForText(row.query);
      const reasons = [
        `Query has ${row.impressions} impressions and no dedicated calculator page.`,
      ];
      const seasonal = seasonalReasons(row.query, input.month);
      reasons.push(...seasonal);
      const topicNote = topicReason(topic);
      if (topicNote) {
        reasons.push(topicNote);
      }
      const seasonalBoost = seasonal.length > 0 ? 1.25 : 1;
      const score = row.impressions * TOPIC_WEIGHT[topic] * seasonalBoost;
      return {
        query: row.query,
        impressions: row.impressions,
        clicks: row.clicks,
        position: row.position,
        score,
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const improvements = input.pages
    .filter((row) => row.position >= 5 && row.position <= 20 && row.impressions > 0)
    .map((row) => {
      const match = input.existing.find((entry) => row.page.includes(entry.slug));
      const topic = topicForText(row.page, match?.adTopic ?? 'other');
      const reasons = [
        `Page ranks at position ${row.position.toFixed(1)} with ${row.impressions} impressions (positions 5–20).`,
      ];
      const seasonal = seasonalReasons(`${row.page} ${match?.title ?? ''}`, input.month);
      reasons.push(...seasonal);
      const topicNote = topicReason(topic);
      if (topicNote) {
        reasons.push(topicNote);
      }
      const revenue = input.adRevenueByPath?.[row.page];
      if (typeof revenue === 'number') {
        reasons.push(`GA4 ad revenue for this path in the window: ${revenue}.`);
      }
      const seasonalBoost = seasonal.length > 0 ? 1.15 : 1;
      const revenueBoost = typeof revenue === 'number' && revenue > 0 ? 1.1 : 1;
      const score = row.impressions * TOPIC_WEIGHT[topic] * seasonalBoost * revenueBoost * (21 - row.position);
      return {
        page: row.page,
        impressions: row.impressions,
        clicks: row.clicks,
        position: row.position,
        score,
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  return { newCalculators, improvements };
}
