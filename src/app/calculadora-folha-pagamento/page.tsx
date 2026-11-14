import { Metadata } from 'next';
import CalculatorLayout from '@/components/CalculatorLayout';
import PayrollCalculator from '@/components/PayrollCalculator';
import { getCurrentYear } from '@/utils/date';

const year = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Folha de Pagamento ${year} | Líquido CLT`,
  description:
    'Calculadora de folha de pagamento online: estime INSS, IRRF e salário líquido CLT a partir do bruto. Grátis e educativa.',
  keywords:
    'calculadora folha de pagamento, cálculo folha de pagamento, holerite, salário líquido, INSS, IRRF',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-folha-pagamento/',
  },
  openGraph: {
    title: `Calculadora de Folha de Pagamento ${year} | Líquido CLT`,
    description: 'Estime descontos de folha CLT (INSS e IRRF) e o líquido a receber.',
    url: 'https://calculadora-digital.com.br/calculadora-folha-pagamento/',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'O que entra no cálculo da folha de pagamento?',
    answer:
      'No lado do empregado, os descontos mais comuns são INSS e IRRF. Podem existir outros (VT, plano de saúde, pensão). Esta ferramenta estima INSS, IRRF e descontos extras informados.',
  },
  {
    question: 'Serve como holerite oficial?',
    answer:
      'Não. É uma estimativa educativa. Tabelas oficiais mudam; confira sempre a fonte do governo e o recibo da empresa.',
  },
];

export default function PayrollPage() {
  return (
    <CalculatorLayout slug="calculadora-folha-pagamento" faqs={faqs}>
      <main className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Calculadora de Folha de Pagamento
            </h1>
            <p className="text-gray-600">
              Estime INSS, IRRF e o líquido a partir do salário bruto CLT.
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <PayrollCalculator />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <article className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Ferramentas relacionadas</h2>
              <ul className="list-disc pl-6 mb-6">
                <li>
                  <a href="/calculadora-salario-liquido/" className="text-blue-600 hover:underline">
                    Calculadora de salário líquido
                  </a>
                </li>
                <li>
                  <a href="/calculadora-hora-extra/" className="text-blue-600 hover:underline">
                    Calculadora de hora extra
                  </a>
                </li>
                <li>
                  <a href="/calculadora-imposto-renda/" className="text-blue-600 hover:underline">
                    Calculadora de imposto de renda
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </main>
    </CalculatorLayout>
  );
}
