'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

const API_BASE = 'https://deisishop.pythonanywhere.com'

// Definindo o tipo para o produto
type Produto = {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
}

// Componente da página do produto
export default function ProdutoPage() {
  const { id } = useParams()
  const router = useRouter()
  const [produto, setProduto] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)

  // Buscar os dados do produto ao carregar o componente
  useEffect(() => {
    async function fetchProduto() {
      const res = await fetch(`${API_BASE}/products/${id}`)
      const data = await res.json()

      // Ajustar os dados do produto conforme necessário
      setProduto({
        ...data,
        price: Number(data.price),
        image: data.image.startsWith('http')
          ? data.image
          : `${API_BASE}${data.image}`,
      })
      setLoading(false)
    }
    fetchProduto()
  }, [id])

  if (loading) return <p className="p-8">A carregar...</p>
  if (!produto) return <p className="p-8">Produto não encontrado</p>

  // Renderizar a página do produto
  return (
    <main className="p-8 max-w-xl mx-auto">
      <Image src={produto.image} alt={produto.title} width={300} height={300} />
      <h1 className="text-2xl font-bold mt-4">{produto.title}</h1>
      <p className="text-gray-600">{produto.category}</p>
      <p className="my-4">{produto.description}</p>
      <p className="font-semibold">€ {produto.price.toFixed(2)}</p>

      <button
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
        onClick={() => {
          alert('Produto removido (simulado)')
          router.push('/produtos')
        }}
      >
        Remover produto
      </button>
    </main>
  )
}