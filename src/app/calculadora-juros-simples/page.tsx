import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import SimpleInterestCalculator from '@/components/SimpleInterestCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Juros Simples Online Grátis',
  description:
    'Calculadora de juros simples online: calcule juros e montante com a fórmula J = C × i × t. Rápida, gratuita e sem cadastro.',
  keywords:
    'calculadora de juros, calculadora juros simples, juros simples, calculadora de juros online',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-juros-simples/',
  },
  openGraph: {
    title: 'Calculadora de Juros Simples Online Grátis',
    description: 'Calcule juros simples e montante com capital, taxa e períodos.',
    url: 'https://calculadora-digital.com.br/calculadora-juros-simples/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Qual a fórmula dos juros simples?',
    answer: 'J = C × i × t, em que C é o capital, i a taxa decimal por período e t o número de períodos. O montante é M = C + J.',
  },
  {
    question: 'Quando usar juros simples ou compostos?',
    answer:
      'Juros simples crescem de forma linear. Em investimentos e a maioria dos empréstimos longos, o regime costuma ser composto — use a calculadora de juros compostos nesses casos.',
  },
];

export default function SimpleInterestPage() {
  return (
    <CalculatorLayout slug="calculadora-juros-simples" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculadora de Juros Simples
            </h1>
            <p className="text-gray-600">
              Informe capital, taxa por período e quantidade de períodos para obter juros e montante.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <SimpleInterestCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Exemplo</h2>
              <p className="text-gray-700 mb-4">
                Capital de R$ 1.000 a 1,5% ao mês por 12 meses → juros de R$ 180 e montante de R$
                1.180. Para regime composto, veja a{' '}
                <a href="/juros-compostos/" className="text-blue-600 hover:underline">
                  calculadora de juros compostos
                </a>
                .
              </p>
            </article>
          </div>
        </div>
      </main>
    </CalculatorLayout>
  );
}
