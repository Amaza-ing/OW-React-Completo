export const projectStatusValues = ["PLANNING", "ACTIVE", "COMPLETED"] as const;

export type ProjectStatus = (typeof projectStatusValues)[number];

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  members: number;
}

export interface AddProjectMemberInput {
  projectId: string;
  name: string;
  role: string;
}

export const projectStatusLabels = {
  PLANNING: "Planificación",
  ACTIVE: "Activo",
  COMPLETED: "Completado",
} satisfies Record<ProjectStatus, string>;
