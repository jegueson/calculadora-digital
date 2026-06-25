import { Metadata } from 'next';
import CompoundInterestCalculator from '@/components/CompoundInterestCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Juros Compostos Online | Simule Investimentos',
  description:
    'Calcule juros compostos online grátis. Simule investimentos, empréstimos e veja quanto seu dinheiro rende ao longo do tempo.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/juros-compostos/',
  },
  openGraph: {
    title: 'Calculadora de Juros Compostos Online | Simule Investimentos',
    description:
      'Calcule juros compostos online grátis. Simule investimentos e veja quanto seu dinheiro rende.',
    url: 'https://calculadora-digital.com.br/juros-compostos/',
    type: 'website',
  },
};

export default function CompoundInterestPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Calculadora de Juros Compostos
        </h1>
        <CompoundInterestCalculator />

        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">O que são juros compostos?</h2>
            <p className="mb-4">
              Juros compostos são calculados sobre o valor inicial mais os juros acumulados de períodos
              anteriores. É o efeito dos &quot;juros sobre juros&quot;, que faz o patrimônio crescer de forma
              exponencial ao longo do tempo.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Como usar esta calculadora</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Informe o valor inicial do investimento ou empréstimo.</li>
              <li>Digite a taxa de juros e o período (mensal ou anual).</li>
              <li>Veja o montante final, os juros gerados e a evolução no gráfico.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Perguntas frequentes</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Qual a diferença entre juros simples e compostos?
                </h4>
                <p className="text-sm text-gray-600">
                  Nos juros simples, os juros incidem apenas sobre o capital inicial. Nos compostos,
                  os juros de cada período entram na base do próximo cálculo, gerando crescimento maior.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Como calcular juros compostos manualmente?
                </h4>
                <p className="text-sm text-gray-600">
                  Use a fórmula M = C × (1 + i)^n, onde C é o capital, i a taxa por período e n o
                  número de períodos.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Onde os juros compostos são usados?
                </h4>
                <p className="text-sm text-gray-600">
                  Em CDB, poupança, fundos, financiamentos e cartão de crédito. Simule também com nossa{' '}
                  <a href="/calculadora-cdb-cdi/" className="text-blue-600 hover:underline">
                    calculadora de CDB/CDI
                  </a>{' '}
                  e{' '}
                  <a href="/calculo-financiamento-imobiliario/" className="text-blue-600 hover:underline">
                    calculadora de financiamento imobiliário
                  </a>
                  .
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
