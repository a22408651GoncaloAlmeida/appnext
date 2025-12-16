'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';

const caracteristicas = [
  'JSX, sintaxe que mistura HTML e JS.',
  'Componentes, funções que retornam JSX.',
  'Componentes Reutilizáveis e Modulares.',
  'Roteamento Automático e APIs.',
  'Hooks: useState, useEffect e useSWR.',
  'Renderização Rápida e SEO Friendly.',
  'TypeScript Seguro e Escalável.',
  'Comunidade Ativa e Popularidade.'
];

// Definindo o tipo para os parâmetros da página
interface CaracteristicaPageProps {
  params: Promise<{
    caracteristica: string;
  }>;
}

// Componente da página que exibe a característica selecionada
export default async function CaracteristicaPage({ params }: CaracteristicaPageProps) {
  const { caracteristica } = await params;
  const index = parseInt(caracteristica, 10);

  // Validar se o índice é válido
  if (isNaN(index) || index < 0 || index >= caracteristicas.length) {
    notFound();
  }

  const caracteristicaSelecionada = caracteristicas[index];

  // Renderizar a página com a característica selecionada
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-[60vh]">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-12 border border-blue-200 dark:border-gray-600 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {caracteristicaSelecionada}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Esta é uma das principais características do React e Next.js.
        </p>
      </div>

      <Link
        href="/caracteristicas"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        ← Voltar
      </Link>
    </main>
  );
}
