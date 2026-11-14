import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import DaysCalculator from '@/components/DaysCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Dias Online | Dias Úteis e Corridos',
  description:
    'Calculadora de dias online grátis: dias corridos, dias úteis entre datas e soma ou subtração de dias. Ideal para prazos e férias.',
  keywords:
    'calculadora de dias, calculadora de dias úteis, dias corridos, dias entre datas, calculadora de prazo',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-de-dias/',
  },
  openGraph: {
    title: 'Calculadora de Dias Online | Dias Úteis e Corridos',
    description:
      'Calcule dias corridos, dias úteis e some ou subtraia dias de uma data. Grátis e sem cadastro.',
    url: 'https://calculadora-digital.com.br/calculadora-de-dias/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'Qual a diferença entre dias corridos e dias úteis?',
    answer:
      'Dias corridos contam todos os dias do calendário. Dias úteis excluem sábados, domingos e, nesta ferramenta, feriados nacionais fixos quando a opção estiver marcada.',
  },
  {
    question: 'A calculadora considera Carnaval e Corpus Christi?',
    answer:
      'Não automaticamente. Feriados móveis variam por ano; use dias corridos ou ajuste a data final se precisar desses feriados.',
  },
];

export default function DaysCalculatorPage() {
  return (
    <CalculatorLayout slug="calculadora-de-dias" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculadora de Dias
            </h1>
            <p className="text-gray-600">
              Calcule dias corridos, dias úteis entre datas ou some e subtraia dias de um prazo.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <DaysCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Para que serve</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Prazos processuais e administrativos em dias úteis.</li>
                <li>Contagem de dias de férias ou afastamento.</li>
                <li>
                  Combine com a{' '}
                  <a href="/calculadora-de-horas/" className="text-blue-600 hover:underline">
                    calculadora de horas
                  </a>{' '}
                  e a{' '}
                  <a href="/calculadora-13-ferias/" className="text-blue-600 hover:underline">
                    calculadora de 13º e férias
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
