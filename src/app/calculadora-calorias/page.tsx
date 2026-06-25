import { Metadata } from 'next';
import CalorieCalculator from '@/components/CalorieCalculator';

export const metadata: Metadata = {
  title: 'Calculadora de Calorias Online | TMB e TDEE Grátis',
  description:
    'Calcule suas calorias diárias, TMB e TDEE online. Descubra quanto comer para emagrecer, ganhar massa ou manter o peso.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-calorias/',
  },
  openGraph: {
    title: 'Calculadora de Calorias Online | TMB e TDEE Grátis',
    description:
      'Calcule suas calorias diárias, TMB e TDEE online. Descubra quanto comer para emagrecer ou ganhar massa.',
    url: 'https://calculadora-digital.com.br/calculadora-calorias/',
    type: 'website',
  },
};

export default function CalorieCalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadora de Calorias Online
          </h1>
          <p className="text-gray-600">
            Calcule sua taxa metabólica basal (TMB), gasto calórico total (TDEE) e macros para seus objetivos.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <CalorieCalculator />
        </div>
        <p className="text-center text-sm text-gray-600">
          Combine com a{' '}
          <a href="/calculadora-imc/" className="text-blue-600 hover:underline">
            calculadora de IMC
          </a>{' '}
          para um plano alimentar mais completo.
        </p>
      </div>
    </main>
  );
}
