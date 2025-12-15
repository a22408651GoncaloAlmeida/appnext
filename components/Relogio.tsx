'use client'

import { useEffect, useState } from 'react'

export default function Relogio() {
  const [hora, setHora] = useState<string | null>(null)

  useEffect(() => {
    const atualizar = () => {
      setHora(new Date().toLocaleTimeString())
    }

    atualizar()
    const id = setInterval(atualizar, 1000)

    return () => clearInterval(id)
  }, [])

  if (!hora) return null

  return (
    <div className="text-sm text-gray-700 dark:text-gray-200">
      {hora}
    </div>
  )
}
