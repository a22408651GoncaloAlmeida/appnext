'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import TecnologiaDetailsCard from '@/components/TecnologiaDetailsCard';
import tecnologiasRaw from '@/app/data/tecnologias.json';

// Carregar tecnologias do arquivo JSON
const tecnologias = JSON.parse(JSON.stringify(tecnologiasRaw)) as Array<{
  title: string;
  image: string;
  description: string;
  rating: number;
}>;

// Definir os tipos de props para a página de tecnologia
interface TecnologiaPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Componente da página de tecnologia
export default async function TecnologiaPage({ params }: TecnologiaPageProps) {
  const { id } = await params;
  const index = parseInt(id, 10);

  // Validar se o índice é válido
  if (isNaN(index) || index < 0 || index >= tecnologias.length) {
    notFound();
  }

  const tecnologia = tecnologias[index];

  return (
    <main className="flex flex-col gap-8 items-center">
      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />

      <Link
        href="/tecnologias"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        ← Voltar
      </Link>
    </main>
  );
}
