export type ProjectStatus = "planning" | "active" | "completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  members: number;
};
