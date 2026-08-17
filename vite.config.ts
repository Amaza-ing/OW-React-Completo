import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  if (
    mode === "production" &&
    (env.VITE_GRAPHQL_API_URL === undefined ||
      env.VITE_GRAPHQL_API_URL.trim() === "")
  ) {
    throw new Error(
      "Falta configurar VITE_GRAPHQL_API_URL para el build de producción.",
    );
  }

  return {
    plugins: [
      react(),

      babel({
        presets: [reactCompilerPreset()],
      }),
    ],

    resolve: {
      tsconfigPaths: true,
    },

    build: {
      license: true,

      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "react-vendor",
                test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
              },
              {
                name: "query-vendor",
                test: /node_modules[\\/]@tanstack[\\/](?:react-query|query-core)[\\/]/,
              },
            ],
          },
        },
      },
    },
  };
});
