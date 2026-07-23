import PageHeader from "../shared/components/common/PageHeader";
import ProjectCard from "../features/projects/components/ProjectCard/ProjectCard";
import { projects } from "../features/projects/data/projects";

function ProjectsPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Proyectos"
        title="Todos los proyectos"
        description="Revisa el estado, el progreso y la fecha objetivo de cada proyecto."
        badge={`${projects.length} proyectos`}
      />

      <section className="project-grid" aria-label="Listado de proyectos">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default ProjectsPage;
