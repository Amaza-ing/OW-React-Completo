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
] as const satisfies readonly {
  id: string;
  label: string;
}[];

export type NavigationItem = (typeof navigationItems)[number];
export type ViewName = NavigationItem["id"];

export type NavigateHandler = (view: ViewName) => void;
