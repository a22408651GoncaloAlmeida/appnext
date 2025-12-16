'use client'

import React from 'react'
import produtosRaw from '@/app/data/produtos.json'
import Link from 'next/link'

// Carregar produtos do arquivo JSON
const produtos = JSON.parse(JSON.stringify(produtosRaw)) as Array<{ id:number, category:string, image:string }>

// Componente da página que lista todas as categorias
export default function CategoriasPage() {
  const categorias = Array.from(new Map(produtos.map(p => [p.category, p])).values())

  // Renderizar a lista de categorias
  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-6">Categorias</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((c) => (
          <Link key={c.category} href={`/categorias/${encodeURIComponent(c.category)}`} className="border rounded p-4 flex flex-col items-center gap-3">
            <div className="w-24 h-24 bg-gray-50 rounded flex items-center justify-center">
              <img src={`/tecnologias/${c.image}`} alt={c.category} className="w-16 h-16 object-contain" />
            </div>
            <h3 className="font-semibold">{c.category}</h3>
          </Link>
        ))}
      </div>
    </main>
  )
}
