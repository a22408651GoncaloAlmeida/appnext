'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import { Product } from '@/models/interfaces'
import ProdutoDetalhe from '@/components/ProdutoDetalhe'

const API_BASE = 'https://deisishop.pythonanywhere.com'

// Função para buscar o produto
async function fetchProduto(url: string): Promise<Product> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Erro ao obter produto')
  }
  return res.json()
}

// Componente da página do produto
export default function ProdutoPage() {
  const params = useParams()
  const id = params.id

  // Usar SWR para buscar os dados do produto
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

  // Renderizar a página do produto
  return (
    <main className="p-8">
      <ProdutoDetalhe produto={data} />
    </main>
  )
}
