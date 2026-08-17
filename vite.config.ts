import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
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
});
