'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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

interface Params {
  id: string
}

export default function ProdutoPage({ params }: { params: Params }) {
  const id = parseInt(params.id, 10)
  const router = useRouter()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduto() {
      try {
        setLoading(true)
        const response = await fetch(`${API_BASE}/products`)
        if (!response.ok) throw new Error('Erro ao buscar produto')
        const data = await response.json()
        const produtos = Array.isArray(data) ? data : data.products || []
        const p = produtos.find((prod: Produto) => prod.id === id)
        setProduto(p || null)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setProduto(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduto()
  }, [id])

  if (loading) return <main className="p-8"><p>Carregando produto...</p></main>
  if (error) return <main className="p-8"><p className="text-red-500">Erro: {error}</p></main>
  if (!produto) return (
    <main className="p-8">
      <p>Produto não encontrado.</p>
      <button onClick={() => router.back()} className="mt-4 bg-gray-200 px-3 py-1 rounded">Voltar</button>
    </main>
  )

  return (
    <main className="p-8 flex flex-col items-center gap-6">
      <div className="border rounded p-6 flex flex-col items-center gap-4 bg-white shadow-md max-w-lg w-full">
        <div className="w-40 h-40 relative bg-gray-50 rounded flex items-center justify-center">
          <Image 
            src={produto.image} 
            alt={produto.title} 
            width={160} 
            height={160} 
            className="object-contain"
            unoptimized
          />
        </div>
        <h1 className="text-2xl font-bold text-center">{produto.title}</h1>
        <p className="text-sm text-gray-600">{produto.category}</p>
        {produto.rating && (
          <p className="text-yellow-500">⭐ {produto.rating.rate} ({produto.rating.count} avaliações)</p>
        )}
        <p className="text-gray-700 text-center text-sm mb-2">{produto.description}</p>
        <p className="font-semibold text-lg">€ {produto.price.toFixed(2)}</p>

        <div className="flex gap-3">
          <button onClick={() => router.back()} className="bg-gray-200 px-3 py-1 rounded">Voltar</button>
          <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Comprar</button>
        </div>
      </div>
    </main>
  )
}
