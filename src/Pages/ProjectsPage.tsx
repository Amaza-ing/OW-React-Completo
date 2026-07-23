import PageHeader from "../shared/components/common/PageHeader";
import { ProjectCard, projects } from "../features/projects";

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
