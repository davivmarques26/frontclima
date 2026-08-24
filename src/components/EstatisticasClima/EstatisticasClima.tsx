import { usarClima } from "../../context/ContextoClima";
import type { DadosClima } from "../../types/clima";

import "./EstatisticasClima.css";

interface EstatisticasClimaProps {
  dados?: DadosClima | null;
}

export default function EstatisticasClima({
  dados,
}: EstatisticasClimaProps) {
  const { clima } = usarClima();

  const climaExibido = dados ?? clima;

  if (!climaExibido) {
    return null;
  }

  const estatisticas = [
    {
      titulo: "UMIDADE",
      valor: Math.round(
        climaExibido.atual.umidade
      ),
      unidade: "%",
    },
    {
      titulo: "VELOCIDADE DO VENTO",
      valor: Math.round(
        climaExibido.atual.velocidadeVento
      ),
      unidade: "km/h",
    },
    {
      titulo: "PRECIPITAÇÃO",
      valor:
        climaExibido.atual.precipitacao.toFixed(1),
      unidade: "mm",
    },
    {
      titulo: "SENSAÇÃO TÉRMICA",
      valor: Math.round(
        climaExibido.atual.sensacaoTermica
      ),
      unidade: "°C",
    },
  ];

  return (
    <section className="grade-estatisticas">
      {estatisticas.map((estatistica) => (
        <article
          className="cartao-estatistica"
          key={estatistica.titulo}
        >
          <span>{estatistica.titulo}</span>

          <strong>
            {estatistica.valor}

            <small>
              {estatistica.unidade}
            </small>
          </strong>
        </article>
      ))}
    </section>
  );
}