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
        <div className="mt-8 text-center text-gray-600">
          <p className="mb-4">
            Bem-vindo à nossa Calculadora Digital Online! Aqui, você pode executar cálculos básicos
            de forma rápida e eficiente diretamente no navegador do seu computador.
          </p>
          {/* Ad space */}
          <div className="my-8 p-4 bg-gray-200 rounded">
            {/* Google AdSense will be placed here */}
            <p className="text-sm text-gray-500">Espaço Publicitário</p>
          </div>
        </div>
      </div>
    </main>
  );
}
