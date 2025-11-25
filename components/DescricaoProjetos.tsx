import Projeto from "./Projeto";

export default function DescricaoProjetos() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>Meus Projetos</h2>
        <p>Ao longo da minha jornada de desenvolvimento, criei diversos projetos interessantes. Aqui estão alguns deles:</p>
      </div>

      <div className="flex flex-col gap-3">
        <Projeto
          nome="Loja Online"
          url="https://github.com/a22408651GoncaloAlmeida"
        />
        <Projeto
          nome="Site com JS Interativo"
          url="https://github.com/a22408651GoncaloAlmeida"
        />
        <Projeto
          nome="Portfólio Web"
          url="https://github.com/a22408651GoncaloAlmeida"
        />
      </div>

      <div className="mt-4">
        <p>
          Para ver todos os meus projetos, visite minha{" "}
          <a
            href="https://a22408651GoncaloAlmeida.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            homepage no GitHub Pages
          </a>
          .
        </p>
      </div>
    </div>
  );
}
