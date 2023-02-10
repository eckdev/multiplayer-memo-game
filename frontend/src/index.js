import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NavBar } from "./contents/navbar";
import { GameProvider } from "./contexts/GameProvider";
import { PlayerProvider } from "./contexts/PlayerProvider";
import { ErrorProvider } from "./contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameProvider>
      <PlayerProvider>
        <ErrorProvider>
          <NavBar />
          <App />
        </ErrorProvider>
      </PlayerProvider>
    </GameProvider>
  </React.StrictMode>
);
