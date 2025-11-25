interface ProjetoProps {
  nome: string;
  url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <div className="mb-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-semibold"
      >
        {nome}
      </a>
      {" - "} Confira meu projeto <span className="font-semibold">{nome}</span> clicando no link acima.
    </div>
  );
}
