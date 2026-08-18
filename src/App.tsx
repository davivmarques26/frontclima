import Cabecalho from "./components/Cabecalho/Cabecalho";
import BarraPesquisa from "./components/BarraPesquisa/BarraPesquisa";
import ClimaAtual from "./components/ClimaAtual/ClimaAtual";
import EstatisticasClima from "./components/EstatisticasClima/EstatisticasClima";
import GraficoTemperatura from "./components/GraficoTemperatura/GraficoTemperatura";
import PrevisaoDiaria from "./components/PrevisaoDiaria/PrevisaoDiaria";
import EstadoVazio from "./components/EstadoVazio/EstadoVazio";
import { usarClima } from "./context/ContextoClima";
import "./App.css";

export default function App() {
  const { clima, carregando, erro } = usarClima();

  return (
    <div className="aplicacao">
      <main className="pagina-principal">
        <Cabecalho />
        <BarraPesquisa />

        {erro && <div className="caixa-erro">⚠️ {erro}</div>}

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
      </main>
    </div>
  );
}
