import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usarClima } from "../../context/ContextoClima";
import { obterDiaCurto } from "../../utils/clima";
import "./GraficoTemperatura.css";

export default function GraficoTemperatura() {
  const { clima } = usarClima();

  const dadosGrafico = useMemo(() => {
    if (!clima) return [];

    return clima.diario.map((dia, indice) => ({
      dia: obterDiaCurto(dia.data, indice),
      maxima: Math.round(dia.maxima),
      minima: Math.round(dia.minima),
    }));
  }, [clima]);

  if (!clima) return null;

  return (
    <section className="painel painel-grafico">
      <h2>TEMPERATURA — 7 DIAS</h2>

      <div className="area-grafico">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dadosGrafico}
            margin={{
              top: 12,
              right: 8,
              left: -18,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="dia"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 40]}
              ticks={[0, 8, 16, 24, 32, 40]}
              tickLine={false}
              axisLine={false}
              unit="°"
            />

            <Tooltip
              formatter={(valor, nome) => [
                `${valor}°C`,
                nome === "maxima" ? "Máxima" : "Mínima",
              ]}
              labelFormatter={(rotulo) => `Dia: ${rotulo}`}
            />

            <Legend
              formatter={(valor) =>
                valor === "maxima" ? "Máxima" : "Mínima"
              }
            />

            <Line
              type="monotone"
              dataKey="maxima"
              stroke="#ff6b00"
              strokeWidth={2}
              dot={{ r: 3, fill: "#ff6b00" }}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="minima"
              stroke="#55a2ff"
              strokeWidth={2}
              dot={{ r: 3, fill: "#55a2ff" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
