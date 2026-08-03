// npm install --save-dev vite-plugin-pwa

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App";
import "./index.css";
import { registerServiceWorker } from "./pwa/registerServiceWorker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

window.addEventListener("load", () => {
  void registerServiceWorker();
});
