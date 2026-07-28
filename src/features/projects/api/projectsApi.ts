import { projects } from "../data/projects";
import type { Project } from "../model/project";

const PROJECTS_REQUEST_DELAY = 700;

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function getProjects(): Promise<Project[]> {
  await wait(PROJECTS_REQUEST_DELAY);

  return projects.map((project) => ({
    ...project,
  }));
}
