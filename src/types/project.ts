export const projectStatuses = ["planning", "active", "completed"] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  members: number;
}
