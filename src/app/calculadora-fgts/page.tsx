import { Metadata } from 'next';
import FGTSCalculator from '@/components/FGTSCalculator';

export const metadata: Metadata = {
  title: "Calculadora de FGTS 2024 Online Grátis | Calcule seu Saldo e Rendimentos",
  description: "Calculadora de FGTS atualizada 2024. Calcule seu saldo, rendimentos, projeções e cenários de saque. Simule demissão, aposentadoria e financiamento imobiliário. Grátis e preciso.",
  keywords: "calculadora fgts, fgts 2024, calcular fgts, saldo fgts, rendimento fgts, saque fgts, fgts demissão, fgts aposentadoria, fgts casa própria, simulador fgts",
  openGraph: {
    title: "Calculadora de FGTS 2024 Online Grátis | Calcule seu Saldo e Rendimentos",
    description: "Calculadora de FGTS atualizada 2024. Calcule seu saldo, rendimentos, projeções e cenários de saque. Simule demissão, aposentadoria e financiamento imobiliário.",
    url: 'https://calculadora-digital.com.br/calculadora-fgts/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-fgts/',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculadora de FGTS 2024",
  "description": "Calculadora gratuita para calcular saldo, rendimentos e cenários de saque do FGTS",
  "url": "https://calculadora-digital.com.br/calculadora-fgts/",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "featureList": [
    "Cálculo de saldo do FGTS",
    "Projeção de rendimentos",
    "Cenários de saque",
    "Simulação de demissão",
    "Financiamento imobiliário",
    "Evolução histórica"
  ]
};

export default function FGTSCalculatorPage() {
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
              Calculadora de FGTS 2024 - Grátis e Atualizada
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Calcule seu saldo do FGTS, rendimentos e simule cenários de saque. 
              Ferramenta completa para trabalhadores brasileiros planejarem suas finanças.
            </p>
          </header>

          {/* Calculator Component */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <FGTSCalculator />
              </div>
            </div>
            
            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  💰 Regras do FGTS
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Taxa de depósito:</span>
                    <span className="font-semibold text-green-600 ml-auto">8% do salário</span>
                  </div>
                  <div className="flex items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Rendimento anual:</span>
                    <span className="font-semibold text-blue-600 ml-auto">TR + 3%</span>
                  </div>
                  <div className="flex items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Multa demissão:</span>
                    <span className="font-semibold text-purple-600 ml-auto">40%</span>
                  </div>
                  <div className="flex items-center py-2">
                    <span className="text-sm text-gray-600">Saque casa própria:</span>
                    <span className="font-semibold text-orange-600 ml-auto">Até 90%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3 text-green-800">
                  📋 Situações de Saque
                </h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Demissão sem justa causa</li>
                  <li>• Aposentadoria</li>
                  <li>• Compra da casa própria</li>
                  <li>• Doenças graves</li>
                  <li>• Desastres naturais</li>
                  <li>• Inatividade da conta por 3 anos</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">
                  🏦 Sobre o FGTS
                </h3>
                <p className="text-sm text-blue-700">
                  O FGTS é um direito do trabalhador brasileiro, 
                  criado em 1966 para proteger o trabalhador 
                  demitido sem justa causa e formar reserva 
                  financeira para aposentadoria e casa própria.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                O que é o FGTS (Fundo de Garantia do Tempo de Serviço)?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    🏛️ História e Objetivo
                  </h3>
                  <p className="text-gray-700 mb-4">
                    O FGTS foi criado pela Lei nº 5.107/66 para substituir o sistema de estabilidade 
                    no emprego após 10 anos de serviço. É um fundo constituído por depósitos 
                    mensais que o empregador deve fazer em nome do trabalhador.
                  </p>
                  <p className="text-gray-700">
                    O principal objetivo é proteger o trabalhador demitido sem justa causa, 
                    criando uma reserva financeira que pode ser utilizada em momentos específicos 
                    da vida, como aposentadoria ou compra da casa própria.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    📊 Como Funciona
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>O empregador deposita 8% do salário bruto mensalmente</li>
                    <li>Os depósitos são feitos em conta na Caixa Econômica Federal</li>
                    <li>O saldo rende TR + 3% ao ano + distribuição de lucros</li>
                    <li>O trabalhador pode acompanhar o saldo pelo app FGTS</li>
                    <li>Existem situações específicas para saque</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                💰 Quando Posso Sacar o FGTS?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Saque Integral</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Demissão sem justa causa</li>
                    <li>• Aposentadoria</li>
                    <li>• Falecimento do trabalhador</li>
                    <li>• Doenças graves (HIV, câncer, etc.)</li>
                    <li>• Desastres naturais</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🏠 Saque Parcial</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Compra da casa prória</li>
                    <li>• Amortização de financiamento</li>
                    <li>• Liquidação de financiamento</li>
                    <li>• Construção de residência</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">📅 Saque Programado</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Saque-aniversário (anual)</li>
                    <li>• Inatividade por 3 anos</li>
                    <li>• Conta com até R$ 80</li>
                    <li>• Suspensão do trabalho avulso</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                🧮 Como Calcular o FGTS
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">📐 Fórmula Básica:</h4>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Depósito Mensal:</strong> Salário Bruto × 8%
                    <br />
                    <em className="text-sm text-gray-600">Exemplo: R$ 3.000 × 0,08 = R$ 240 por mês</em>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Rendimento Anual:</strong> Saldo × (TR + 3%)
                    <br />
                    <em className="text-sm text-gray-600">Exemplo: R$ 10.000 × 0,03 = R$ 300 por ano</em>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <strong>Multa Demissão:</strong> Saldo × 40%
                    <br />
                    <em className="text-sm text-gray-600">Exemplo: R$ 10.000 × 0,40 = R$ 4.000 de multa</em>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                🏠 FGTS para Casa Própria
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-800 mb-3">🔑 Condições para Uso:</h4>
                <ul className="space-y-2 text-blue-700">
                  <li>• <strong>Primeiro imóvel:</strong> Deve ser a primeira aquisição de imóvel</li>
                  <li>• <strong>Finalidade residencial:</strong> Apenas para moradia, não comercial</li>
                  <li>• <strong>Tempo de trabalho:</strong> Mínimo de 3 anos sob regime do FGTS</li>
                  <li>• <strong>Valor do imóvel:</strong> Até R$ 1,5 milhão nas regiões metropolitanas</li>
                  <li>• <strong>Renda familiar:</strong> Até R$ 7.000 para algumas modalidades</li>
                  <li>• <strong>Localização:</strong> Limitações geográficas para algumas regiões</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                📱 Saque-Aniversário vs. Saque-Rescisão
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🎂 Saque-Aniversário</h4>
                  <p className="text-sm text-green-700 mb-2">
                    Permite sacar parte do saldo anualmente no mês de aniversário.
                  </p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li><strong>Vantagens:</strong></li>
                    <li>• Liquidez anual garantida</li>
                    <li>• Pode usar como garantia para empréstimos</li>
                    <li>• Não perde o direito ao saque</li>
                    <li><strong>Desvantagens:</strong></li>
                    <li>• Perde direito à multa de 40%</li>
                    <li>• Saca apenas uma parcela do saldo</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">🚪 Saque-Rescisão</h4>
                  <p className="text-sm text-red-700 mb-2">
                    Modalidade tradicional que permite saque apenas na demissão sem justa causa.
                  </p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li><strong>Vantagens:</strong></li>
                    <li>• Recebe multa de 40% do empregador</li>
                    <li>• Saque integral na demissão</li>
                    <li>• Maior proteção em caso de desemprego</li>
                    <li><strong>Desvantagens:</strong></li>
                    <li>• Sem acesso ao dinheiro durante emprego</li>
                    <li>• Depende da demissão sem justa causa</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                📊 Tabela de Percentuais do Saque-Aniversário
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left">Faixa de Saldo</th>
                      <th className="border border-gray-300 p-2 text-left">Percentual</th>
                      <th className="border border-gray-300 p-2 text-left">Parcela Adicional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">Até R$ 500</td>
                      <td className="border border-gray-300 p-2">50%</td>
                      <td className="border border-gray-300 p-2">-</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">De R$ 500,01 a R$ 1.000</td>
                      <td className="border border-gray-300 p-2">40%</td>
                      <td className="border border-gray-300 p-2">R$ 50</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">De R$ 1.000,01 a R$ 5.000</td>
                      <td className="border border-gray-300 p-2">30%</td>
                      <td className="border border-gray-300 p-2">R$ 150</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">De R$ 5.000,01 a R$ 10.000</td>
                      <td className="border border-gray-300 p-2">20%</td>
                      <td className="border border-gray-300 p-2">R$ 650</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">De R$ 10.000,01 a R$ 15.000</td>
                      <td className="border border-gray-300 p-2">15%</td>
                      <td className="border border-gray-300 p-2">R$ 1.150</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">De R$ 15.000,01 a R$ 20.000</td>
                      <td className="border border-gray-300 p-2">10%</td>
                      <td className="border border-gray-300 p-2">R$ 1.900</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Acima de R$ 20.000</td>
                      <td className="border border-gray-300 p-2">5%</td>
                      <td className="border border-gray-300 p-2">R$ 2.900</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                ❓ Perguntas Frequentes sobre FGTS
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Como consultar meu saldo do FGTS?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Você pode consultar através do aplicativo FGTS (disponível para iOS e Android), 
                    no site da Caixa, nas agências bancárias ou através do telefone 0800 726 0207.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    O que acontece se o empregador não depositar o FGTS?
                  </h4>
                  <p className="text-sm text-gray-600">
                    É crime não depositar o FGTS. O empregador pode ser multado e o trabalhador 
                    pode denunciar ao Ministério do Trabalho ou ajuizar ação trabalhista.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Posso sacar o FGTS se pedir demissão?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Não, em caso de demissão voluntária (pedido), o trabalhador não tem direito 
                    ao saque do FGTS, exceto se estiver no regime do saque-aniversário.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Como funciona o FGTS Digital?
                  </h4>
                  <p className="text-sm text-gray-600">
                    O FGTS Digital permite acompanhar extratos, realizar saques (quando permitido), 
                    solicitar cartão de débito e receber notificações sobre depósitos pelo celular.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Quer Mais Calculadoras Financeiras?
            </h3>
            <p className="text-lg mb-6">
              Explore nossas outras ferramentas para planejamento financeiro e vida profissional.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/calculadora-imposto-renda/" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Calculadora de IR
              </a>
              <a href="/juros-compostos/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Juros Compostos
              </a>
              <a href="/calculadora-aposentadoria/" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Calculadora de Aposentadoria
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 