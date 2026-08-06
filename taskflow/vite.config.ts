import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa/dist/index.cjs";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: null,
      manifest: {
        id: "/",
        name: "TaskFlow",
        short_name: "TaskFlow",
        description:
          "Gestión de proyectos y tareas desde una interfaz progresiva.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#f8fafc",
        theme_color: "#0f172a",
        categories: ["productivity"],
        icons: [
          {
            src: "/icons/taskflow-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/taskflow-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/taskflow-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          {
            name: "Ver proyectos",
            short_name: "Proyectos",
            description: "Abrir el listado de proyectos de TaskFlow.",
            url: "/projects",
          },
          {
            name: "Ver tareas",
            short_name: "Tareas",
            description: "Abrir la gestión de tareas de TaskFlow.",
            url: "/tasks",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.pathname === "/graphql" &&
              url.searchParams.get("taskflow-sync") === "1",
            handler: "NetworkOnly",
            method: "POST",
            options: {
              backgroundSync: {
                name: "taskflow-project-members",
                options: {
                  maxRetentionTime: 24 * 60,
                },
              },
            },
          },
        ],
      },
    }),
  ],
});
