export interface Localizacao {
  nome: string;
  pais: string;
  estado?: string;
  latitude: number;
  longitude: number;
  fusoHorario?: string;
}

export interface PrevisaoDia {
  data: string;
  maxima: number;
  minima: number;
  codigoClima: number;
}

export interface DadosClima {
  localizacao: Localizacao;
  atual: {
    temperatura: number;
    sensacaoTermica: number;
    umidade: number;
    velocidadeVento: number;
    precipitacao: number;
    codigoClima: number;
    horario: string;
  };
  diario: PrevisaoDia[];
}

export interface CidadeMapa {
  nome: string;
  latitude: number;
  longitude: number;
  temperatura?: number;
  vento?: number;
}
