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

type Props = {
  country: Country;
};

export default function PaisesCard({ country }: Props) {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Área: {country.area}</p>
      <p>População: {country.population}</p>
    </div>
  );
}
