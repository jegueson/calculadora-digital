import { Metadata } from 'next';
import NetSalaryCalculator from '@/components/NetSalaryCalculator';
import { getCurrentYear } from '@/utils/date';
import { calcNetSalaryInputs } from '@/utils/brazilPayroll';

const y = getCurrentYear();

export const metadata: Metadata = {
  title: `Calculadora de Salário Líquido ${y} | CLT, INSS e IRRF`,
  description:
    'Calcule seu salário líquido com INSS progressivo, IRRF e vale-transporte. Tabelas atualizadas e exemplos para R$2.000, R$3.000, R$5.000 e R$10.000.',
  alternates: {
    canonical: 'https://calculadora-digital.com.br/calculadora-salario-liquido/',
  },
  openGraph: {
    title: `Calculadora de Salário Líquido ${y} | CLT, INSS e IRRF`,
    description:
      'Estime seu salário líquido com INSS, IRRF e vale-transporte. Ferramenta educativa para trabalhadores CLT.',
    url: 'https://calculadora-digital.com.br/calculadora-salario-liquido/',
    type: 'website',
  },
};

function formatBrl(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

const exampleSalaries = [2000, 3000, 5000, 10000];

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Calculadora de Salário Líquido {y}
          </h1>
          <p className="text-gray-600">
            Simule descontos de INSS, IRRF e vale-transporte para uma estimativa do seu
            pagamento líquido.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <NetSalaryCalculator />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Tabela INSS {y} (contribuição progressiva)</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Faixa salarial</th>
                    <th className="border border-gray-300 p-2 text-left">Alíquota</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Até R$ 1.518,00</td>
                    <td className="border border-gray-300 p-2">7,5%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">De R$ 1.518,01 a R$ 2.793,88</td>
                    <td className="border border-gray-300 p-2">9%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">De R$ 2.793,89 a R$ 4.190,83</td>
                    <td className="border border-gray-300 p-2">12%</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">De R$ 4.190,84 a R$ 8.157,41 (teto)</td>
                    <td className="border border-gray-300 p-2">14%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Tabela IRRF {y} (retenção mensal)</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Base de cálculo</th>
                    <th className="border border-gray-300 p-2 text-left">Alíquota</th>
                    <th className="border border-gray-300 p-2 text-left">Dedução</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Até R$ 2.259,20</td>
                    <td className="border border-gray-300 p-2">Isento</td>
                    <td className="border border-gray-300 p-2">—</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">De R$ 2.259,21 a R$ 2.826,65</td>
                    <td className="border border-gray-300 p-2">7,5%</td>
                    <td className="border border-gray-300 p-2">R$ 169,44</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">De R$ 2.826,66 a R$ 3.751,05</td>
                    <td className="border border-gray-300 p-2">15%</td>
                    <td className="border border-gray-300 p-2">R$ 381,44</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">De R$ 3.751,06 a R$ 4.664,68</td>
                    <td className="border border-gray-300 p-2">22,5%</td>
                    <td className="border border-gray-300 p-2">R$ 662,77</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Acima de R$ 4.664,68</td>
                    <td className="border border-gray-300 p-2">27,5%</td>
                    <td className="border border-gray-300 p-2">R$ 896,00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Exemplos de salário líquido</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Estimativas sem vale-transporte e sem dependentes. Valores aproximados para referência.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Salário bruto</th>
                    <th className="border border-gray-300 p-2 text-left">INSS</th>
                    <th className="border border-gray-300 p-2 text-left">IRRF</th>
                    <th className="border border-gray-300 p-2 text-left">Líquido estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleSalaries.map((gross) => {
                    const { inss, irrf, netBeforeVt } = calcNetSalaryInputs(gross, 0);
                    return (
                      <tr key={gross}>
                        <td className="border border-gray-300 p-2">{formatBrl(gross)}</td>
                        <td className="border border-gray-300 p-2">{formatBrl(inss)}</td>
                        <td className="border border-gray-300 p-2">{formatBrl(irrf)}</td>
                        <td className="border border-gray-300 p-2 font-semibold">{formatBrl(netBeforeVt)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Descontos e benefícios</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>
                <strong>Vale-transporte:</strong> o empregador pode descontar até 6% do salário bruto
                quando o benefício é concedido.
              </li>
              <li>
                <strong>Dependentes:</strong> cada dependente reduz a base do IRRF em R$ 189,59
                (valor de referência — confirme tabelas oficiais).
              </li>
              <li>
                <strong>Outros descontos:</strong> plano de saúde, pensão alimentícia e empréstimos
                consignados reduzem ainda mais o valor recebido.
              </li>
            </ul>

            <p className="text-sm text-gray-600">
              Veja também:{' '}
              <a href="/calculadora-hora-extra/" className="text-blue-600 hover:underline">
                calculadora de hora extra
              </a>
              ,{' '}
              <a href="/calculadora-13-ferias/" className="text-blue-600 hover:underline">
                calculadora de 13º e férias
              </a>{' '}
              e{' '}
              <a href="/calculadora-vale-transporte/" className="text-blue-600 hover:underline">
                calculadora de vale-transporte
              </a>
              .
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
