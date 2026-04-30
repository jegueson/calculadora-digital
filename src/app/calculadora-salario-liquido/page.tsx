import { Metadata } from 'next';
import NetSalaryCalculator from '@/components/NetSalaryCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Salário Líquido ${y} | CLT INSS e IRRF`,
  description:
    'Estime seu salário líquido com INSS progressivo, IRRF retido na fonte e vale-transporte (até 6%). Ferramenta educativa para trabalhadores brasileiros.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-salario-liquido/',
  },
  openGraph: {
    title: `Calculadora de Salário Líquido ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-salario-liquido/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadora de salário líquido {y}
          </h1>
          <p className="text-gray-600">
            Simule descontos de INSS, IRRF e vale-transporte para uma estimativa do seu
            pagamento líquido.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <NetSalaryCalculator />
        </div>
      </div>
    </div>
  );
}
