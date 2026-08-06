import { getProjects } from "@/features/projects/api/projectsGraphql";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { getProjectVisibility, updateProjectVisibility } from "./actions";

export default async function ProjectsPage() {
  const [projects, showCompleted] = await Promise.all([
    getProjects(),
    getProjectVisibility(),
  ]);

  const visibleProjects = showCompleted
    ? projects
    : projects.filter((project) => project.status !== "COMPLETED");

  return (
    <div className="page">
      <p className="page__eyebrow">Server data</p>
      <h1>Proyectos</h1>
      <p className="page__lead">
        La lista se obtiene desde GraphQL antes de renderizar la respuesta.
      </p>

      <section className="projects-toolbar">
        <p>
          {visibleProjects.length} de {projects.length} proyectos visibles
        </p>

        <form action={updateProjectVisibility}>
          <label>
            <input
              type="checkbox"
              name="showCompleted"
              defaultChecked={showCompleted}
            />
            Mostrar completados
          </label>
          <button type="submit">Aplicar</button>
        </form>
      </section>

      <section className="project-grid">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}
