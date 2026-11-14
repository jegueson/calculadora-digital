import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import AgeCalculator from '@/components/AgeCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Idade Online | Anos, Meses e Dias',
  description:
    'Calculadora de idade online grátis: descubra idade exata em anos, meses e dias a partir da data de nascimento.',
  keywords: 'calculadora de idade, calcular idade, idade em dias, quantos anos tenho',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-idade/',
  },
  openGraph: {
    title: 'Calculadora de Idade Online | Anos, Meses e Dias',
    description: 'Calcule idade exata em anos, meses e dias com a data de nascimento.',
    url: 'https://calculadora-digital.com.br/calculadora-idade/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'A idade considera mês e dia?',
    answer:
      'Sim. A ferramenta calcula anos completos e o saldo em meses e dias até a data de hoje no seu navegador.',
  },
];

export default function AgeCalculatorPage() {
  return (
    <CalculatorLayout slug="calculadora-idade" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculadora de Idade
            </h1>
            <p className="text-gray-600">
              Informe a data de nascimento e veja a idade exata em anos, meses e dias.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <AgeCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Outras contagens de tempo</h2>
              <p className="text-gray-700">
                Para prazos entre duas datas use a{' '}
                <a href="/calculadora-de-dias/" className="text-blue-600 hover:underline">
                  calculadora de dias
                </a>
                . Para eventos futuros, a{' '}
                <a href="/calculadora-contagem-regressiva/" className="text-blue-600 hover:underline">
                  contagem regressiva
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
