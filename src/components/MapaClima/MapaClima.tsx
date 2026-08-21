import { useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
} from "react-leaflet";

import type {
  CidadeMapa,
  Localizacao,
} from "../../types/clima";

import { buscarDadosMapa } from "../../services/apiClima";
import { usarClima } from "../../context/ContextoClima";

import "./MapaClima.css";

const cidadesBrasil: CidadeMapa[] = [
  {
    nome: "Aracaju",
    latitude: -10.9091,
    longitude: -37.0677,
  },
  {
    nome: "Belém",
    latitude: -1.4554,
    longitude: -48.4898,
  },
  {
    nome: "Belo Horizonte",
    latitude: -19.9102,
    longitude: -43.9266,
  },
  {
    nome: "Boa Vista",
    latitude: 2.8238,
    longitude: -60.6753,
  },
  {
    nome: "Brasília",
    latitude: -15.7795,
    longitude: -47.9297,
  },
  {
    nome: "Campo Grande",
    latitude: -20.4486,
    longitude: -54.6295,
  },
  {
    nome: "Cuiabá",
    latitude: -15.601,
    longitude: -56.0974,
  },
  {
    nome: "Curitiba",
    latitude: -25.4195,
    longitude: -49.2646,
  },
  {
    nome: "Florianópolis",
    latitude: -27.5945,
    longitude: -48.5477,
  },
  {
    nome: "Fortaleza",
    latitude: -3.7166,
    longitude: -38.5423,
  },
  {
    nome: "Goiânia",
    latitude: -16.6864,
    longitude: -49.2643,
  },
  {
    nome: "João Pessoa",
    latitude: -7.1151,
    longitude: -34.8641,
  },
  {
    nome: "Macapá",
    latitude: 0.0349,
    longitude: -51.0694,
  },
  {
    nome: "Maceió",
    latitude: -9.666,
    longitude: -35.735,
  },
  {
    nome: "Manaus",
    latitude: -3.1187,
    longitude: -60.0212,
  },
  {
    nome: "Natal",
    latitude: -5.7936,
    longitude: -35.1986,
  },
  {
    nome: "Palmas",
    latitude: -10.24,
    longitude: -48.3558,
  },
  {
    nome: "Porto Alegre",
    latitude: -30.0318,
    longitude: -51.2065,
  },
  {
    nome: "Porto Velho",
    latitude: -8.7608,
    longitude: -63.8999,
  },
  {
    nome: "Recife",
    latitude: -8.0467,
    longitude: -34.8771,
  },
  {
    nome: "Rio Branco",
    latitude: -9.975,
    longitude: -67.8243,
  },
  {
    nome: "Rio de Janeiro",
    latitude: -22.9129,
    longitude: -43.2003,
  },
  {
    nome: "Salvador",
    latitude: -12.9718,
    longitude: -38.5011,
  },
  {
    nome: "São Luís",
    latitude: -2.5387,
    longitude: -44.2825,
  },
  {
    nome: "São Paulo",
    latitude: -23.5329,
    longitude: -46.6395,
  },
  {
    nome: "Teresina",
    latitude: -5.0919,
    longitude: -42.8034,
  },
  {
    nome: "Vitória",
    latitude: -20.3155,
    longitude: -40.3128,
  },
];

function obterCorTemperatura(temperatura = 24) {
  if (temperatura <= 10) return "#4a9cff";
  if (temperatura <= 16) return "#11aec5";
  if (temperatura <= 22) return "#2cbc63";
  if (temperatura <= 27) return "#f4cf27";
  if (temperatura <= 32) return "#ff8216";

  return "#ff4d4f";
}

interface MapaClimaProps {
  aoSelecionarCidade?: () => void;
}

export default function MapaClima({
  aoSelecionarCidade,
}: MapaClimaProps) {
  const [cidades, definirCidades] =
    useState<CidadeMapa[]>(cidadesBrasil);

  const [modoMapa, definirModoMapa] =
    useState<"temperatura" | "vento">("temperatura");

  const { pesquisarClimaPorLocalizacao } = usarClima();

  useEffect(() => {
    let componenteAtivo = true;

    buscarDadosMapa(cidadesBrasil).then((dados) => {
      if (componenteAtivo) {
        definirCidades(dados);
      }
    });

    return () => {
      componenteAtivo = false;
    };
  }, []);

  async function selecionarCidadeMapa(
    cidade: CidadeMapa
  ) {
    const localizacao: Localizacao = {
      nome: cidade.nome,
      pais: "Brasil",
      latitude: cidade.latitude,
      longitude: cidade.longitude,
    };

    /*
      Primeiro troca a visualização para a tela
      de detalhes.
    */
    aoSelecionarCidade?.();

    /*
      Depois busca a previsão completa da cidade.
    */
    await pesquisarClimaPorLocalizacao(localizacao);
  }

  const resumo = useMemo(() => {
    const cidadesValidas = cidades.filter(
      (cidade) => cidade.temperatura !== undefined
    );

    if (!cidadesValidas.length) {
      return null;
    }

    const media =
      cidadesValidas.reduce(
        (soma, cidade) =>
          soma + (cidade.temperatura ?? 0),
        0
      ) / cidadesValidas.length;

    const maisQuente = cidadesValidas.reduce(
      (cidadeA, cidadeB) =>
        cidadeA.temperatura! > cidadeB.temperatura!
          ? cidadeA
          : cidadeB
    );

    const maisFria = cidadesValidas.reduce(
      (cidadeA, cidadeB) =>
        cidadeA.temperatura! < cidadeB.temperatura!
          ? cidadeA
          : cidadeB
    );

    return {
      media,
      maisQuente,
      maisFria,
    };
  }, [cidades]);

  return (
    <section className="painel painel-mapa">
      <div className="topo-mapa">
        <div>
          <span className="subtitulo-mapa">
            VISÃO GERAL
          </span>

          <h2>
            Brasil — Condições Atuais das Capitais
          </h2>
        </div>

        <div className="alternador-mapa">
          <button
            type="button"
            className={
              modoMapa === "temperatura"
                ? "ativo"
                : ""
            }
            onClick={() =>
              definirModoMapa("temperatura")
            }
          >
            🌡️ Temperatura
          </button>

          <button
            type="button"
            className={
              modoMapa === "vento" ? "ativo" : ""
            }
            onClick={() =>
              definirModoMapa("vento")
            }
          >
            💨 Vento
          </button>
        </div>
      </div>

      <div className="resumo-mapa">
        <div>
          <span>MÉDIA DAS CAPITAIS</span>

          <strong>
            {resumo
              ? `${Math.round(resumo.media)}°C`
              : "--"}
          </strong>
        </div>

        <div>
          <span>MAIS QUENTE</span>

          <strong className="mais-quente">
            {resumo
              ? `${Math.round(
                  resumo.maisQuente.temperatura!
                )}°C`
              : "--"}
          </strong>

          <small>
            {resumo?.maisQuente.nome}
          </small>
        </div>

        <div>
          <span>MAIS FRIA</span>

          <strong className="mais-fria">
            {resumo
              ? `${Math.round(
                  resumo.maisFria.temperatura!
                )}°C`
              : "--"}
          </strong>

          <small>
            {resumo?.maisFria.nome}
          </small>
        </div>
      </div>

      <div className="caixa-mapa">
        <MapContainer
          center={[-14.8, -52.5]}
          zoom={4}
          minZoom={3}
          scrollWheelZoom
          className="mapa-leaflet"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {cidades.map((cidade) => (
            <CircleMarker
              key={cidade.nome}
              center={[
                cidade.latitude,
                cidade.longitude,
              ]}
              radius={15}
              eventHandlers={{
                click: () =>
                  selecionarCidadeMapa(cidade),
                
              }}
              pathOptions={{
                color:
                  modoMapa === "temperatura"
                    ? obterCorTemperatura(
                        cidade.temperatura
                      )
                    : "#5aa6ff",

                fillColor:
                  modoMapa === "temperatura"
                    ? obterCorTemperatura(
                        cidade.temperatura
                      )
                    : "#5aa6ff",

                fillOpacity: 0.92,
                weight: 1,
              }}
            >
              <Tooltip
                permanent
                direction="center"
                className="marcador-clima"
              >
                {modoMapa === "temperatura"
                  ? cidade.temperatura !== undefined
                    ? `${Math.round(
                        cidade.temperatura
                      )}°`
                    : "..."
                  : cidade.vento !== undefined
                    ? `${Math.round(cidade.vento)}`
                    : "..."}
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>

        {modoMapa === "temperatura" && (
          <div className="legenda-mapa">
            <span>TEMPERATURA</span>

            <div>
              <i
                style={{
                  background: "#4a9cff",
                }}
              />
              ≤10°C
            </div>

            <div>
              <i
                style={{
                  background: "#11aec5",
                }}
              />
              16°C
            </div>

            <div>
              <i
                style={{
                  background: "#2cbc63",
                }}
              />
              22°C
            </div>

            <div>
              <i
                style={{
                  background: "#f4cf27",
                }}
              />
              27°C
            </div>

            <div>
              <i
                style={{
                  background: "#ff8216",
                }}
              />
              32°C
            </div>

            <div>
              <i
                style={{
                  background: "#ff4d4f",
                }}
              />
              &gt;32°C
            </div>
          </div>
        )}
      </div>

      <div className="credito-dados">
        Dados: Open-Meteo
      </div>
    </section>
  );
}