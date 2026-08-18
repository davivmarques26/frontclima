import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./styles/global.css";
import App from "./App";
import { ProvedorClima } from "./context/ContextoClima";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProvedorClima>
      <App />
    </ProvedorClima>
  </React.StrictMode>
);
