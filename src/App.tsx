import { useState } from "react";

import Cabecalho from "./components/Cabecalho/Cabecalho";
import BarraPesquisa from "./components/BarraPesquisa/BarraPesquisa";
import ClimaAtual from "./components/ClimaAtual/ClimaAtual";
import EstatisticasClima from "./components/EstatisticasClima/EstatisticasClima";
import GraficoTemperatura from "./components/GraficoTemperatura/GraficoTemperatura";
import PrevisaoDiaria from "./components/PrevisaoDiaria/PrevisaoDiaria";
import MapaClima from "./components/MapaClima/MapaClima";
import EstadoVazio from "./components/EstadoVazio/EstadoVazio";

import { usarClima } from "./context/ContextoClima";

import "./App.css";

export default function App() {
  const {
    clima,
    climaMapa,
    carregando,
    erro,
  } = usarClima();

  const [paginaAtual, definirPaginaAtual] =
    useState<"inicio" | "mapa">("inicio");

  const [visualizacaoMapa, definirVisualizacaoMapa] =
    useState<"mapa" | "detalhes">("mapa");

  function abrirPaginaInicio() {
    definirPaginaAtual("inicio");
  }

  function abrirPaginaMapa() {
    definirPaginaAtual("mapa");
  }

  function voltarParaMapa() {
    definirVisualizacaoMapa("mapa");
  }

  return (
    <div className="aplicacao">
      <main className="pagina-principal">

        <Cabecalho
          aoClicarInicio={abrirPaginaInicio}
          aoClicarMapa={abrirPaginaMapa}
        />

        {paginaAtual === "inicio" && (
          <>
            <BarraPesquisa />

            {erro && (
              <div className="caixa-erro">
                ⚠️ {erro}
              </div>
            )}

            {carregando && (
              <div className="caixa-carregando">
                Carregando dados meteorológicos...
              </div>
            )}

            {!clima && !carregando && (
              <>
                <MapaClima />
                <EstadoVazio />
              </>
            )}

            {clima && !carregando && (
              <>
                <ClimaAtual />

                <EstatisticasClima />

                <GraficoTemperatura />

                <PrevisaoDiaria />
              </>
            )}
          </>
        )}

        {paginaAtual === "mapa" && (
          <>

            {visualizacaoMapa === "mapa" && (
              <MapaClima
                aoSelecionarCidade={() =>
                  definirVisualizacaoMapa(
                    "detalhes"
                  )
                }
              />
            )}

            {visualizacaoMapa === "detalhes" && (
              <>

                <button
                  className="botao-voltar-mapa"
                  onClick={voltarParaMapa}
                >
                  ← Voltar ao mapa
                </button>

                {erro && (
                  <div className="caixa-erro">
                    ⚠️ {erro}
                  </div>
                )}

                {carregando && (
                  <div className="caixa-carregando">
                    Carregando dados meteorológicos...
                  </div>
                )}

                {climaMapa && !carregando && (
                  <>
                    <ClimaAtual
                      dados={climaMapa}
                    />

                    <EstatisticasClima
                      dados={climaMapa}
                    />

                    <GraficoTemperatura
                      dados={climaMapa}
                    />

                    <PrevisaoDiaria
                      dados={climaMapa}
                    />
                  </>
                )}

              </>
            )}

          </>
        )}

      </main>
    </div>
  );
}