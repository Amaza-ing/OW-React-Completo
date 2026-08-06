export const renderingStrategyIds = ["csr", "ssr", "ssg"] as const;

export type RenderingStrategyId = (typeof renderingStrategyIds)[number];

export interface RenderingStrategy {
  id: RenderingStrategyId;
  name: string;
  generatedAt: string;
  suitableFor: string;
  description: string;
}

export const renderingStrategies = [
  {
    id: "csr",
    name: "CSR",
    generatedAt: "La interfaz principal se completa en el navegador.",
    suitableFor: "Herramientas privadas y muy interactivas.",
    description: "Es el enfoque principal de TaskFlow con Vite.",
  },
  {
    id: "ssr",
    name: "SSR",
    generatedAt: "El servidor genera HTML para cada petición.",
    suitableFor: "Contenido actualizado y visible desde la respuesta inicial.",
    description: "Combina datos del servidor con hidratación selectiva.",
  },
  {
    id: "ssg",
    name: "SSG",
    generatedAt: "El HTML se prepara durante la compilación.",
    suitableFor: "Contenido estable que cambia con poca frecuencia.",
    description: "Reduce el trabajo necesario durante cada petición.",
  },
] satisfies RenderingStrategy[];
