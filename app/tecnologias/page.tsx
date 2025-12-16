import React from 'react'
import TecnologiaCard from '@/components/TecnologiaCard'
import tecnologiasRaw from '@/app/data/tecnologias.json'

// Carregar tecnologias do arquivo JSON
const tecnologias = JSON.parse(JSON.stringify(tecnologiasRaw)) as Array<{
  title: string
  image: string
  description: string
  rating: number
}>

// Componente da página de tecnologias
export default function TecnologiasPage() {
  return (
    <main className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Tecnologias Exploradas</h2>

      // Renderizar os cartões de tecnologia
      <div className="flex flex-wrap gap-6 justify-center">
        {tecnologias.map((tech, index) => (
          <TecnologiaCard
            key={tech.title}
            title={tech.title}
            image={tech.image}
            index={index}
          />
        ))}
      </div>
    </main>
  )
}
