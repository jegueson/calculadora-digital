import { Metadata } from 'next';
import HoraExtraCalculator from '@/components/HoraExtraCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Horas Extras e Adicional Noturno ${y}`,
  description:
    'Estime pagamento de horas extras 50%, 100% e adicional noturno com base no salário e na jornada de 220 horas.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-hora-extra/',
  },
  openGraph: {
    title: `Horas Extras e Noturno ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-hora-extra/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Horas extras e noturno {y}
          </h1>
          <p className="text-gray-600">
            Cálculo referencial a partir do valor-hora (salário ÷ 220).
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <HoraExtraCalculator />
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Veja também:{' '}
          <a href="/calculadora-salario-liquido/" className="text-blue-600 hover:underline">
            calculadora de salário líquido
          </a>
          ,{' '}
          <a href="/calculadora-13-ferias/" className="text-blue-600 hover:underline">
            calculadora de 13º e férias
          </a>{' '}
          e{' '}
          <a href="/calculadora-de-horas/" className="text-blue-600 hover:underline">
            calculadora de horas
          </a>
          .
        </p>
      </div>
    </div>
  );
}
