import React from 'react';

export default function HolidayCalendar() {
  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calendário de Feriados
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Holiday Calendar component will be added here */}
          <p className="text-center text-gray-600">Em desenvolvimento...</p>
        </div>
        <div className="mt-8 text-center text-gray-600">
          <article className="prose prose-lg mx-auto">
            <h2>Feriados Nacionais e Datas Comemorativas</h2>
            <p>
              Mantenha-se informado sobre todos os feriados e datas importantes
              do calendário brasileiro. Nosso calendário inclui:
            </p>
            <ul className="list-disc text-left pl-8">
              <li>Feriados nacionais</li>
              <li>Feriados estaduais</li>
              <li>Datas comemorativas</li>
              <li>Pontos facultativos</li>
              <li>Eventos importantes</li>
            </ul>
            <p>
              Planeje suas atividades e compromissos com antecedência consultando
              nosso calendário completo de feriados.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
} 