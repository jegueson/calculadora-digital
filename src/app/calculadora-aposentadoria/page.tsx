import { Metadata } from 'next';
import RetirementCalculator from '@/components/RetirementCalculator';
import { getCurrentYear } from '@/utils/date';

const currentYear = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Aposentadoria ${getCurrentYear()} Online Grátis | Simule INSS e Previdência Privada`,
  description: `Calculadora de aposentadoria atualizada ${getCurrentYear()}. Simule sua aposentadoria pelo INSS e previdência privada. Calcule benefícios, tempo de contribuição e planejamento financeiro. Grátis e preciso.`,
  keywords: `calculadora aposentadoria, aposentadoria ${getCurrentYear()}, aposentadoria inss, previdência privada, simulador aposentadoria, beneficio inss, tempo contribuição, planejamento aposentadoria`,
  openGraph: {
    title: `Calculadora de Aposentadoria ${getCurrentYear()} Online Grátis | Simule INSS e Previdência Privada`,
    description: `Calculadora de aposentadoria atualizada ${getCurrentYear()}. Simule sua aposentadoria pelo INSS e previdência privada. Calcule benefícios, tempo de contribuição e planejamento financeiro.`,
    url: 'https://calculadora-digital.com.br/calculadora-aposentadoria/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-aposentadoria/',
  },
};

export default function RetirementCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculadora de Aposentadoria {currentYear} - Grátis e Atualizada
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Simule sua aposentadoria pelo INSS e previdência privada. Descubra quanto você receberá, 
            quando poderá se aposentar e como planejar uma aposentadoria tranquila.
          </p>
        </header>

        {/* Calculator Component */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <RetirementCalculator />
            </div>
          </div>
          
          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                🏛️ Regras do INSS {currentYear}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Idade mínima (mulher):</span>
                  <span className="font-semibold text-blue-600 ml-auto">62 anos</span>
                </div>
                <div className="flex items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Idade mínima (homem):</span>
                  <span className="font-semibold text-blue-600 ml-auto">65 anos</span>
                </div>
                <div className="flex items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Tempo mínimo:</span>
                  <span className="font-semibold text-green-600 ml-auto">15 anos</span>
                </div>
                <div className="flex items-center py-2">
                  <span className="text-sm text-gray-600">Teto INSS:</span>
                  <span className="font-semibold text-purple-600 ml-auto">R$ 7.507,49</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">
                📊 Tipos de Aposentadoria
              </h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• <strong>Por idade:</strong> 62/65 anos + 15 anos de contribuição</li>
                <li>• <strong>Por tempo:</strong> 30/35 anos de contribuição</li>
                <li>• <strong>Por pontos:</strong> Idade + tempo = 87/97 pontos</li>
                <li>• <strong>Especial:</strong> Atividades insalubres/perigosas</li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800">
                💡 Dicas de Planejamento
              </h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Comece a planejar cedo</li>
                <li>• Diversifique com previdência privada</li>
                <li>• Mantenha as contribuições em dia</li>
                <li>• Revise anualmente seu planejamento</li>
                <li>• Considere a inflação nos cálculos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Quer Mais Ferramentas Financeiras?
          </h3>
          <p className="text-lg mb-6">
            Explore nossas outras calculadoras para um planejamento financeiro completo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/calculadora-fgts/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Calculadora de FGTS
            </a>
            <a href="/juros-compostos/" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Juros Compostos
            </a>
            <a href="/calculadora-imposto-renda/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Calculadora de IR
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
