import { projects as initialProjects } from "../data/projects";
import type { Project } from "../model/project";

const PROJECTS_REQUEST_DELAY = 700;

let projectStore = initialProjects.map((project) => ({
  ...project,
}));

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function cloneProjects(projectItems: Project[]): Project[] {
  return projectItems.map((project) => ({
    ...project,
  }));
}

export async function getProjects(): Promise<Project[]> {
  await wait(PROJECTS_REQUEST_DELAY);

  return cloneProjects(projectStore);
}

export async function completeProject(projectId: string): Promise<Project> {
  await wait(PROJECTS_REQUEST_DELAY);

  const project = projectStore.find(
    (currentProject) => currentProject.id === projectId,
  );

  if (project === undefined) {
    throw new Error("No se ha encontrado el proyecto.");
  }

  const completedProject: Project = {
    ...project,
    status: "completed",
    progress: 100,
  };

  projectStore = projectStore.map((currentProject) =>
    currentProject.id === projectId ? completedProject : currentProject,
  );

  return {
    ...completedProject,
  };
}
