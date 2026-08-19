import { House, Map, Moon, Sun } from "lucide-react";
import { usarClima } from "../../context/ContextoClima";
import "./Cabecalho.css";

interface CabecalhoProps {
  aoClicarInicio: () => void;
  aoClicarMapa: () => void;
}

export default function Cabecalho({
  aoClicarInicio,
  aoClicarMapa,
}: CabecalhoProps) {
  const { tema, alternarTema } = usarClima();

  return (
    <header className="cabecalho">
      <div>
        <span className="cabecalho-subtitulo">
          CLIMA
        </span>

        <h1>Previsão do Tempo</h1>
      </div>

      <div className="acoes-cabecalho">
        <button
          className="botao-navegacao"
          onClick={aoClicarInicio}
        >
          <House size={16} />
          Início
        </button>

        <button
          className="botao-navegacao"
          onClick={aoClicarMapa}
        >
          <Map size={16} />
          Mapa
        </button>

        <button
          className="botao-tema"
          onClick={alternarTema}
        >
          {tema === "escuro" ? (
            <Sun size={16} />
          ) : (
            <Moon size={16} />
          )}

          {tema === "escuro" ? "Claro" : "Escuro"}
        </button>
      </div>
    </header>
  );
}