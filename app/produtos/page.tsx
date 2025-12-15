'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Product } from '@/models/interfaces'
import ProdutoCard from '@/components/ProdutoCard'

const API_URL = 'https://deisishop.pythonanywhere.com/products'
const BUY_URL = 'https://deisishop.pythonanywhere.com/buy'

async function fetchProdutos(url: string): Promise<Product[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Erro ao obter produtos')
  return res.json()
}

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetchProdutos)

  // carrinho
  const [cart, setCart] = useState<Product[]>([])

  // estudante
  const [student, setStudent] = useState(false)

  // cupão
  const [coupon, setCoupon] = useState('')

  // resposta da compra
  const [buyResponse, setBuyResponse] = useState<any>(null)

  // carregar carrinho
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) setCart(JSON.parse(storedCart))
  }, [])

  // guardar carrinho
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(produto: Product) {
    setCart((prev) => [...prev, produto])
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  // total
  const total = cart.reduce(
    (sum, produto) => sum + Number(produto.price),
    0
  )

  // COMPRAR
  async function buy() {
    try {
      const response = await fetch(BUY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: cart.map((p) => p.id),
          name: 'Cliente',
          student: student,
          coupon: coupon,
        }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      setBuyResponse(data)
      setCart([])
      localStorage.removeItem('cart')
    } catch (err) {
      console.error('Erro ao comprar')
    }
  }

  if (isLoading) return <p className="p-8">A carregar produtos...</p>
  if (error) return <p className="p-8 text-red-600">Erro ao carregar produtos</p>

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>

      {/* PRODUTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAdd={addToCart}
          />
        ))}
      </div>

      {/* CARRINHO */}
      <h2 className="text-xl font-bold mt-10 mb-4">Carrinho</h2>

      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((produto, index) => (
              <ProdutoCard
                key={`${produto.id}-${index}`}
                produto={produto}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <p className="text-lg font-semibold mt-4">
            Total: € {total.toFixed(2)}
          </p>

          {/* ESTUDANTE */}
          <label className="block mt-4">
            <input
              type="checkbox"
              checked={student}
              onChange={(e) => setStudent(e.target.checked)}
              className="mr-2"
            />
            Estudante DEISI
          </label>

          {/* CUPÃO */}
          <input
            type="text"
            placeholder="Cupão de desconto"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border p-2 mt-2 block"
          />

          {/* BOTÃO COMPRAR */}
          <button
            onClick={buy}
            className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
          >
            Comprar
          </button>
        </>
      )}

      {/* RESPOSTA DA API */}
      {buyResponse && (
        <pre className="bg-gray-100 p-4 mt-6 text-sm">
          {JSON.stringify(buyResponse, null, 2)}
        </pre>
      )}
    </main>
  )
}