import Link from 'next/link';
import {
  GEO_HUB_PATH,
  geoPath,
  getAllGeoLocations,
  type GeoLocation,
} from '@/data/geo-locations';

interface GeoCityPageProps {
  location: GeoLocation;
}

export default function GeoCityPage({ location }: GeoCityPageProps) {
  const others = getAllGeoLocations()
    .filter((item) => item.slug !== location.slug)
    .slice(0, 8);

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            {location.city} · {location.stateCode} · {location.region}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadora Online em {location.city}
          </h1>
          <p className="text-gray-600">{location.intro}</p>
        </header>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">Por que esta página existe</h2>
          <p className="text-gray-700 mb-3">{location.localContext}</p>
          <p className="text-sm text-gray-500">{location.trendsNote}</p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Calculadoras úteis em {location.city}
          </h2>
          <ul className="space-y-4">
            {location.tools.map((tool) => (
              <li key={tool.href} className="border-b border-gray-100 pb-3 last:border-0">
                <Link href={tool.href} className="text-blue-600 hover:underline font-semibold">
                  {tool.label}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{tool.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6 space-y-3">
          <h2 className="text-2xl font-semibold">Contexto local</h2>
          <div>
            <h3 className="font-semibold text-gray-900">Transporte</h3>
            <p className="text-gray-700">{location.transportNote}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Combustível</h3>
            <p className="text-gray-700">{location.fuelNote}</p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6" aria-labelledby="geo-faq">
          <h2 id="geo-faq" className="text-2xl font-semibold mb-4">
            Perguntas frequentes
          </h2>
          <dl className="space-y-4">
            {location.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-gray-900">{faq.question}</dt>
                <dd className="text-gray-700 mt-1">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Outras cidades</h2>
          <ul className="flex flex-wrap gap-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={geoPath(item.slug)} className="text-blue-600 hover:underline">
                  {item.city}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href={GEO_HUB_PATH} className="text-blue-600 hover:underline">
              Ver todas as cidades
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
