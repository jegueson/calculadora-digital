import type { ReactNode } from 'react';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import {
  calculatorPath,
  getCalculator,
  getRelatedCalculators,
  SITE_URL,
  type CalculatorEntry,
} from '@/data/calculators';

export interface FaqItem {
  question: string;
  answer: string;
}

interface CalculatorLayoutProps {
  slug: string;
  children: ReactNode;
  faqs?: FaqItem[];
  /** Existing WebApplication JSON-LD. When omitted, one is built from the registry. */
  jsonLd?: Record<string, unknown>;
}

function webApplicationJsonLd(entry: CalculatorEntry): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: entry.title,
    description: entry.description,
    url: `${SITE_URL}${calculatorPath(entry.slug)}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
  };
}

function faqPageJsonLd(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Shared chrome for a calculator page.
 * Children render first (title and inputs). Ad slots come after that block.
 */
export default function CalculatorLayout({
  slug,
  children,
  faqs = [],
  jsonLd,
}: CalculatorLayoutProps) {
  const entry = getCalculator(slug);
  const related = getRelatedCalculators(slug);

  return (
    <>
      <JsonLd data={jsonLd ?? webApplicationJsonLd(entry)} />
      {faqs.length > 0 ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}
      {children}
      <div className="max-w-6xl mx-auto px-4">
        <AdSlot placement="after-calculator" />
        {faqs.length > 0 ? (
          <section className="bg-white rounded-lg shadow-lg p-6 mt-8" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-semibold mb-4">
              Perguntas frequentes
            </h2>
            <dl className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold text-gray-900">{faq.question}</dt>
                  <dd className="text-gray-700 mt-1">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        {related.length > 0 ? (
          <section className="bg-white rounded-lg shadow-lg p-6 mt-8" aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-xl font-semibold mb-3">
              Veja também
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={calculatorPath(item.slug)} className="text-blue-600 hover:underline">
                    {item.linkLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <AdSlot placement="after-related" />
      </div>
    </>
  );
}
