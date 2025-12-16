'use client'

import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

const API_URL = 'https://deisishop.pythonanywhere.com/products'

const fetcher = (url: string) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error('Erro')
    return res.json()
  })

export default function CategoriaPage({
  params,
}: {
  params: { categoria: string }
}) {
  const categoria = decodeURIComponent(params.categoria)

  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher)

  if (isLoading) return <p className="p-8">A carregar...</p>
  if (error || !data) return <p className="p-8">Erro</p>

  const produtos = data.filter(p => p.category === categoria)

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        Categoria: {categoria}
      </h2>

      <Link
        href="/categorias"
        className="text-blue-600 underline mb-6 inline-block"
      >
        ← Voltar
      </Link>

      {produtos.length === 0 ? (
        <p>Sem produtos nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map(p => (
            <article
              key={p.id}
              className="border p-4 rounded flex flex-col items-center gap-3"
            >
              <Image
                src={p.image}
                alt={p.title}
                width={120}
                height={120}
                unoptimized
              />
              <h3 className="text-center font-semibold">
                {p.title}
              </h3>
              <p>€ {Number(p.price).toFixed(2)}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
