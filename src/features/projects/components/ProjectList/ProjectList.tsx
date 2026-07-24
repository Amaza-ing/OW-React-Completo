import type { Project } from "../../model/project";
import ProjectCard from "../ProjectCard/ProjectCard";

type ProjectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="project-grid" aria-label="Listado de proyectos">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}

export default ProjectList;
