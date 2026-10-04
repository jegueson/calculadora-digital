import Link from 'next/link';

/**
 * Static-export 404 page. `next build` writes this to build/404.html, which
 * Cloudflare Workers serves when assets.not_found_handling is "404-page".
 */
export default function NotFound() {
  return (
    <div className="min-h-[50vh] bg-gray-100 py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Página não encontrada</h1>
        <p className="text-gray-600 mb-6">
          Esse endereço não existe na Calculadora Digital.
        </p>
        <Link href="/" className="text-blue-600 hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
