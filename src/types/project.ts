export const projectStatusOptions = [
  {
    value: "planning",
    label: "Planificación",
  },
  {
    value: "active",
    label: "Activo",
  },
  {
    value: "completed",
    label: "Completado",
  },
] as const satisfies readonly {
  value: string;
  label: string;
}[];

export type ProjectStatus = (typeof projectStatusOptions)[number]["value"];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  members: number;
}
