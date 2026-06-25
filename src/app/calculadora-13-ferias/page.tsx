import { Metadata } from 'next';
import DecimoTerceiroFeriasCalculator from '@/components/DecimoTerceiroFeriasCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de 13º Salário e Férias ${y} | Proporcionais e 1/3`,
  description:
    'Calcule 13º salário proporcional e férias com terço constitucional. Opcional: abono pecuniário (venda de 1/3 das férias).',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-13-ferias/',
  },
  openGraph: {
    title: `Calculadora de 13º Salário e Férias ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-13-ferias/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            13º salário e férias proporcionais {y}
          </h1>
          <p className="text-gray-600">
            Estime valores de 13º e férias + 1/3 com base no salário e nos meses do período.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <DecimoTerceiroFeriasCalculator />
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Veja também:{' '}
          <a href="/calculadora-salario-liquido/" className="text-blue-600 hover:underline">
            calculadora de salário líquido
          </a>{' '}
          e{' '}
          <a href="/calculadora-hora-extra/" className="text-blue-600 hover:underline">
            calculadora de hora extra
          </a>
          .
        </p>
      </div>
    </div>
  );
}
