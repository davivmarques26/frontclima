import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DadosClima, SugestaoCidade, } from "../types/clima";
import {
  buscarCidade,
  buscarClima,
  buscarClimaPorCoordenadas,
} from "../services/apiClima";

interface ValorContextoClima {
  clima: DadosClima | null;
  carregando: boolean;
  erro: string | null;
  tema: "escuro" | "claro";
  pesquisarClima: (cidade: string) => Promise<void>;
  pesquisarClimaPorSugestao: (
    sugestao: SugestaoCidade
  ) => Promise<void>;
  usarMinhaLocalizacao: () => void;
  alternarTema: () => void;
}

const ContextoClima = createContext<ValorContextoClima | undefined>(undefined);

export function ProvedorClima({ children }: { children: ReactNode }) {
  const [clima, definirClima] = useState<DadosClima | null>(null);
  const [carregando, definirCarregando] = useState(false);
  const [erro, definirErro] = useState<string | null>(null);
  const [tema, definirTema] = useState<"escuro" | "claro">("escuro");
  const pesquisarClimaPorSugestao = useCallback(
    async (sugestao: SugestaoCidade) => {
      try {
        definirCarregando(true);
        definirErro(null);

        const localizacao = {
          nome: sugestao.nome,
          estado: sugestao.estado,
          pais: sugestao.pais ?? "",
          latitude: sugestao.latitude,
          longitude: sugestao.longitude,
        };

        const dadosClima = await buscarClima(localizacao);

        definirClima(dadosClima);
      } catch (erroCapturado) {
        definirClima(null);

        definirErro(
          erroCapturado instanceof Error
            ? erroCapturado.message
            : "Ocorreu um erro inesperado."
        );
      } finally {
        definirCarregando(false);
      }
    },
    []
  );
  const pesquisarClima = useCallback(async (cidade: string) => {
    const cidadeTratada = cidade.trim();

    if (!cidadeTratada) {
      definirErro("Digite o nome de uma cidade.");
      return;
    }

    try {
      definirCarregando(true);
      definirErro(null);

      const localizacao = await buscarCidade(cidadeTratada);
      const dadosClima = await buscarClima(localizacao);

      definirClima(dadosClima);
    } catch (erroCapturado) {
      definirClima(null);

      definirErro(
        erroCapturado instanceof Error
          ? erroCapturado.message
          : "Ocorreu um erro inesperado."
      );
    } finally {
      definirCarregando(false);
    }
  }, []);

  const usarMinhaLocalizacao = useCallback(() => {
    if (!navigator.geolocation) {
      definirErro("Seu navegador não oferece suporte à geolocalização.");
      return;
    }

    definirCarregando(true);
    definirErro(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const dadosClima = await buscarClimaPorCoordenadas(
            coords.latitude,
            coords.longitude
          );

          definirClima(dadosClima);
        } catch (erroCapturado) {
          definirErro(
            erroCapturado instanceof Error
              ? erroCapturado.message
              : "Erro ao carregar sua localização."
          );
        } finally {
          definirCarregando(false);
        }
      },
      () => {
        definirCarregando(false);
        definirErro(
          "Não foi possível acessar sua localização. Verifique a permissão do navegador."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }, []);

  const alternarTema = useCallback(() => {
    definirTema((temaAtual) =>
      temaAtual === "escuro" ? "claro" : "escuro"
    );
  }, []);

  const valorContexto = useMemo(
    () => ({
      clima,
      carregando,
      erro,
      tema,
      pesquisarClima,
      pesquisarClimaPorSugestao,
      usarMinhaLocalizacao,
      alternarTema,
    }),
    [
      clima,
      carregando,
      erro,
      tema,
      pesquisarClima,
      usarMinhaLocalizacao,
      alternarTema,
    ]
  );

  return (
    <ContextoClima.Provider value={valorContexto}>
      <div data-tema={tema}>{children}</div>
    </ContextoClima.Provider>
  );
}

export function usarClima() {
  const contexto = useContext(ContextoClima);

  if (!contexto) {
    throw new Error("usarClima deve ser usado dentro de ProvedorClima.");
  }

  return contexto;
}
