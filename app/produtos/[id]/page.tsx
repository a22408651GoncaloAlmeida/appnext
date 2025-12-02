'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import produtosRaw from '@/app/data/produtos.json'
import Image from 'next/image'

type Produto = {
  id: number
  title: string
  image: string
  price: number
  category: string
}

const initialProdutos = JSON.parse(JSON.stringify(produtosRaw)) as Produto[]

interface Params {
  id: string
}

export default function ProdutoPage({ params }: { params: Params }) {
  const id = parseInt(params.id, 10)
  const router = useRouter()
  const [produtos, setProdutos] = useState<Produto[]>(initialProdutos)
  const [produto, setProduto] = useState<Produto | null>(null)

  useEffect(() => {
    const removedRaw = localStorage.getItem('produtos:removidos')
    const removed = removedRaw ? JSON.parse(removedRaw) as number[] : []
    setProdutos(initialProdutos.filter((p) => !removed.includes(p.id)))
  }, [])

  useEffect(() => {
    setProduto(produtos.find((p) => p.id === id) ?? null)
  }, [produtos, id])

  function remover() {
    const raw = localStorage.getItem('produtos:removidos')
    const removed = raw ? JSON.parse(raw) as number[] : []
    const next = Array.from(new Set([...removed, id]))
    localStorage.setItem('produtos:removidos', JSON.stringify(next))
    router.push('/produtos')
  }

  if (!produto) return (
    <main className="p-8">
      <p>Produto não encontrado ou removido.</p>
      <button onClick={() => router.back()} className="mt-4 bg-gray-200 px-3 py-1 rounded">Voltar</button>
    </main>
  )

  return (
    <main className="p-8 flex flex-col items-center gap-6">
      <div className="border rounded p-6 flex flex-col items-center gap-4">
        <div className="w-40 h-40 relative">
          <Image src={`/tecnologias/${produto.image}`} alt={produto.title} width={160} height={160} className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold">{produto.title}</h1>
        <p className="text-sm text-gray-600">{produto.category}</p>
        <p className="font-semibold">€ {produto.price.toFixed(2)}</p>

        <div className="flex gap-3">
          <button onClick={() => router.back()} className="bg-gray-200 px-3 py-1 rounded">Voltar</button>
          <button onClick={remover} className="bg-red-500 text-white px-3 py-1 rounded">Remover Produto</button>
        </div>
      </div>
    </main>
  )
}
