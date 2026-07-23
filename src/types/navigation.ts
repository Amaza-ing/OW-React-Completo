export const navigationItems = [
  {
    id: "dashboard",
    label: "Resumen",
  },
  {
    id: "projects",
    label: "Proyectos",
  },
  {
    id: "tasks",
    label: "Tareas",
  },
] as const;

export type NavigationItem = (typeof navigationItems)[number];

export type ViewName = NavigationItem["id"];

export type NavigateHandler = (view: ViewName) => void;
