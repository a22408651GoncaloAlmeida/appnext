'use client'

import React, { useEffect, useState } from 'react'
import produtosRaw from '@/app/data/produtos.json'
import Image from 'next/image'
import Link from 'next/link'

type Produto = {
  id: number
  title: string
  image: string
  price: number
  category: string
}

const initialProdutos = JSON.parse(JSON.stringify(produtosRaw)) as Produto[]

interface Params {
  categoria: string
}

export default function CategoriaPage({ params }: { params: Params }) {
  const categoria = decodeURIComponent(params.categoria)
  const [produtos, setProdutos] = useState<Produto[]>([])

  // Filtrar produtos pela categoria e removidos do localStorage
  useEffect(() => {
    const removedRaw = localStorage.getItem('produtos:removidos')
    const removed = removedRaw ? JSON.parse(removedRaw) as number[] : []
    setProdutos(initialProdutos.filter((p) => p.category === categoria && !removed.includes(p.id)))
  }, [categoria])

  // Renderizar a página da categoria com os produtos filtrados
  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-6">Categoria: {categoria}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((p) => (
          <article key={p.id} className="border rounded p-4 flex flex-col items-center gap-3">
            <div className="w-28 h-28 relative">
              <Image src={`/tecnologias/${p.image}`} alt={p.title} width={112} height={112} className="object-contain" />
            </div>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="font-semibold">€ {p.price.toFixed(2)}</p>
            <Link href={`/produtos/${p.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Ver</Link>
          </article>
        ))}
      </div>
    </main>
  )
}
