'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { Product } from '@/models/interfaces'
import ProdutoDetalhe from '@/components/ProdutoDetalhe'

const API_BASE = 'https://deisishop.pythonanywhere.com'

async function fetchProduto(url: string): Promise<Product> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Erro ao obter produto')
  }
  return res.json()
}

export default function ProdutoPage() {
  const params = useParams()
  const id = params.id

  const { data, error, isLoading } = useSWR<Product>(
    `${API_BASE}/products/${id}`,
    fetchProduto
  )

  if (isLoading) {
    return <p className="p-8">A carregar produto...</p>
  }

  if (error || !data) {
    return <p className="p-8 text-red-600">Erro ao carregar produto</p>
  }

  return (
    <main className="p-8">
      <ProdutoDetalhe produto={data} />
    </main>
  )
}
