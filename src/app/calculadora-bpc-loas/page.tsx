import { Metadata } from 'next';
import BpcLoasCalculator from '@/components/BpcLoasCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora BPC / Loas — Renda Per Capita ${y}`,
  description:
    'Compare a renda familiar per capita ao teto de referência do BPC. Não substitui análise do INSS ou CadÚnico.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-bpc-loas/',
  },
  openGraph: {
    title: `BPC / Loas — renda per capita ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-bpc-loas/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            BPC — teste de renda per capita {y}
          </h1>
          <p className="text-gray-600">
            Apenas um dos requisitos do benefício assistencial — veja o aviso na página.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <BpcLoasCalculator />
        </div>
      </div>
    </div>
  );
}
