import { useMemo } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usarClima } from "../../context/ContextoClima";

import {
  obterDescricaoClima,
  obterEmojiClima,
} from "../../utils/clima";

import type { DadosClima } from "../../types/clima";

import "./ClimaAtual.css";

interface ClimaAtualProps {
  dados?: DadosClima | null;
}

export default function ClimaAtual({
  dados,
}: ClimaAtualProps) {
  const { clima } = usarClima();

  const climaExibido = dados ?? clima;

  if (!climaExibido) {
    return null;
  }

  const hoje = climaExibido.diario[0];

  const horario = useMemo(() => {
    const horarioCompleto =
      climaExibido.atual.horario.split("T")[1];

    return horarioCompleto?.slice(0, 5) ?? "";
  }, [climaExibido.atual.horario]);

  const nomeLocal = [
    climaExibido.localizacao.nome,
    climaExibido.localizacao.pais,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="painel clima-atual">
      <div className="clima-atual-esquerda">
        <span className="texto-secundario">
          {nomeLocal}
        </span>

        <div className="temperatura-atual">
          {Math.round(
            climaExibido.atual.temperatura
          )}
          °

          <span>C</span>
        </div>

        <div className="condicao-clima">
          <span className="emoji-condicao">
            {obterEmojiClima(
              climaExibido.atual.codigoClima
            )}
          </span>

          <span>
            {obterDescricaoClima(
              climaExibido.atual.codigoClima
            )}
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
          {obterEmojiClima(
            climaExibido.atual.codigoClima
          )}
        </div>

        <time>{horario}</time>
      </div>
    </section>
  );
}