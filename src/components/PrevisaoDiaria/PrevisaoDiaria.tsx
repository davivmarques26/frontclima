import { useMemo } from "react";
import { usarClima } from "../../context/ContextoClima";
import {
  obterDiaCurto,
  obterEmojiClima,
} from "../../utils/clima";
import "./PrevisaoDiaria.css";

export default function PrevisaoDiaria() {
  const { clima } = usarClima();

  const limitesTemperatura = useMemo(() => {
    if (!clima) {
      return {
        minima: 0,
        maxima: 1,
      };
    }

    const temperaturas = clima.diario.flatMap((dia) => [
      dia.minima,
      dia.maxima,
    ]);

    return {
      minima: Math.min(...temperaturas),
      maxima: Math.max(...temperaturas),
    };
  }, [clima]);

  if (!clima) return null;

  const intervalo =
    Math.max(
      1,
      limitesTemperatura.maxima - limitesTemperatura.minima
    );

  return (
    <section className="painel painel-previsao">
      <h2>PREVISÃO DIÁRIA</h2>

      <div className="lista-previsao">
        {clima.diario.map((dia, indice) => {
          const deslocamento =
            ((dia.minima - limitesTemperatura.minima) /
              intervalo) *
            55;

          const largura =
            Math.max(
              18,
              ((dia.maxima - dia.minima) / intervalo) * 55
            );

          return (
            <div className="linha-previsao" key={dia.data}>
              <strong
                className={
                  indice === 0 ? "rotulo-hoje" : ""
                }
              >
                {obterDiaCurto(dia.data, indice)}
              </strong>

              <span className="icone-previsao">
                {obterEmojiClima(dia.codigoClima)}
              </span>

              <div className="trilho-temperatura">
                <div
                  className="faixa-temperatura"
                  style={{
                    left: `${deslocamento}%`,
                    width: `${largura}%`,
                  }}
                />
              </div>

              <span className="valor-minimo">
                {Math.round(dia.minima)}°
              </span>

              <span className="valor-maximo">
                {Math.round(dia.maxima)}°
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
