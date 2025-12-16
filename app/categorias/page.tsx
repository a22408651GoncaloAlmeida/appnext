'use client'

import useSWR from 'swr'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

const API_URL = 'https://deisishop.pythonanywhere.com/products'

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Erro')
    return res.json()
  })

export default function CategoriasPage() {
  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher)

  if (isLoading) return <p className="p-8">A carregar...</p>
  if (error || !data) return <p className="p-8">Erro</p>

  // 🔹 extrair categorias únicas da API
  const categorias = Array.from(
    new Set(data.map(p => p.category))
  )

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-6">Categorias</h2>

      <div className="flex flex-col gap-4 items-center">
        {categorias.map((cat) => (
          <Link
            key={cat}
            href={`/categorias/${encodeURIComponent(cat)}`}
            className="border rounded p-4 w-full max-w-xl text-center hover:bg-gray-50"
          >
            {cat}
          </Link>
        ))}
      </div>
    </main>
  )
}
