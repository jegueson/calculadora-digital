import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import GestationalCalculator from '@/components/GestationalCalculator';

export const metadata: Metadata = {
  title: 'Calculadora Gestacional Online | Semanas e DPP',
  description:
    'Calculadora gestacional online grátis: calcule idade gestacional em semanas e a data provável do parto (DPP) a partir da DUM.',
  keywords:
    'calculadora gestacional, idade gestacional, calculadora gestacional semanas, data provável do parto, DPP, DUM',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-gestacional/',
  },
  openGraph: {
    title: 'Calculadora Gestacional Online | Semanas e DPP',
    description:
      'Calcule idade gestacional e data provável do parto a partir da data da última menstruação.',
    url: 'https://calculadora-digital.com.br/calculadora-gestacional/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Como calcular a idade gestacional?',
    answer:
      'Conte os dias desde a data da última menstruação (DUM) até hoje e divida por 7 para obter semanas e dias. Esta página faz o cálculo automaticamente.',
  },
  {
    question: 'Como estimar a data provável do parto (DPP)?',
    answer:
      'A regra de Naegele soma 280 dias (40 semanas) à DUM. Ultrassom e avaliação médica podem ajustar a estimativa.',
  },
];

export default function GestationalCalculatorPage() {
  return (
    <CalculatorLayout slug="calculadora-gestacional" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculadora Gestacional
            </h1>
            <p className="text-gray-600">
              Descubra a idade gestacional em semanas e a data provável do parto a partir da DUM.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <GestationalCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Como usar</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Informe a data da última menstruação (DUM).</li>
                <li>Veja semanas + dias de gestação e a DPP estimada.</li>
                <li>
                  Para saúde geral, confira também a{' '}
                  <a href="/calculadora-imc/" className="text-blue-600 hover:underline">
                    calculadora de IMC
                  </a>
                  .
                </li>
              </ul>
            </article>
          </div>
        </div>
      </main>
    </CalculatorLayout>
  );
}
