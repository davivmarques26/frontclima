# Previsão do Tempo - React + TypeScript

Versão reorganizada do projeto com:

- variáveis e funções em português;
- um arquivo CSS para cada componente;
- CSS global apenas para estilos compartilhados;
- Context API;
- useMemo;
- useCallback;
- Open-Meteo;
- Recharts;
- React Leaflet;
- geolocalização;
- layout responsivo.

## Como rodar

```bash
npm install
npm run dev
```

Depois abra a URL mostrada pelo Vite, normalmente:

```text
http://localhost:5173
```

## Organização dos estilos

Cada componente possui seu próprio CSS:

- `Cabecalho/Cabecalho.css`
- `BarraPesquisa/BarraPesquisa.css`
- `ClimaAtual/ClimaAtual.css`
- `EstatisticasClima/EstatisticasClima.css`
- `GraficoTemperatura/GraficoTemperatura.css`
- `PrevisaoDiaria/PrevisaoDiaria.css`
- `MapaClima/MapaClima.css`
- `EstadoVazio/EstadoVazio.css`

O arquivo `styles/global.css` contém apenas estilos realmente globais, como:

- reset básico;
- tipografia;
- variáveis de cores;
- temas claro e escuro;
- classe compartilhada `.painel`.
