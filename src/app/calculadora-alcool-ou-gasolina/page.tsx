import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import FuelCompareCalculator from '@/components/FuelCompareCalculator';

export const metadata: Metadata = {
  title: 'Calculadora Álcool ou Gasolina | Qual Compensa?',
  description:
    'Calculadora álcool ou gasolina: compare etanol e gasolina pela regra dos 70% ou pelo consumo real (km/L) do seu carro flex.',
  keywords:
    'calculadora álcool ou gasolina, etanol ou gasolina, regra dos 70%, qual combustível compensa',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-alcool-ou-gasolina/',
  },
  openGraph: {
    title: 'Calculadora Álcool ou Gasolina | Qual Compensa?',
    description: 'Descubra se etanol ou gasolina compensa mais no seu carro flex.',
    url: 'https://calculadora-digital.com.br/calculadora-alcool-ou-gasolina/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'O que é a regra dos 70%?',
    answer:
      'Divida o preço do etanol pelo da gasolina. Se o resultado for menor que 0,70 (70%), o etanol costuma compensar na média dos motores flex.',
  },
  {
    question: 'Por que informar o consumo km/L?',
    answer:
      'Cada carro rende diferente. Com km/L de etanol e gasolina, comparamos o custo por quilômetro real em vez da média de 70%.',
  },
];

export default function FuelComparePage() {
  return (
    <CalculatorLayout slug="calculadora-alcool-ou-gasolina" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculadora Álcool ou Gasolina
            </h1>
            <p className="text-gray-600">
              Compare etanol e gasolina pela regra dos 70% ou pelo consumo do seu veículo.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <FuelCompareCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Preços mudam por estado</h2>
              <p className="text-gray-700">
                ICMS e logística fazem o etanol compensar com mais frequência em estados produtores.
                Atualize os preços do posto da sua cidade antes de decidir. Para financiamento do
                veículo, veja a{' '}
                <a
                  href="/calculadora-financiamento-veiculo/"
                  className="text-blue-600 hover:underline"
                >
                  calculadora de financiamento de veículo
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
