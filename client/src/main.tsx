import { createRoot } from "react-dom/client";
import App from "./App";
import { Router } from "wouter";          // ⬅️ lisää tämä

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Router base="/Bannerit">              {/* ⬅️ kääre */}
    <App />
  </Router>
);
