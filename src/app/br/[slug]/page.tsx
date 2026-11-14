import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GeoCityPage from '@/components/GeoCityPage';
import {
  geoCanonical,
  getAllGeoLocations,
  getGeoLocation,
} from '@/data/geo-locations';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllGeoLocations().map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getGeoLocation(slug);
  if (!location) {
    return { title: 'Cidade não encontrada' };
  }

  const title = `Calculadora Online em ${location.city} (${location.stateCode}) | Grátis`;
  const description = `${location.intro} Salário líquido, FGTS, IR, juros e mais — sem cadastro.`;
  const url = geoCanonical(location.slug);

  return {
    title,
    description,
    keywords: `calculadora online ${location.city}, calculadora ${location.city}, calculadora ${location.stateCode}, salário líquido ${location.city}`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: 'pt_BR',
    },
  };
}

export default async function GeoLocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getGeoLocation(slug);
  if (!location) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Calculadora Online em ${location.city}`,
    description: location.intro,
    url: geoCanonical(location.slug),
    about: {
      '@type': 'City',
      name: location.city,
      containedInPlace: {
        '@type': 'State',
        name: location.state,
      },
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <GeoCityPage location={location} />
    </>
  );
}
