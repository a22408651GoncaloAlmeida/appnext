'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Product } from '@/models/interfaces'

const API_BASE = 'https://deisishop.pythonanywhere.com'

interface Props {
  produto: Product
  onAdd?: (produto: Product) => void
  onRemove?: (id: number) => void
}

export default function ProdutoCard({ produto, onAdd, onRemove }: Props) {
  const router = useRouter()

  const imageUrl = produto.image.startsWith('http')
    ? produto.image
    : `${API_BASE}${produto.image}`

  function abrirProduto() {
    router.push(`/produtos/${produto.id}`)
  }

  return (
    <article
      onClick={abrirProduto}
      className="
        border rounded p-4 flex flex-col h-full
        cursor-pointer hover:shadow
      "
    >
      {/* IMAGEM */}
      <div className="flex justify-center mb-3">
        <Image
          src={imageUrl}
          alt={produto.title}
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="flex-grow text-center">
        <h3 className="font-semibold mb-2 line-clamp-2">
          {produto.title}
        </h3>

        <p className="font-semibold mb-4">
          € {Number(produto.price).toFixed(2)}
        </p>
      </div>

      {/* BOTÕES (não abrem o produto) */}
      <div
        className="mt-auto flex flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {onAdd && (
          <button
            onClick={() => onAdd(produto)}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Adicionar
          </button>
        )}

        {onRemove && (
          <button
            onClick={() => onRemove(produto.id)}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Remover
          </button>
        )}
      </div>
    </article>
  )
}
