'use client';

import Link from 'next/link';

export default function DesktopNavigation() {
  return (
    <div className="hidden md:flex md:items-center md:ml-6 space-x-4">
      {/* Calculadoras Dropdown */}
      <div className="relative group">
        <div className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800 cursor-pointer">
          Calculadoras
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div 
          className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          style={{ zIndex: 9999 }}
        >
          <div className="py-1">
            <Link href="/calculadora-cientifica" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Calculadora Científica
            </Link>
            <Link href="/calculadora-porcentagem" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Calculadora de Porcentagem
            </Link>
            <Link href="/calculadora-imposto-renda" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Calculadora de IR
            </Link>
            <Link href="/calculadora-imc" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Calculadora de IMC
            </Link>
            <Link href="/calculadora-fgts" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Calculadora de FGTS
            </Link>
            <Link href="/calculadora-calorias" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Calculadora de Calorias
            </Link>
            <Link href="/gerador-senha" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Gerador de Senha
            </Link>
          </div>
        </div>
      </div>

      {/* Trabalho & Brasil Dropdown */}
      <div className="relative group">
        <div className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800 cursor-pointer">
          Trabalho &amp; Brasil
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div 
          className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          style={{ zIndex: 9999 }}
        >
          <div className="py-1 max-h-[70vh] overflow-y-auto">
            <Link href="/calculadora-salario-liquido" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Salário líquido (CLT)
            </Link>
            <Link href="/calculadora-rescisao-trabalhista" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Rescisão trabalhista
            </Link>
            <Link href="/calculadora-13-ferias" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              13º e férias
            </Link>
            <Link href="/calculadora-hora-extra" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Horas extras e noturno
            </Link>
            <Link href="/calculadora-vale-transporte" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Vale-transporte
            </Link>
            <Link href="/calculadora-das-mei" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              DAS MEI
            </Link>
            <Link href="/calculadora-bpc-loas" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              BPC / renda per capita
            </Link>
          </div>
        </div>
      </div>

      {/* Finanças Dropdown */}
      <div className="relative group">
        <div className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800 cursor-pointer">
          Finanças
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div 
          className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          style={{ zIndex: 9999 }}
        >
          <div className="py-1 max-h-[70vh] overflow-y-auto">
            <Link href="/calculo-financiamento-imobiliario" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Financiamento imobiliário
            </Link>
            <Link href="/calculadora-financiamento-veiculo" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Financiamento de veículo
            </Link>
            <Link href="/calculadora-consorcio" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Consórcio
            </Link>
            <Link href="/calculadora-cdb-cdi" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              CDB / CDI
            </Link>
            <Link href="/calculadora-cartao-credito" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cartão de crédito
            </Link>
            <Link href="/juros-compostos" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Juros Compostos
            </Link>
            <Link href="/calculo-payback" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cálculo de Payback
            </Link>
            <Link href="/calculadora-aposentadoria" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Aposentadoria
            </Link>
          </div>
        </div>
      </div>

      {/* Outras Dropdown */}
      <div className="relative group">
        <div className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800 cursor-pointer">
          Outras
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div 
          className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
          style={{ zIndex: 9999 }}
        >
          <div className="py-1">
            <a 
              href="https://calendario-feriados.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Calendário de Feriados
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 