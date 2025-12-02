'use client'
import { useEffect, useState } from "react";

export default function MagiaDoJSX() {

    const [count, setCount] = useState(0);
    const [historico, setHistorico] = useState([]);

    // Carregar valores guardados
    useEffect(() => {
        const savedValor = localStorage.getItem("contador_valor");
        const savedHistory = localStorage.getItem("contador_historico");

        if (savedValor) {
            setCount(Number(savedValor));
        }

        if (savedHistory) {
            setHistorico(JSON.parse(savedHistory));
        }

    }, []);

    // Guardar no localStorage sempre que mudar
    useEffect(() => {
        localStorage.setItem("contador_valor", String(count));
        localStorage.setItem("contador_historico", JSON.stringify(historico));
    }, [count, historico]);


    // Lógica do contador com limites
    const atualizarContador = (novoValor) => {

    if (novoValor < 0 || novoValor > 10) {
        return;
    }

    if (novoValor === count) {
        return;
    }

    setCount(novoValor);
    setHistorico([...historico, novoValor]);
    };


    // Cores conforme o valor
    const getTailwindColor = (valor) => {
        if (valor <= 3) return 'text-red-500';
        if (valor <= 7) return 'text-yellow-500';
        return 'text-green-500';
    };


    return (
        <>
            <h1>Contador Simples</h1>

            <p className={getTailwindColor(count)}>
                Contagem atual: {count}
            </p>

            <button
            className="border px-4 py-2 mx-2 rounded"
            onClick={() => atualizarContador(count + 1)}
            >+</button>

            <button
                className="border px-4 py-2 mx-2 rounded"
                onClick={() => atualizarContador(count - 1)}
            >-</button>

            <button
                className="border px-4 py-2 mx-2 rounded"
                onClick={() => atualizarContador(0)}
            >Reset</button>


           <h2>Histórico</h2>
           <ul>
              {historico.map((v, i) => (
                   <li key={i}>{v}</li>
              ))}
           </ul>
        </>
    );
}
