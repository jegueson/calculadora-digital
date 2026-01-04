import { Metadata } from 'next';
import TaxCalculator from '@/components/TaxCalculator';
import { getCurrentYear } from '@/utils/date';

const currentYear = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Imposto de Renda ${getCurrentYear()} | Calcule seu IR Online Grátis`,
  description: `Calculadora de Imposto de Renda ${getCurrentYear()} online e gratuita. Calcule quanto você deve pagar de IR, simule restituição e descubra se está isento. Tabela atualizada da Receita Federal.`,
  keywords: `calculadora imposto renda, calculadora IR, imposto renda ${getCurrentYear()}, calcular IR, restituição imposto renda, tabela IR ${getCurrentYear()}, isento imposto renda`,
  openGraph: {
    title: `Calculadora de Imposto de Renda ${getCurrentYear()} | Calcule seu IR Online Grátis`,
    description: `Calculadora de Imposto de Renda ${getCurrentYear()} online e gratuita. Calcule quanto você deve pagar de IR, simule restituição e descubra se está isento.`,
    url: 'https://calculadora-digital.com.br/calculadora-imposto-renda/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-imposto-renda/',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `Calculadora de Imposto de Renda ${getCurrentYear()}`,
  "description": `Calculadora gratuita para calcular o Imposto de Renda ${getCurrentYear()} com tabela atualizada da Receita Federal`,
  "url": "https://calculadora-digital.com.br/calculadora-imposto-renda/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "featureList": [
    `Cálculo do Imposto de Renda ${getCurrentYear()}`,
    "Simulação de Restituição",
    "Verificação de Isenção",
    "Tabela progressiva atualizada",
    "Cálculo de alíquota efetiva"
  ]
};

export default function TaxCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Calculadora de Imposto de Renda {currentYear}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calcule seu Imposto de Renda {currentYear} online e gratuito. Descubra quanto você deve pagar, 
              simule sua restituição e verifique se está isento com nossa calculadora atualizada.
            </p>
          </header>

          {/* Calculator Component */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <TaxCalculator />
              </div>
            </div>
            
            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  📊 Tabela IR {currentYear}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Até R$ 2.259,20</span>
                    <span className="font-semibold text-green-600">Isento</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">R$ 2.259,21 a R$ 2.826,65</span>
                    <span className="font-semibold text-blue-600">7,5%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">R$ 2.826,66 a R$ 3.751,05</span>
                    <span className="font-semibold text-yellow-600">15%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">R$ 3.751,06 a R$ 4.664,68</span>
                    <span className="font-semibold text-orange-600">22,5%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Acima de R$ 4.664,68</span>
                    <span className="font-semibold text-red-600">27,5%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">
                  💡 Dicas Importantes
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Utilize sempre a renda líquida (após descontos)</li>
                  <li>• Considere deduções legais como dependentes</li>
                  <li>• Mantenha comprovantes de gastos dedutíveis</li>
                  <li>• Entregue a declaração até 31/05/{currentYear}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Como Calcular o Imposto de Renda {currentYear}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    📋 Passo a Passo
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Calcule sua renda bruta mensal</li>
                    <li>Subtraia os descontos obrigatórios (INSS, etc.)</li>
                    <li>Aplique a tabela progressiva do IR</li>
                    <li>Considere as deduções permitidas</li>
                    <li>Verifique o resultado final</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    🎯 Quem Deve Declarar
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Renda superior a R$ 30.639,90 em 2023</li>
                    <li>Recebeu rendimentos isentos acima de R$ 200.000</li>
                    <li>Teve ganhos com vendas de bens</li>
                    <li>Realizou operações na bolsa de valores</li>
                    <li>Possui bens acima de R$ 800.000</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                💰 Principais Deduções do IR {currentYear}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Dependentes</h4>
                  <p className="text-sm text-gray-600">R$ 2.275,08 por dependente</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Educação</h4>
                  <p className="text-sm text-gray-600">Até R$ 3.561,50 por pessoa</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Saúde</h4>
                  <p className="text-sm text-gray-600">Sem limite de valor</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                ❓ Perguntas Frequentes
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Quando posso receber a restituição?
                  </h4>
                  <p className="text-sm text-gray-600">
                    A Receita Federal paga as restituições em 5 lotes, de maio a setembro. 
                    Quem declara primeiro e tem prioridade legal recebe antes.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    O que acontece se eu não declarar?
                  </h4>
                  <p className="text-sm text-gray-600">
                    A multa por atraso é de R$ 165,74 ou 1% ao mês sobre o imposto devido, 
                    limitada a 20% do imposto devido.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Posso retificar minha declaração?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Sim, você pode retificar sua declaração até 5 anos após o prazo original 
                    de entrega, utilizando o programa da Receita Federal.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Precisa de Mais Calculadoras Financeiras?
            </h3>
            <p className="text-lg mb-6">
              Explore nossas outras ferramentas gratuitas para seus cálculos financeiros.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/juros-compostos/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Juros Compostos
              </a>
              <a href="/calculo-financiamento-imobiliario/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Financiamento Imobiliário
              </a>
              <a href="/calculadora-aposentadoria/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Aposentadoria
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 