export const migrationReadinessValues = [
  "ready",
  "adapt",
  "keep-client",
] as const;

export type MigrationReadiness = (typeof migrationReadinessValues)[number];

export interface MigrationSlice {
  id: string;
  name: string;
  currentRoute: string;
  readiness: MigrationReadiness;
  firstTarget: string;
  reasons: string[];
  dependenciesToReview: string[];
}

export const taskFlowMigrationPlan: MigrationSlice[] = [
  {
    id: "architecture",
    name: "Laboratorio de arquitectura",
    currentRoute: "/architecture",
    readiness: "ready",
    firstTarget: "Página estática o prerenderizada",
    reasons: [
      "El contenido procede de datos locales y tipados.",
      "No depende de autenticación ni de APIs remotas.",
      "Sus componentes son principalmente presentacionales.",
    ],
    dependenciesToReview: [
      "Metadata de la ruta",
      "Estilos globales compartidos",
    ],
  },
  {
    id: "projects",
    name: "Proyectos y detalle",
    currentRoute: "/projects",
    readiness: "adapt",
    firstTarget: "Listado prerenderizado y detalle dinámico",
    reasons: [
      "Puede beneficiarse de HTML público si el producto lo requiere.",
      "La consulta y la mutación tienen contratos separados.",
      "Los componentes de proyecto viven dentro de su feature.",
    ],
    dependenciesToReview: [
      "TanStack Query y su hidratación",
      "Endpoint GraphQL",
      "Actualización optimista",
      "Boundary de Suspense",
    ],
  },
  {
    id: "tasks",
    name: "Gestión de tareas",
    currentRoute: "/tasks",
    readiness: "keep-client",
    firstTarget: "Mantener como experiencia cliente en la primera migración",
    reasons: [
      "Es una pantalla privada y altamente interactiva.",
      "El estado se conserva mediante Context y localStorage.",
      "Se integra con recordatorios, badge y capacidades PWA.",
    ],
    dependenciesToReview: [
      "TasksProvider",
      "localStorage",
      "Notificaciones",
      "Badging API",
    ],
  },
];
