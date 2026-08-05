// npm install --save-dev vite-plugin-pwa
// npm install --save-dev workbox-window
// npm install firebase
// npm install @tanstack/react-query-persist-client
// npm install @tanstack/query-sync-storage-persister

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
