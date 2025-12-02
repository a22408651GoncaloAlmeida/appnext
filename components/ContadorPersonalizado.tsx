'use client'

import React, { useEffect, useState } from 'react'

interface ContadorProps {
  title: string
}

export default function ContadorPersonalizado({ title }: ContadorProps) {
  const storageKey = `likes:${title}`
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setCount(parseInt(raw, 10) || 0)
    } catch (e) {
      console.warn('localStorage unavailable', e)
    }
  }, [storageKey])

  function handleLike() {
    const next = count + 1
    setCount(next)
    try {
      localStorage.setItem(storageKey, String(next))
    } catch (e) {
      console.warn('localStorage unavailable', e)
    }
  }

  return (
    <button
      onClick={handleLike}
      className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full text-sm"
    >
      ❤️ {count}
    </button>
  )
}
