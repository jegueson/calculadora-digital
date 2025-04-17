import PaybackCalculator from '@/components/PaybackCalculator';

export default function PaybackPage() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Calculadora de Payback
        </h1>
        <PaybackCalculator />
      </div>
    </main>
  );
} 