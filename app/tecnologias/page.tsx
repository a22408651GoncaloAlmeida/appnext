import React from 'react'
import Image from 'next/image'
import tecnologiasRaw from '@/app/data/tecnologias.json'

const tecnologias = JSON.parse(JSON.stringify(tecnologiasRaw)) as Array<{
  title: string
  image: string
  description: string
  rating: number
}>

export default function page() {
  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-8">Tecnologias Exploradas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tecnologias.map((tech) => (
          <article
            key={tech.title}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-center mb-4">
              <div className="relative w-24 h-24 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Image
                  src={`/tecnologias/${tech.image}`}
                  alt={`${tech.title} logo`}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-center mb-2">{tech.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 grow">
              {tech.description}
            </p>

            <div className="flex justify-center items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-1">
                {Array.from({ length: Math.round(tech.rating) }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <span className="text-sm text-gray-500">({tech.rating}/5)</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
