'use client'

import React, { useEffect, useState } from 'react'

export default function Relogio() {
  const [now, setNow] = useState<Date>(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hora = now.toLocaleTimeString()

  return (
    <div className="text-sm text-gray-700 dark:text-gray-200">{hora}</div>
  )
}