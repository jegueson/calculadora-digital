import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import CountdownCalculator from '@/components/CountdownCalculator';

export const metadata: Metadata = {
  title: 'Contagem Regressiva Online | Dias, Horas e Minutos',
  description:
    'Contagem regressiva online grátis: veja quanto falta em dias, horas, minutos e segundos até uma data e horário.',
  keywords:
    'contagem regressiva, calculadora contagem regressiva, countdown, quanto falta para',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-contagem-regressiva/',
  },
  openGraph: {
    title: 'Contagem Regressiva Online | Dias, Horas e Minutos',
    description: 'Acompanhe ao vivo quanto falta para um evento, prova ou viagem.',
    url: 'https://calculadora-digital.com.br/calculadora-contagem-regressiva/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'A contagem usa o fuso do meu dispositivo?',
    answer:
      'Sim. O relógio segue a data e hora locais do navegador. Ajuste o horário do evento para o fuso em que ele acontece.',
  },
];

export default function CountdownPage() {
  return (
    <CalculatorLayout slug="calculadora-contagem-regressiva" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Contagem Regressiva
            </h1>
            <p className="text-gray-600">
              Escolha data e horário do evento e acompanhe o tempo restante em tempo real.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <CountdownCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Ideias de uso</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>Provas, vestibulares e concursos.</li>
                <li>Viagens, casamentos e lançamentos.</li>
                <li>
                  Para idade a partir do nascimento, use a{' '}
                  <a href="/calculadora-idade/" className="text-blue-600 hover:underline">
                    calculadora de idade
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
