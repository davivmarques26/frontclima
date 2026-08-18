export function obterDescricaoClima(codigo: number) {
  if (codigo === 0) return "Céu limpo";
  if ([1, 2].includes(codigo)) return "Parcialmente nublado";
  if (codigo === 3) return "Nublado";
  if ([45, 48].includes(codigo)) return "Neblina";
  if ([51, 53, 55, 56, 57].includes(codigo)) return "Garoa";
  if ([61, 63, 65, 66, 67].includes(codigo)) return "Chuva";
  if ([71, 73, 75, 77].includes(codigo)) return "Neve";
  if ([80, 81, 82].includes(codigo)) return "Pancadas de chuva";
  if ([85, 86].includes(codigo)) return "Pancadas de neve";
  if ([95, 96, 99].includes(codigo)) return "Trovoadas";

  return "Condição variável";
}

export function obterEmojiClima(codigo: number) {
  if (codigo === 0) return "☀️";
  if ([1, 2].includes(codigo)) return "🌤️";
  if (codigo === 3) return "☁️";
  if ([45, 48].includes(codigo)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(codigo)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(codigo)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(codigo)) return "🌨️";
  if ([95, 96, 99].includes(codigo)) return "⛈️";

  return "🌥️";
}

export function obterDiaCurto(data: string, indice: number) {
  if (indice === 0) return "Hoje";

  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
  })
    .format(new Date(`${data}T12:00:00`))
    .replace(".", "");
}
