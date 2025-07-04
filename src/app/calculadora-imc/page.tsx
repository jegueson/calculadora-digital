import { Metadata } from 'next';
import BMICalculator from '@/components/BMICalculator';

export const metadata: Metadata = {
  title: "Calculadora de IMC Online Grátis | Calcule seu Índice de Massa Corporal",
  description: "Calculadora de IMC gratuita e precisa. Calcule seu Índice de Massa Corporal, descubra se está no peso ideal e receba dicas personalizadas de saúde. Tabela IMC completa 2024.",
  keywords: "calculadora imc, calcular imc, imc ideal, indice massa corporal, peso ideal, calculadora peso, imc tabela, como calcular imc, imc online",
  openGraph: {
    title: "Calculadora de IMC Online Grátis | Calcule seu Índice de Massa Corporal",
    description: "Calculadora de IMC gratuita e precisa. Calcule seu Índice de Massa Corporal, descubra se está no peso ideal e receba dicas personalizadas de saúde.",
    url: 'https://calculadora-digital.com.br/calculadora-imc/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-imc/',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculadora de IMC Online",
  "description": "Calculadora gratuita para calcular o Índice de Massa Corporal (IMC) com recomendações personalizadas de saúde",
  "url": "https://calculadora-digital.com.br/calculadora-imc/",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  },
  "featureList": [
    "Cálculo preciso do IMC",
    "Classificação por faixas de peso",
    "Peso ideal personalizado",
    "Recomendações de saúde",
    "Análise de risco",
    "Tabela IMC completa"
  ]
};

export default function BMICalculatorPage() {
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
              Calculadora de IMC Online Grátis 2024
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Calcule seu Índice de Massa Corporal (IMC) gratuitamente e descubra se você está no peso ideal. 
              Receba recomendações personalizadas para uma vida mais saudável.
            </p>
          </header>

          {/* Calculator Component */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <BMICalculator />
              </div>
            </div>
            
            {/* Info Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  📊 Faixas de IMC
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">Abaixo de 18,5</span>
                    <span className="font-semibold text-yellow-600">Baixo Peso</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">18,5 - 24,9</span>
                    <span className="font-semibold text-green-600">Normal</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">25,0 - 29,9</span>
                    <span className="font-semibold text-yellow-600">Sobrepeso</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">30,0 - 34,9</span>
                    <span className="font-semibold text-orange-600">Obesidade I</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-sm text-gray-600">35,0 - 39,9</span>
                    <span className="font-semibold text-red-600">Obesidade II</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">40,0 ou mais</span>
                    <span className="font-semibold text-red-800">Obesidade III</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">
                  💡 Dicas Rápidas
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Meça-se sempre no mesmo horário</li>
                  <li>• Use roupas leves para maior precisão</li>
                  <li>• O IMC é uma estimativa, não um diagnóstico</li>
                  <li>• Considere também a composição corporal</li>
                  <li>• Consulte um profissional regularmente</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                O que é o IMC (Índice de Massa Corporal)?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    📖 Definição do IMC
                  </h3>
                  <p className="text-gray-700 mb-4">
                    O Índice de Massa Corporal (IMC) é uma medida internacional padrão para 
                    avaliar se uma pessoa está no peso ideal em relação à sua altura. 
                    Foi desenvolvido pelo estatístico belga Adolphe Quetelet no século XIX.
                  </p>
                  <p className="text-gray-700">
                    O cálculo é simples: <strong>IMC = peso (kg) ÷ altura² (m)</strong>. 
                    Por exemplo, uma pessoa com 70kg e 1,75m teria IMC = 70 ÷ (1,75 × 1,75) = 22,9.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    🎯 Para que Serve o IMC
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Triagem inicial para problemas de peso</li>
                    <li>Avaliação de risco para doenças cardiovasculares</li>
                    <li>Monitoramento de mudanças corporais ao longo do tempo</li>
                    <li>Orientação para metas de peso saudável</li>
                    <li>Base para recomendações médicas e nutricionais</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                🏥 IMC e Saúde: O que Dizem os Estudos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">IMC Baixo (&lt;18,5)</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Risco de desnutrição</li>
                    <li>• Menor resistência a infecções</li>
                    <li>• Problemas de fertilidade</li>
                    <li>• Osteoporose precoce</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">IMC Normal (18,5-24,9)</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Menor risco cardiovascular</li>
                    <li>• Melhor expectativa de vida</li>
                    <li>• Menor incidência de diabetes</li>
                    <li>• Melhor qualidade de vida</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">IMC Alto (&gt;25)</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Risco de diabetes tipo 2</li>
                    <li>• Hipertensão arterial</li>
                    <li>• Apneia do sono</li>
                    <li>• Problemas articulares</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                ⚖️ Como Calcular o IMC Corretamente
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">📏 Passo a Passo:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li><strong>Meça seu peso:</strong> Use uma balança digital, de preferência pela manhã, em jejum e sem roupas pesadas</li>
                  <li><strong>Meça sua altura:</strong> Fique descalço, encostado na parede, com os pés juntos e olhando para frente</li>
                  <li><strong>Converta a altura:</strong> Se mediu em centímetros, divida por 100 (ex: 175cm = 1,75m)</li>
                  <li><strong>Aplique a fórmula:</strong> IMC = peso ÷ (altura × altura)</li>
                  <li><strong>Interprete o resultado:</strong> Use nossa tabela de classificação para entender sua faixa</li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                🚨 Limitações do IMC
              </h3>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <p className="text-yellow-800 mb-4">
                  <strong>Importante:</strong> O IMC é uma ferramenta útil, mas tem limitações que você deve conhecer:
                </p>
                <ul className="space-y-2 text-yellow-700">
                  <li>• <strong>Não diferencia músculo de gordura:</strong> Atletas podem ter IMC alto devido à massa muscular</li>
                  <li>• <strong>Não considera distribuição da gordura:</strong> Gordura abdominal é mais perigosa que a periférica</li>
                  <li>• <strong>Varia com idade e etnia:</strong> Idosos e diferentes etnias têm parâmetros diferentes</li>
                  <li>• <strong>Não avalia composição corporal:</strong> Percentual de gordura é mais preciso</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                💪 Como Alcançar e Manter o Peso Ideal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">🍎 Alimentação Saudável</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Priorize alimentos naturais e minimamente processados</li>
                    <li>• Inclua frutas, verduras e legumes em todas as refeições</li>
                    <li>• Consuma proteínas de qualidade (carnes magras, peixes, ovos)</li>
                    <li>• Prefira carboidratos complexos (grãos integrais)</li>
                    <li>• Beba pelo menos 2 litros de água por dia</li>
                    <li>• Evite açúcares refinados e alimentos ultraprocessados</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">🏃‍♀️ Atividade Física</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Pratique pelo menos 150 minutos de exercício moderado por semana</li>
                    <li>• Inclua exercícios aeróbicos (caminhada, corrida, natação)</li>
                    <li>• Faça exercícios de força 2-3 vezes por semana</li>
                    <li>• Adicione atividades de flexibilidade (yoga, alongamento)</li>
                    <li>• Comece gradualmente e aumente a intensidade progressivamente</li>
                    <li>• Escolha atividades que você goste para manter a constância</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                ❓ Perguntas Frequentes sobre IMC
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    O IMC é igual para homens e mulheres?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Sim, a fórmula do IMC é a mesma para ambos os sexos. No entanto, mulheres naturalmente 
                    têm mais gordura corporal que homens, então a interpretação pode variar ligeiramente.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Com que frequência devo calcular meu IMC?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Para adultos, calcular o IMC mensalmente é suficiente para monitoramento. 
                    Se você está em processo de mudança de peso, pode calcular semanalmente.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    O IMC é confiável para idosos?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Para idosos (acima de 65 anos), os parâmetros podem ser diferentes. 
                    Um IMC ligeiramente mais alto pode ser considerado saudável nessa faixa etária.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Crianças podem usar a mesma calculadora de IMC?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Não. Crianças e adolescentes precisam de cálculos específicos que consideram 
                    idade e sexo, usando percentis de crescimento estabelecidos pela OMS.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Quer Mais Ferramentas de Saúde e Bem-estar?
            </h3>
            <p className="text-lg mb-6">
              Explore nossas outras calculadoras para uma vida mais saudável e equilibrada.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/calculadora-calorias/" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Calculadora de Calorias
              </a>
              <a href="/calculadora-idade/" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Calculadora de Idade
              </a>
              <a href="/calculadora-imposto-renda/" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Calculadora de IR
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 