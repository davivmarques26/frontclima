import type { CidadeMapa, DadosClima, Localizacao } from "../types/clima";

export async function buscarCidade(nomeCidade: string): Promise<Localizacao> {
  const endereco = new URL("https://geocoding-api.open-meteo.com/v1/search");

  endereco.searchParams.set("name", nomeCidade);
  endereco.searchParams.set("count", "1");
  endereco.searchParams.set("language", "pt");
  endereco.searchParams.set("format", "json");

  const resposta = await fetch(endereco);

  if (!resposta.ok) {
    throw new Error("Não foi possível pesquisar a cidade.");
  }

  const dados = await resposta.json();

  if (!dados.results?.length) {
    throw new Error("Cidade não encontrada. Verifique o nome e tente novamente.");
  }

  const local = dados.results[0];

  return {
    nome: local.name,
    pais: local.country ?? "",
    estado: local.admin1,
    latitude: local.latitude,
    longitude: local.longitude,
    fusoHorario: local.timezone,
  };
}

export async function buscarClima(localizacao: Localizacao): Promise<DadosClima> {
  const endereco = new URL("https://api.open-meteo.com/v1/forecast");

  endereco.searchParams.set("latitude", String(localizacao.latitude));
  endereco.searchParams.set("longitude", String(localizacao.longitude));
  endereco.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m"
  );
  endereco.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min"
  );
  endereco.searchParams.set("timezone", "auto");
  endereco.searchParams.set("forecast_days", "7");

  const resposta = await fetch(endereco);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar a previsão do tempo.");
  }

  const dados = await resposta.json();

  return {
    localizacao,
    atual: {
      temperatura: dados.current.temperature_2m,
      sensacaoTermica: dados.current.apparent_temperature,
      umidade: dados.current.relative_humidity_2m,
      velocidadeVento: dados.current.wind_speed_10m,
      precipitacao: dados.current.precipitation,
      codigoClima: dados.current.weather_code,
      horario: dados.current.time,
    },
    diario: dados.daily.time.map((data: string, indice: number) => ({
      data,
      maxima: dados.daily.temperature_2m_max[indice],
      minima: dados.daily.temperature_2m_min[indice],
      codigoClima: dados.daily.weather_code[indice],
    })),
  };
}

export async function buscarClimaPorCoordenadas(
  latitude: number,
  longitude: number
) {
  const localizacao: Localizacao = {
    nome: "Minha localização",
    pais: "",
    latitude,
    longitude,
  };

  return buscarClima(localizacao);
}

export async function buscarDadosMapa(
  cidades: CidadeMapa[]
): Promise<CidadeMapa[]> {
  const resultados = await Promise.all(
    cidades.map(async (cidade) => {
      try {
        const endereco = new URL("https://api.open-meteo.com/v1/forecast");

        endereco.searchParams.set("latitude", String(cidade.latitude));
        endereco.searchParams.set("longitude", String(cidade.longitude));
        endereco.searchParams.set(
          "current",
          "temperature_2m,wind_speed_10m"
        );
        endereco.searchParams.set("timezone", "auto");

        const resposta = await fetch(endereco);

        if (!resposta.ok) {
          return cidade;
        }

        const dados = await resposta.json();

        return {
          ...cidade,
          temperatura: dados.current.temperature_2m,
          vento: dados.current.wind_speed_10m,
        };
      } catch {
        return cidade;
      }
    })
  );

  return resultados;
}
