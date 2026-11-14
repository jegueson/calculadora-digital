import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import RuleOfThreeCalculator from '@/components/RuleOfThreeCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Regra de Três Online | Direta e Inversa',
  description:
    'Calculadora de regra de três online grátis: resolva proporções diretas e inversas em segundos. Ideal para escola, concursos e dia a dia.',
  keywords:
    'calculadora regra de três, regra de tres, regra de três online, regra de três direta, regra de três inversa',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-regra-de-tres/',
  },
  openGraph: {
    title: 'Calculadora de Regra de Três Online | Direta e Inversa',
    description: 'Resolva regra de três direta e inversa online, grátis e sem cadastro.',
    url: 'https://calculadora-digital.com.br/calculadora-regra-de-tres/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Como fazer regra de três direta?',
    answer: 'Monte A/B = C/X e isole X: X = (B × C) / A. Use quando as grandezas crescem ou diminuem juntas.',
  },
  {
    question: 'Quando a regra de três é inversa?',
    answer:
      'Quando uma grandeza aumenta e a outra diminui (ex.: mais trabalhadores, menos dias). Nesse caso X = (A × B) / C.',
  },
];

export default function RuleOfThreePage() {
  return (
    <CalculatorLayout slug="calculadora-regra-de-tres" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculadora de Regra de Três
            </h1>
            <p className="text-gray-600">
              Resolva proporções diretas e inversas informando os três valores conhecidos.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <RuleOfThreeCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Dica</h2>
              <p className="text-gray-700">
                Para descontos e aumentos percentuais, use também a{' '}
                <a href="/calculadora-porcentagem/" className="text-blue-600 hover:underline">
                  calculadora de porcentagem
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
