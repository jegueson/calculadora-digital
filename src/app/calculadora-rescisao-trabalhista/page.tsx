import { Metadata } from 'next';
import RescisaoCalculator from '@/components/RescisaoCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Rescisão Trabalhista ${y} | Verbas e multa FGTS`,
  description:
    'Estime verbas rescisórias: saldo de salário, 13º e férias proporcionais, aviso prévio e multa de 40% do FGTS em dispensa sem justa causa.',
  alternates: {
    canonical:
      'https://calculadora-digital.com.br/calculadora-rescisao-trabalhista/',
  },
  openGraph: {
    title: `Calculadora de Rescisão Trabalhista ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-rescisao-trabalhista/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadora de rescisão trabalhista {y}
          </h1>
          <p className="text-gray-600">
            Projeção educativa de verbas e multa sobre o FGTS conforme o cenário selecionado.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <RescisaoCalculator />
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Veja também:{' '}
          <a href="/calculadora-fgts/" className="text-blue-600 hover:underline">
            calculadora de FGTS
          </a>{' '}
          e{' '}
          <a href="/calculadora-salario-liquido/" className="text-blue-600 hover:underline">
            calculadora de salário líquido
          </a>
          .
        </p>
      </div>
    </div>
  );
}
