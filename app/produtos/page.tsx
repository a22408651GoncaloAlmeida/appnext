'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Produto = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

const API_BASE = "https://deisishop.pythonanywhere.com"

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE}/products`)
        if (!response.ok) throw new Error('Erro ao buscar produtos')
        const data = await response.json()
        setProdutos(Array.isArray(data) ? data : data.products || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setProdutos([])
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [])

  if (loading) return <main className="p-8"><p>Carregando produtos...</p></main>
  if (error) return <main className="p-8"><p className="text-red-500">Erro: {error}</p></main>

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-6">DEISIshop - Produtos</h2>

      {produtos.length === 0 ? (
        <p className="text-gray-500">Nenhum produto disponível</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((p) => (
            <article key={p.id} className="border rounded p-4 flex flex-col items-center gap-3 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-28 h-28 relative bg-gray-50 rounded flex items-center justify-center">
                <Image 
                  src={p.image} 
                  alt={p.title} 
                  width={112} 
                  height={112} 
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="font-semibold text-center">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.category}</p>
              {p.rating && (
                <p className="text-sm text-yellow-500">⭐ {p.rating.rate} ({p.rating.count})</p>
              )}
              <p className="font-semibold">€ {p.price.toFixed(2)}</p>

              <div className="flex gap-2">
                <Link href={`/loja/${p.id}`} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Ver</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
