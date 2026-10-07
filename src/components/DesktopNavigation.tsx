'use client';

import Link from 'next/link';
import { calculatorPath, getDesktopGroup, type DesktopGroup } from '@/data/calculators';

const GROUPS: { id: DesktopGroup; label: string }[] = [
  { id: 'calculadoras', label: 'Calculadoras' },
  { id: 'trabalho', label: 'Trabalho & Brasil' },
  { id: 'financas', label: 'Finanças' },
];

export default function DesktopNavigation() {
  return (
    <div className="hidden md:flex md:items-center md:ml-6 space-x-4">
      {GROUPS.map((group) => (
        <div className="relative group" key={group.id}>
          <div className="inline-flex items-center px-1 pt-1 text-gray-600 hover:text-gray-800 cursor-pointer">
            {group.label}
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div
            className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
            style={{ zIndex: 9999 }}
          >
            <div className={`py-1 ${group.id === 'calculadoras' ? '' : 'max-h-[70vh] overflow-y-auto'}`}>
              {getDesktopGroup(group.id).map((entry) => (
                <Link
                  key={entry.slug}
                  href={calculatorPath(entry.slug)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {entry.desktopLabel}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

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
