import type { Route } from "./+types/projects";
import { getProjects } from "~/features/projects/api/projectsGraphql.server";
import ProjectCard from "~/features/projects/components/ProjectCard";
import "~/styles/projects.css";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "TaskFlow Router | Proyectos",
    },
    {
      name: "description",
      content:
        "Listado de proyectos obtenido mediante un loader de React Router.",
    },
  ];
}

export async function loader() {
  const projects = await getProjects();

  return {
    projects,
  };
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  return (
    <div className="page projects-page">
      <header className="projects-page__header">
        <div>
          <p className="page__eyebrow">Loader de la ruta</p>
          <h1>Proyectos</h1>
          <p className="page__lead">
            Los datos se han obtenido antes de renderizar este módulo.
          </p>
        </div>

        <strong>{loaderData.projects.length} proyectos</strong>
      </header>

      <div className="projects-page__grid">
        {loaderData.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
