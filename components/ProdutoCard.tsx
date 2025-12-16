"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
}

type Props = {
  product: Product;
};

export default function ProdutoCard({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites: number[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  function toggleFavorite() {
    let favorites: number[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (favorites.includes(product.id)) {
      favorites = favorites.filter(id => id !== product.id);
      setIsFavorite(false);
    } else {
      favorites.push(product.id);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return (
    <div style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
      <Link href={`/produtos/${product.id}`}>
        <h3>{product.name}</h3>
      </Link>

      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
