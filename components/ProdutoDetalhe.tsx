import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

const API_BASE = 'https://deisishop.pythonanywhere.com'

interface Props {
  produto: Product
}

export default function ProdutoDetalhe({ produto }: Props) {
  const imageUrl = produto.image.startsWith('http')
    ? produto.image
    : `${API_BASE}${produto.image}`

  return (
    <div className="max-w-2xl mx-auto border rounded p-6">
      <Image
        src={imageUrl}
        alt={produto.title}
        width={300}
        height={300}
        className="object-contain mx-auto"
      />

      <h1 className="text-2xl font-bold mt-6">{produto.title}</h1>

      <p className="text-gray-600 mt-2">{produto.category}</p>

      <p className="my-4">{produto.description}</p>

      <p className="font-semibold text-lg">
        € {Number(produto.price).toFixed(2)}
      </p>

      <p className="text-yellow-600 mt-2">
        ⭐ {produto.rating.rate} ({produto.rating.count})
      </p>

      <Link
        href="/produtos"
        className="inline-block mt-6 bg-gray-800 text-white px-4 py-2 rounded"
      >
        ← Voltar aos produtos
      </Link>
    </div>
  )
}
