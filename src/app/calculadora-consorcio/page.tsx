import { Metadata } from 'next';
import ConsorcioCalculator from '@/components/ConsorcioCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Consórcio ${y} | Parcela média e taxas`,
  description:
    'Estime parcela média e custo total de um consórcio com taxa de administração, fundo de reserva e seguro opcional.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-consorcio/',
  },
  openGraph: {
    title: `Calculadora de Consórcio ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-consorcio/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Simulador de consórcio {y}
          </h1>
          <p className="text-gray-600">
            Ordem de grandeza para planejamento — cada administradora tem regras próprias.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ConsorcioCalculator />
        </div>
      </div>
    </div>
  );
}
