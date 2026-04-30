import { Metadata } from 'next';
import DasMeiCalculator from '@/components/DasMeiCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora DAS MEI ${y} | Simples Nacional estimado`,
  description:
    'Estime o valor mensal do DAS do MEI (INSS 5% do salário mínimo + ICMS ou ISS fixos) para comércio, serviços ou atividade mista.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-das-mei/',
  },
  openGraph: {
    title: `Calculadora DAS MEI ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-das-mei/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadora DAS MEI {y}
          </h1>
          <p className="text-gray-600">
            Aproximação do Documento de Arrecadação do Simples Nacional para microempreendedor
            individual.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <DasMeiCalculator />
        </div>
      </div>
    </div>
  );
}
