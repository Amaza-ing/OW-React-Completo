export const appEnv = {
  mode: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

export function getGraphQLApiUrl(): string {
  const endpoint = import.meta.env.VITE_GRAPHQL_API_URL;

  if (typeof endpoint !== "string" || endpoint.trim() === "") {
    throw new Error("Falta configurar VITE_GRAPHQL_API_URL.");
  }

  return endpoint;
}
