import { useMemo } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usarClima } from "../../context/ContextoClima";
import {
  obterDescricaoClima,
  obterEmojiClima,
} from "../../utils/clima";
import "./ClimaAtual.css";

export default function ClimaAtual() {
  const { clima } = usarClima();

  if (!clima) return null;

  const hoje = clima.diario[0];

  const horario = useMemo(() => {
    const horarioCompleto = clima.atual.horario.split("T")[1];
    return horarioCompleto?.slice(0, 5) ?? "";
  }, [clima.atual.horario]);

  const nomeLocal = [
    clima.localizacao.nome,
    clima.localizacao.pais,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="painel clima-atual">
      <div className="clima-atual-esquerda">
        <span className="texto-secundario">{nomeLocal}</span>

        <div className="temperatura-atual">
          {Math.round(clima.atual.temperatura)}°
          <span>C</span>
        </div>

        <div className="condicao-clima">
          <span className="emoji-condicao">
            {obterEmojiClima(clima.atual.codigoClima)}
          </span>

          <span>
            {obterDescricaoClima(clima.atual.codigoClima)}
          </span>
        </div>

        <div className="faixa-temperatura-hoje">
          <span className="temperatura-maxima">
            <ArrowUp size={14} />
            {Math.round(hoje.maxima)}°C
          </span>

          <span className="temperatura-minima">
            <ArrowDown size={14} />
            {Math.round(hoje.minima)}°C
          </span>
        </div>
      </div>

      <div className="clima-atual-direita">
        <div className="icone-clima-grande">
          {obterEmojiClima(clima.atual.codigoClima)}
        </div>

        <time>{horario}</time>
      </div>
    </section>
  );
}
