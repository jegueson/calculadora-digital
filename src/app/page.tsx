import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculadora Digital Online
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Calculator />
        </div>

        <article className="mt-8 text-center text-gray-600">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Calculadora Online Grátis</h2>
            <div className="mb-4">
              Bem-vindo à Calculadora Digital, sua ferramenta gratuita, rápida e fácil de usar para fazer todos os tipos de cálculos online. Com nossa calculadora, você pode resolver operações matemáticas simples e avançadas sem precisar instalar nada no seu dispositivo. Aproveite a praticidade e a precisão de uma calculadora completa, disponível a qualquer hora e em qualquer lugar!
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">O que é uma Calculadora Digital Online?</h2>
            <div className="mb-4">
              Uma calculadora online é uma ferramenta digital que permite realizar cálculos matemáticos diretamente do navegador, sem a necessidade de baixar nenhum aplicativo. Ela é ideal para estudantes, profissionais, professores e qualquer pessoa que precise fazer contas de forma rápida, prática e segura. Nossa calculadora digital oferece diversas funções, desde operações básicas até cálculos mais complexos, tudo em uma interface intuitiva e fácil de usar.
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Como Usar a Calculadora Digital?</h2>
            <div className="mb-4">Usar nossa calculadora online é muito simples:</div>
            <ul className="list-disc text-left pl-8 mb-4">
              <li>Digite os números: Utilize o teclado virtual ou o teclado do seu próprio computador/celular.</li>
              <li>Escolha a operação: Selecione entre adição (+), subtração (−), multiplicação (×), divisão (÷) ou outras funções disponíveis.</li>
              <li>Veja o resultado: O cálculo é feito automaticamente e o resultado aparece na tela.</li>
              <li>Limpe e recomece: Clique em "C" para limpar e fazer um novo cálculo.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Exemplo prático:</h2>
            <div className="mb-4">
              Se você deseja somar 25 + 17, basta digitar "25", clicar em "+", digitar "17" e pressionar "=". O resultado, 42, aparecerá imediatamente.
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Tipos de Cálculos Disponíveis</h2>
            <div className="mb-4">Nossa calculadora digital oferece diversas funções para facilitar o seu dia a dia:</div>
            <ul className="list-disc text-left pl-8 mb-4">
              <li>Adição: Some dois ou mais números facilmente.</li>
              <li>Subtração: Calcule diferenças de valores de forma rápida.</li>
              <li>Multiplicação: Resolva operações de multiplicação com precisão.</li>
              <li>Divisão: Divida números e obtenha resultados exatos.</li>
              <li>Porcentagem: Calcule descontos, acréscimos e variações percentuais.</li>
              <li>Cálculos científicos: Funções como raiz quadrada, potência e muito mais (disponível na calculadora científica).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Como funciona a calculadora online?</h3>
                <div>Basta acessar o site, digitar os números e escolher a operação desejada. O resultado aparece instantaneamente.</div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Posso usar a calculadora no celular?</h3>
                <div>Sim! Nossa calculadora é totalmente responsiva e funciona perfeitamente em celulares, tablets e computadores.</div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Qual a diferença entre calculadora simples e científica?</h3>
                <div>A calculadora simples realiza operações básicas (adição, subtração, multiplicação e divisão). Já a calculadora científica oferece funções avançadas, como potências, raízes, trigonometria e muito mais.</div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Outras Calculadoras Disponíveis</h2>
            <div className="mb-4">Além da calculadora padrão, oferecemos outras ferramentas úteis para você:</div>
            <ul className="list-disc text-left pl-8 mb-4">
              <li>Calculadora de IMC: Descubra seu Índice de Massa Corporal.</li>
              <li>Calculadora de Porcentagem: Calcule descontos e acréscimos facilmente.</li>
              <li>Calculadora de Regra de Três: Resolva proporções de maneira simples.</li>
              <li>Calculadora de Juros: Faça cálculos financeiros rapidamente.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Dicas para Aproveitar ao Máximo sua Calculadora Digital</h2>
            <ul className="list-disc text-left pl-8 mb-4">
              <li>Salve o site nos favoritos para acessar sempre que precisar.</li>
              <li>Use a calculadora em todas as suas atividades: estudos, trabalho, compras e finanças pessoais.</li>
              <li>Experimente as diferentes funções e descubra qual delas atende melhor às suas necessidades.</li>
              <li>Compartilhe a Calculadora Digital com amigos, colegas e familiares!</li>
            </ul>
          </section>

          {/* Ad space */}
          <div className="my-8 p-4 bg-gray-200 rounded">
           
          </div>
        </article>
      </div>
    </main>
  );
}
