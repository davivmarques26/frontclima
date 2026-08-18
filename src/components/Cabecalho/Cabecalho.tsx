import { Moon, Sun } from "lucide-react";
import { usarClima } from "../../context/ContextoClima";
import "./Cabecalho.css";

export default function Cabecalho() {
  const { tema, alternarTema } = usarClima();

  return (
    <header className="cabecalho">
      <div>
        <span className="cabecalho-subtitulo">CLIMA</span>
        <h1>Previsão do Tempo</h1>
      </div>

      <button className="botao-tema" onClick={alternarTema}>
        {tema === "escuro" ? <Sun size={16} /> : <Moon size={16} />}
        {tema === "escuro" ? "Claro" : "Escuro"}
      </button>
    </header>
  );
}
