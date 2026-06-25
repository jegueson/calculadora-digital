import { Metadata } from 'next';
import HoursCalculator from '@/components/HoursCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Horas Online | Somar e Subtrair Horas',
  description:
    'Calculadora de horas online grátis. Some, subtraia horas, calcule duração entre horários e some listas de tempo. Ideal para folha de ponto e trabalho.',
  keywords:
    'calculadora de horas, calcular horas, somar horas, subtrair horas, calculadora de tempo, cálculo de horas',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-de-horas/',
  },
  openGraph: {
    title: 'Calculadora de Horas Online | Somar e Subtrair Horas',
    description:
      'Some, subtraia horas e calcule duração entre horários. Calculadora de tempo online e gratuita.',
    url: 'https://calculadora-digital.com.br/calculadora-de-horas/',
    type: 'website',
  },
};

export default function HoursCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadora de Horas
          </h1>
          <p className="text-gray-600">
            Some horas, subtraia intervalos, calcule duração entre horários e totalize listas de
            tempo de forma rápida.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <HoursCalculator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <article className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Como usar a calculadora de horas</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                <strong>Somar horas:</strong> informe dois valores (ex: 2:30 + 1:45 = 4:15).
              </li>
              <li>
                <strong>Subtrair horas:</strong> útil para descontar intervalos do expediente.
              </li>
              <li>
                <strong>Duração:</strong> calcule quanto tempo passou entre dois horários do dia.
              </li>
              <li>
                <strong>Somar lista:</strong> totalize várias entradas de uma folha de ponto.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Perguntas frequentes</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Como somar horas no formato HH:MM?
                </h3>
                <p className="text-gray-600">
                  Converta tudo para minutos, some e divida por 60. Exemplo: 1:30 (90 min) + 2:15
                  (135 min) = 225 min = 3:45.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Como calcular horas trabalhadas no dia?
                </h3>
                <p className="text-gray-600">
                  Use a aba Duração com entrada e saída (ex: 08:00 e 17:00). Subtraia o intervalo
                  de almoço na aba Subtrair horas se necessário.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Para que serve uma calculadora de tempo?
                </h3>
                <p className="text-gray-600">
                  É usada por CLT, freelancers e gestores para conferir horas extras, banco de horas
                  e totais semanais. Veja também nossa{' '}
                  <a href="/calculadora-hora-extra/" className="text-blue-600 hover:underline">
                    calculadora de hora extra
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
