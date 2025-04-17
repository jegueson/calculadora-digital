'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="mobile-menu-button p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        aria-label="Menu principal"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2`}>
        <div className="space-y-1">
          <h3 className="px-3 py-2 text-sm font-semibold text-gray-500">Calculadoras</h3>
          <Link href="/calculadora-cientifica" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Calculadora Científica
          </Link>
          <Link href="/calculadora-porcentagem" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Calculadora de Porcentagem
          </Link>
          <Link href="/gerador-senha" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Gerador de Senha
          </Link>
        </div>

        <div className="space-y-1">
          <h3 className="px-3 py-2 text-sm font-semibold text-gray-500">Finanças</h3>
          <Link href="/calculo-financiamento-imobiliario" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Cálculo de Financiamento Imobiliário
          </Link>
          <Link href="/juros-compostos" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Juros Compostos
          </Link>
          <Link href="/calculo-payback" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Cálculo de Payback
          </Link>
        </div>

        <div className="space-y-1">
          <h3 className="px-3 py-2 text-sm font-semibold text-gray-500">Outras</h3>
          <Link href="/calendario-feriados" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
            Calendário de Feriados
          </Link>
        </div>
      </div>
    </div>
  );
} 