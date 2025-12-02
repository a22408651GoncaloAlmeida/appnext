"use client"

import React from 'react'
import Relogio from './Relogio'

interface FooterProps {
  year: number
}

export default function Footer({ year }: FooterProps) {
  return (
    <footer className="flex items-center gap-4">
      <span className="text-sm">{year}</span>
      <Relogio />
    </footer>
  )
}
