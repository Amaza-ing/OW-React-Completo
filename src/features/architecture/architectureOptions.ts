export const architectureOptionIds = [
  "vite-react",
  "next-app-router",
  "react-router-framework",
] as const;

export type ArchitectureOptionId = (typeof architectureOptionIds)[number];

export interface ArchitectureOption {
  id: ArchitectureOptionId;
  name: string;
  startingPoint: string;
  rendering: string[];
  dataFlow: string;
  deployment: string;
  strengths: string[];
  tradeoffs: string[];
}

export const architectureOptions: ArchitectureOption[] = [
  {
    id: "vite-react",
    name: "React con Vite",
    startingPoint:
      "Aplicación React con control explícito del router, los datos y el build.",
    rendering: [
      "CSR como enfoque habitual",
      "SSR posible mediante una integración propia o una herramienta adicional",
    ],
    dataFlow:
      "El equipo elige APIs, caché y estado. TaskFlow usa TanStack Query y GraphQL.",
    deployment:
      "Archivos estáticos para el frontend y servicios separados para las APIs.",
    strengths: [
      "Pocas convenciones obligatorias",
      "Buen encaje para SPA y PWA",
      "Migración mínima desde TaskFlow",
    ],
    tradeoffs: [
      "El equipo diseña la arquitectura de servidor si la necesita",
      "No incorpora por sí solo loaders de ruta ni revalidación de páginas",
    ],
  },
  {
    id: "next-app-router",
    name: "Next.js con App Router",
    startingPoint:
      "Framework full-stack con rutas por archivos y componentes de servidor y cliente.",
    rendering: [
      "Renderizado estático y dinámico",
      "Streaming y revalidación",
      "Trabajo de servidor y cliente dentro del mismo árbol",
    ],
    dataFlow:
      "Puede obtener datos en componentes de servidor y reservar el cliente para la interacción.",
    deployment:
      "Salida estática cuando es posible o runtime de servidor para rutas dinámicas.",
    strengths: [
      "Convenciones integradas para renderizado, metadata y datos",
      "Buen encaje para productos públicos con necesidades híbridas",
      "Permite reducir JavaScript cliente en partes del árbol",
    ],
    tradeoffs: [
      "Introduce un modelo mental y una estructura nuevos",
      "Los límites servidor-cliente y la caché requieren decisiones explícitas",
    ],
  },
  {
    id: "react-router-framework",
    name: "React Router Framework Mode",
    startingPoint:
      "Framework de rutas basado en módulos de ruta y herramientas integradas con Vite.",
    rendering: ["SPA", "SSR", "Prerenderizado de rutas"],
    dataFlow:
      "Loaders, actions y estados de navegación asociados a los módulos de ruta.",
    deployment:
      "Runtime de servidor, salida prerenderizada o una aplicación en modo SPA.",
    strengths: [
      "Continuidad conceptual con React Router",
      "Rutas tipadas y code splitting integrado",
      "Adopción gradual de capacidades de framework",
    ],
    tradeoffs: [
      "TaskFlow utiliza actualmente el modo declarativo",
      "Mover datos a loaders y actions cambia responsabilidades existentes",
    ],
  },
];
