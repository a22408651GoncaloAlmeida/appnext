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

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos)
  const [removidos, setRemovidos] = useState<number[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('produtos:removidos')
      if (raw) setRemovidos(JSON.parse(raw))
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    setProdutos(initialProdutos.filter((p) => !removidos.includes(p.id)))
  }, [removidos])

  function removerProduto(id: number) {
    const next = [...removidos, id]
    setRemovidos(next)
    try {
      localStorage.setItem('produtos:removidos', JSON.stringify(next))
    } catch (e) {}
  }

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-6">DEISIshop - Produtos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((p) => (
          <article key={p.id} className="border rounded p-4 flex flex-col items-center gap-3">
            <div className="w-28 h-28 relative">
              <Image src={`/tecnologias/${p.image}`} alt={p.title} width={112} height={112} className="object-contain" />
            </div>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="font-semibold">€ {p.price.toFixed(2)}</p>

            <div className="flex gap-2">
              <Link href={`/produtos/${p.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Ver</Link>
              <button onClick={() => removerProduto(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remover</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
