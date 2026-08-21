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
  const { clima, carregando, erro } = usarClima();

  const [paginaAtual, definirPaginaAtual] =
    useState<"inicio" | "mapa">("inicio");

  const [visualizacaoMapa, definirVisualizacaoMapa] =
    useState<"mapa" | "detalhes">("mapa");

  function abrirPaginaMapa() {
    definirPaginaAtual("mapa");
    definirVisualizacaoMapa("mapa");
  }

  return (
    <div className="aplicacao">
      <main className="pagina-principal">
        <Cabecalho
          aoClicarInicio={() => definirPaginaAtual("inicio")}
          aoClicarMapa={abrirPaginaMapa}
        />

        {/* PÁGINA INICIAL */}
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

        {/* PÁGINA DO MAPA */}
        {paginaAtual === "mapa" && (
          <>
            {visualizacaoMapa === "mapa" && (
              <MapaClima
                aoSelecionarCidade={() =>
                  definirVisualizacaoMapa("detalhes")
                }
              />
            )}

            {visualizacaoMapa === "detalhes" && (
              <>
                <button
                  className="botao-voltar-mapa"
                  onClick={() =>
                    definirVisualizacaoMapa("mapa")
                  }
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
          </>
        )}
      </main>
    </div>
  );
}