import { Metadata } from 'next';
import CartaoCreditoCalculator from '@/components/CartaoCreditoCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Juros do Cartão de Crédito ${y} | Rotativo`,
  description:
    'Veja uma simulação educativa do custo do crédito rotativo ao pagar o mínimo da fatura com juros mensais.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-cartao-credito/',
  },
  openGraph: {
    title: `Juros do Cartão de Crédito ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-cartao-credito/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Cartão de crédito — rotativo {y}
          </h1>
          <p className="text-gray-600">
            Entenda o impacto dos juros ao adiar o pagamento total da fatura.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CartaoCreditoCalculator />
        </div>
      </div>
    </div>
  );
}
