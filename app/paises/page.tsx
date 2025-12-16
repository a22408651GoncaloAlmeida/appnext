"use client";

import { useEffect, useState } from "react";
import PaisesCard from "@/components/PaisesCard";

interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
        eng: {
            official: string
            common: string
        }
    }
  };
  area: number;
  population: number;
}

export default function PaisesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("https://moodle.deisi.ulusofona.pt/pluginfile.php/2954/mod_resource/content/1/paises.json")
      .then(res => res.json())
      .then((data: Country[]) => setCountries(data));
  }, []);

  const filtered = countries
    .filter(country =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      order === "asc"
        ? a.population - b.population
        : b.population - a.population
    );

  return (
    <div>
      <h1>Países</h1>

      <input
        placeholder="Filtrar por nome"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select onChange={e => setOrder(e.target.value as "asc" | "desc")}>
        <option value="asc">População ↑</option>
        <option value="desc">População ↓</option>
      </select>

      {filtered.map((country, index) => (
        <PaisesCard key={index} country={country} />
      ))}
    </div>
  );
}
