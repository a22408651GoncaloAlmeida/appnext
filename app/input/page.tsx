'use client'

import React, { useState } from 'react'
import tecnologiasRaw from '@/app/data/tecnologias.json'

const tecnologias = JSON.parse(JSON.stringify(tecnologiasRaw)) as Array<{
  title: string
  image: string
  description: string
  rating: number
}>;

export default function InputPage() {
  // Input de texto com eco
  const [texto, setTexto] = useState('')

  // Seletor
  const [tecnologia, setTecnologia] = useState(tecnologias[0]?.title ?? '')

  // Lista de tarefas
  const [tarefas, setTarefas] = useState<Array<{ id: number; text: string }>>([])
  const [novaTarefa, setNovaTarefa] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  function adicionarTarefa() {
    const text = novaTarefa.trim()
    if (!text) return
    setTarefas((prev) => [...prev, { id: Date.now(), text }])
    setNovaTarefa('')
  }

  function apagarTarefa(id: number) {
    setTarefas((prev) => prev.filter((t) => t.id !== id))
  }

  function iniciarEdicao(id: number, currentText: string) {
    setEditId(id)
    setEditText(currentText)
  }

  function salvarEdicao() {
    if (editId == null) return
    const text = editText.trim()
    if (!text) return
    setTarefas((prev) => prev.map((t) => (t.id === editId ? { ...t, text } : t)))
    setEditId(null)
    setEditText('')
  }

  function cancelarEdicao() {
    setEditId(null)
    setEditText('')
  }

  return (
    <main className="p-8 flex flex-col gap-8">
      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-3">Input de Texto (eco)</h2>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Digite aqui..."
        />
        <p className="text-gray-700 dark:text-gray-300">Você digitou: <span className="font-semibold">{texto || '—'}</span></p>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-3">Seletor de Tecnologia</h2>
        <select
          value={tecnologia}
          onChange={(e) => setTecnologia(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          {tecnologias.map((t) => (
            <option key={t.title} value={t.title}>{t.title}</option>
          ))}
        </select>

        <p className="mt-3 text-gray-700 dark:text-gray-300">Tecnologia selecionada: <span className="font-semibold">{tecnologia}</span></p>
      </section>

      <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-3">Lista de Tarefas</h2>

        <div className="flex gap-2 mb-4">
          <input
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Nova tarefa"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={adicionarTarefa}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Inserir
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {tarefas.length === 0 && <li className="text-gray-500">Nenhuma tarefa</li>}

          {tarefas.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3 border rounded p-3">
              <div className="flex-1">
                {editId === t.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <span>{t.text}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editId === t.id ? (
                  <>
                    <button onClick={salvarEdicao} className="bg-green-600 text-white px-3 py-1 rounded">Salvar</button>
                    <button onClick={cancelarEdicao} className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => iniciarEdicao(t.id, t.text)} className="bg-yellow-400 px-3 py-1 rounded">Editar</button>
                    <button onClick={() => apagarTarefa(t.id)} className="bg-red-500 text-white px-3 py-1 rounded">Apagar</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
