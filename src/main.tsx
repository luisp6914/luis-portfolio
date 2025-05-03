import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { HashRouter } from "react-router-dom";
import "./styles/homepage.css"
import "./styles/covid-project.css"
import "./styles/digiKey-project.css"
import "./styles/partPicker-project.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);