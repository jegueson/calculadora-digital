import { Metadata } from 'next';
import CdbCdiCalculator from '@/components/CdbCdiCalculator';
import { getCurrentYear } from '@/utils/date';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora CDB e CDI ${y} | Rendimento líquido`,
  description:
    'Projeta rendimento de CDB atrelado ao CDI com percentual do CDI, prazo e IR sobre o ganho. Simulação com capitalização mensal.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-cdb-cdi/',
  },
  openGraph: {
    title: `Calculadora CDB / CDI ${y}`,
    url: 'https://calculadora-digital.com.br/calculadora-cdb-cdi/',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            CDB e CDI — simulador {y}
          </h1>
          <p className="text-gray-600">
            Estime ganho bruto, imposto de renda e montante líquido.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <CdbCdiCalculator />
        </div>
      </div>
    </div>
  );
}
