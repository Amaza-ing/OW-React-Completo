type RouteLoadingStrategy = "initial" | "on-demand";

type RouteCodeSplittingDecision = {
  path: string;
  module: string;
  strategy: RouteLoadingStrategy;
  reason: string;
};

export const routeCodeSplittingPlan = [
  {
    path: "/",
    module: "DashboardPage",
    strategy: "initial",
    reason:
      "Es la vista de entrada y debe poder mostrarse desde la primera carga.",
  },
  {
    path: "/projects",
    module: "ProjectsPage",
    strategy: "on-demand",
    reason: "Solo se necesita cuando el usuario abre la gestión de proyectos.",
  },
  {
    path: "/projects/:projectId",
    module: "ProjectDetailPage",
    strategy: "on-demand",
    reason:
      "El detalle solo se necesita después de abrir un proyecto concreto.",
  },
  {
    path: "/tasks",
    module: "TasksPage",
    strategy: "on-demand",
    reason: "La gestión de tareas es una sección independiente del Dashboard.",
  },
  {
    path: "*",
    module: "NotFoundPage",
    strategy: "on-demand",
    reason:
      "La página 404 solo se necesita cuando la URL no coincide con otra ruta.",
  },
] as const satisfies readonly RouteCodeSplittingDecision[];
