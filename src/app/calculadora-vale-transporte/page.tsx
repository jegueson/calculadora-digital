import { Metadata } from 'next';
import ValeTransporteCalculator from '@/components/ValeTransporteCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Vale-Transporte ${y} | Teto de 6%`,
  description:
    'Calcule o desconto legal máximo de 6% do salário e a participação estimada do empregador no transporte.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-vale-transporte/',
  },
  openGraph: {
    title: `Vale-Transporte ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-vale-transporte/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Vale-transporte {y}
          </h1>
          <p className="text-gray-600">
            Simule o custo mensal necessário e o desconto permitido na folha.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ValeTransporteCalculator />
        </div>
      </div>
    </div>
  );
}
