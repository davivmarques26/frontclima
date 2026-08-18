import { usarClima } from "../../context/ContextoClima";
import "./EstatisticasClima.css";

export default function EstatisticasClima() {
  const { clima } = usarClima();

  if (!clima) return null;

  const estatisticas = [
    {
      titulo: "UMIDADE",
      valor: Math.round(clima.atual.umidade),
      unidade: "%",
    },
    {
      titulo: "VELOCIDADE DO VENTO",
      valor: Math.round(clima.atual.velocidadeVento),
      unidade: "km/h",
    },
    {
      titulo: "PRECIPITAÇÃO",
      valor: clima.atual.precipitacao.toFixed(1),
      unidade: "mm",
    },
    {
      titulo: "SENSAÇÃO TÉRMICA",
      valor: Math.round(clima.atual.sensacaoTermica),
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
            <small>{estatistica.unidade}</small>
          </strong>
        </article>
      ))}
    </section>
  );
}
