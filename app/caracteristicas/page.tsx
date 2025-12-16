import React from 'react'
import Caracteristica from '@/components/Caracteristica'

// Componente da página que lista todas as características
export default function CaracteristicasPage() {
  const caracteristicas = [
        'JSX, sintaxe que mistura HTML e JS.',
        'Componentes, funções que retornam JSX.',
        'Componentes Reutilizáveis e Modulares.',
        'Roteamento Automático e APIs.',
        'Hooks: useState, useEffect e useSWR.',
        'Renderização Rápida e SEO Friendly.',
        'TypeScript Seguro e Escalável.',
        'Comunidade Ativa e Popularidade.'
  ]
  
  // Renderizar a lista de características
  return (
    <div className="bg-slate-800 text-white p-6 rounded-lg shadow w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Características do React e Next.js
      </h2>

      <ul className="flex flex-col items-center gap-4">
        {caracteristicas.map((caracteristica, i) => (
          <Caracteristica
            key={i}
            caracteristica={caracteristica}
            index={i}
          />
        ))}
      </ul>
    </div>
  )
}
