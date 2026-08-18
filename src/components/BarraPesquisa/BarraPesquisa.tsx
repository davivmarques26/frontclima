import { useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";
import { usarClima } from "../../context/ContextoClima";
import "./BarraPesquisa.css";

export default function BarraPesquisa() {
  const [cidade, definirCidade] = useState("");
  const {
    pesquisarClima,
    usarMinhaLocalizacao,
    carregando,
  } = usarClima();

  async function enviarPesquisa(evento: FormEvent) {
    evento.preventDefault();
    await pesquisarClima(cidade);
  }

  return (
    <form className="linha-pesquisa" onSubmit={enviarPesquisa}>
      <label className="campo-pesquisa">
        <Search size={18} />

        <input
          value={cidade}
          onChange={(evento) => definirCidade(evento.target.value)}
          placeholder="Pesquisar cidade..."
          aria-label="Pesquisar cidade"
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
  );
}
