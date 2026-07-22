import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

function ProjectsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Proyectos</p>
          <h1>Todos los proyectos</h1>
          <p>
            Revisa el estado, el progreso y la fecha objetivo de cada proyecto.
          </p>
        </div>

        <span className="page-header__badge">{projects.length} proyectos</span>
      </header>

      <section className="project-grid" aria-label="Listado de proyectos">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default ProjectsPage;
