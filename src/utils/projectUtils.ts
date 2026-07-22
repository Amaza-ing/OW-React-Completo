import type { Project, ProjectStatus } from "../types/project";

export type ProjectSummary = {
  total: number;
  active: number;
  completed: number;
  averageProgress: number;
};

export function getProjectStatusLabel(status: ProjectStatus): string {
  switch (status) {
    case "planning":
      return "Planificación";
    case "active":
      return "Activo";
    case "completed":
      return "Completado";
  }
}

export function getProjectById(
  projects: Project[],
  projectId: string,
): Project | undefined {
  return projects.find((project) => project.id === projectId);
}

export function getProjectSummary(projects: Project[]): ProjectSummary {
  const active = projects.filter(
    (project) => project.status === "active",
  ).length;

  const completed = projects.filter(
    (project) => project.status === "completed",
  ).length;

  const totalProgress = projects.reduce(
    (total, project) => total + project.progress,
    0,
  );

  const averageProgress =
    projects.length === 0 ? 0 : Math.round(totalProgress / projects.length);

  return {
    total: projects.length,
    active,
    completed,
    averageProgress,
  };
}
