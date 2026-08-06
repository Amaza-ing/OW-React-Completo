import type { ArchitectureOptionId } from "./architectureOptions";

export const audienceOptions = [
  {
    value: "private",
    label: "Espacio privado o autenticado",
  },
  {
    value: "public",
    label: "Contenido público y descubrible",
  },
] as const;

export const initialHtmlOptions = [
  {
    value: "optional",
    label: "Puede esperar al navegador",
  },
  {
    value: "important",
    label: "Debe llegar con la primera respuesta",
  },
] as const;

export const backendOptions = [
  {
    value: "separate",
    label: "API o servicios separados",
  },
  {
    value: "integrated",
    label: "Backend unido a las rutas",
  },
] as const;

export const migrationOptions = [
  {
    value: "minimal",
    label: "Conservar al máximo la aplicación actual",
  },
  {
    value: "framework",
    label: "Aceptar convenciones nuevas de framework",
  },
] as const;

export type Audience = (typeof audienceOptions)[number]["value"];
export type InitialHtmlNeed = (typeof initialHtmlOptions)[number]["value"];
export type BackendShape = (typeof backendOptions)[number]["value"];
export type MigrationPreference = (typeof migrationOptions)[number]["value"];

export interface ArchitectureAnswers {
  audience: Audience;
  initialHtml: InitialHtmlNeed;
  backend: BackendShape;
  migration: MigrationPreference;
}

export interface ArchitectureRecommendation {
  optionId: ArchitectureOptionId;
  title: string;
  explanation: string;
  reasons: string[];
}

export function recommendArchitecture(
  answers: ArchitectureAnswers,
): ArchitectureRecommendation {
  const isPrivateSpa =
    answers.audience === "private" &&
    answers.initialHtml === "optional" &&
    answers.backend === "separate";

  if (isPrivateSpa) {
    return {
      optionId: "vite-react",
      title: "Mantener React con Vite",
      explanation:
        "El producto encaja en una SPA y ya dispone de datos, PWA y navegación resueltos.",
      reasons: [
        "La mayor parte del contenido aparece después de autenticar al usuario.",
        "No es imprescindible generar HTML específico en cada petición.",
        "La API puede seguir desplegada de forma independiente.",
      ],
    };
  }

  if (answers.migration === "minimal") {
    return {
      optionId: "react-router-framework",
      title: "Evaluar React Router Framework Mode",
      explanation:
        "Añade capacidades de framework manteniendo continuidad con el router actual.",
      reasons: [
        "Se desea introducir HTML previo con una migración gradual.",
        "La aplicación ya está organizada alrededor de React Router.",
        "Las rutas pueden moverse por partes hacia módulos, loaders y actions.",
      ],
    };
  }

  if (answers.audience === "public" || answers.backend === "integrated") {
    return {
      optionId: "next-app-router",
      title: "Evaluar Next.js con App Router",
      explanation:
        "El producto necesita un framework híbrido con trabajo de servidor integrado.",
      reasons: [
        "El HTML inicial tiene peso en descubrimiento o primera visita.",
        "El equipo acepta convenciones nuevas para rutas, metadata y datos.",
        "Un backend unido al árbol de la aplicación puede simplificar algunos flujos.",
      ],
    };
  }

  return {
    optionId: "react-router-framework",
    title: "Evaluar React Router Framework Mode",
    explanation:
      "Es un punto intermedio entre la SPA explícita y un framework con más convenciones.",
    reasons: [
      "Se necesita renderizado previo en algunas rutas.",
      "No todas las partes requieren el mismo tratamiento.",
      "La migración puede conservar componentes existentes.",
    ],
  };
}
