import React from 'react'
import Caracteristica from '@/components/Caracteristica'

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
  
    return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Características do React e Next.js</h2>
      <ul className="flex flex-col gap-3">
        {caracteristicas.map((caracteristica, i) => {
            return (
              <Caracteristica 
                key={i} 
                caracteristica={caracteristica}
                index={i}
              />
            )
        })}
      </ul>
    </div>
  )
}
