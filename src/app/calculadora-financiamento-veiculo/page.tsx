import { Metadata } from 'next';
import VehicleFinanceCalculator from '@/components/VehicleFinanceCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Financiamento de Veículo ${y} | SAC e Price`,
  description:
    'Simule financiamento de carro ou moto: entrada, taxa, prazo e sistema SAC ou Price. Veja parcelas e juros totais aproximados.',
  alternates: {
    canonical:
      'https://calculadora-digital.com.br/calculadora-financiamento-veiculo/',
  },
  openGraph: {
    title: `Financiamento de Veículo ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-financiamento-veiculo/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Financiamento de veículo {y}
          </h1>
          <p className="text-gray-600">
            Compare sistemas Price (parcela fixa) e SAC (parcelas decrescentes).
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <VehicleFinanceCalculator />
        </div>
      </div>
    </div>
  );
}
