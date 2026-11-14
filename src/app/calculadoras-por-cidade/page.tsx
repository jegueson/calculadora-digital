import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GEO_HUB_CANONICAL,
  getAllGeoLocations,
  geoPath,
} from '@/data/geo-locations';

export const metadata: Metadata = {
  title: 'Calculadoras por Cidade no Brasil | SEO Local',
  description:
    'Hub de calculadoras online por cidade no Brasil: São Paulo, Rio, Brasília, Curitiba, Natal e mais. Salário líquido, FGTS, IR e finanças.',
  keywords:
    'calculadora por cidade, calculadora online brasil, calculadora são paulo, calculadora brasília',
  alternates: {
    canonical: GEO_HUB_CANONICAL,
  },
  openGraph: {
    title: 'Calculadoras por Cidade no Brasil | SEO Local',
    description:
      'Escolha sua cidade e acesse calculadoras online com contexto local de transporte e combustível.',
    url: GEO_HUB_CANONICAL,
    type: 'website',
  },
};

export default function GeoHubPage() {
  const locations = getAllGeoLocations();

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadoras por cidade no Brasil
          </h1>
          <p className="text-gray-600">
            Páginas locais com atalhos para as calculadoras mais buscadas e contexto de transporte
            e combustível da sua região. Priorizamos metros com alto interesse relativo no Google
            Trends para “calculadora”.
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {locations.map((location) => (
              <li key={location.slug} className="border border-gray-100 rounded-lg p-4">
                <Link
                  href={geoPath(location.slug)}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {location.city} ({location.stateCode})
                </Link>
                <p className="text-sm text-gray-600 mt-1">{location.region}</p>
                <p className="text-sm text-gray-500 mt-2">{location.trendsNote}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Ferramentas nacionais</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>
              <Link href="/calculadora-salario-liquido/" className="text-blue-600 hover:underline">
                Salário líquido
              </Link>
            </li>
            <li>
              <Link href="/calculadora-fgts/" className="text-blue-600 hover:underline">
                FGTS
              </Link>
            </li>
            <li>
              <Link href="/calculadora-imposto-renda/" className="text-blue-600 hover:underline">
                Imposto de renda
              </Link>
            </li>
            <li>
              <Link href="/juros-compostos/" className="text-blue-600 hover:underline">
                Juros compostos
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
