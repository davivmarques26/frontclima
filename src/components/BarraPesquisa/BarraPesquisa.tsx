import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import { MapPin, Search } from "lucide-react";

import { usarClima } from "../../context/ContextoClima";
import { buscarSugestoesCidade } from "../../services/apiClima";

import type { SugestaoCidade } from "../../types/clima";

import "./BarraPesquisa.css";

export default function BarraPesquisa() {
  const [cidade, definirCidade] = useState("");

  const [sugestoes, definirSugestoes] =
    useState<SugestaoCidade[]>([]);

  const [mostrarSugestoes, definirMostrarSugestoes] =
    useState(false);

  const [cidadeSelecionada, definirCidadeSelecionada] =
    useState(false);

  const {
    pesquisarClima,
    pesquisarClimaPorSugestao,
    usarMinhaLocalizacao,
    carregando,
  } = usarClima();

  useEffect(() => {
    if (cidadeSelecionada) {
      return;
    }

    if (cidade.trim().length < 2) {
      definirSugestoes([]);
      definirMostrarSugestoes(false);
      return;
    }

    const temporizador = setTimeout(async () => {
      const resultados =
        await buscarSugestoesCidade(cidade);

      definirSugestoes(resultados);
      definirMostrarSugestoes(true);
    }, 400);

    return () => {
      clearTimeout(temporizador);
    };
  }, [cidade, cidadeSelecionada]);

  async function enviarPesquisa(evento: FormEvent) {
    evento.preventDefault();

    definirMostrarSugestoes(false);

    await pesquisarClima(cidade);
  }

  async function selecionarCidade(
    sugestao: SugestaoCidade
  ) {
    definirCidadeSelecionada(true);
    definirCidade(sugestao.nome);
    definirSugestoes([]);
    definirMostrarSugestoes(false);
    await pesquisarClimaPorSugestao(sugestao);
  }

  return (
    <div className="container-pesquisa">
      <form
        className="linha-pesquisa"
        onSubmit={enviarPesquisa}
      >
        <label className="campo-pesquisa">
          <Search size={18} />
          <input
            value={cidade}
            onChange={(evento) => {
              definirCidade(evento.target.value);
              definirCidadeSelecionada(false);
            }}
            onFocus={() => {
              if (sugestoes.length > 0) {
                definirMostrarSugestoes(true);
              }
            }}
            placeholder="Pesquisar cidade..."
            aria-label="Pesquisar cidade"
            autoComplete="off"
          />
        </label>

        <button
          className="botao-localizacao"
          type="button"
          onClick={usarMinhaLocalizacao}
          disabled={carregando}
          title="Usar minha localização"
        >
          <MapPin size={20} />
        </button>
      </form>

      {mostrarSugestoes && sugestoes.length > 0 && (
        <div className="lista-sugestoes">
          {sugestoes.map((sugestao) => (
            <button
              key={sugestao.id}
              type="button"
              className="item-sugestao"
              onClick={() =>
                selecionarCidade(sugestao)
              }
            >
              <span className="icone-sugestao">
                🌎
              </span>

              <strong>{sugestao.nome}</strong>

              <span className="local-sugestao">
                {[
                  sugestao.estado,
                  sugestao.pais,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}