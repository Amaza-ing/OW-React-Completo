export const projectStatusValues = ["PLANNING", "ACTIVE", "COMPLETED"] as const;

export type ProjectStatus = (typeof projectStatusValues)[number];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  members: number;
}

export const projectStatusLabels = {
  PLANNING: "Planificación",
  ACTIVE: "Activo",
  COMPLETED: "Completado",
} satisfies Record<ProjectStatus, string>;
