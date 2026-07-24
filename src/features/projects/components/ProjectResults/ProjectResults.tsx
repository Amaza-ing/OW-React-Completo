import type { ReactNode } from "react";
import type { Project } from "../../model/project";
import ProjectList from "../ProjectList/ProjectList";

type ProjectResultsProps = {
  projects: Project[];
  children: ReactNode;
};

function ProjectResults({ projects, children }: ProjectResultsProps) {
  if (projects.length === 0) {
    return children;
  }

  return <ProjectList projects={projects} />;
}

export default ProjectResults;
