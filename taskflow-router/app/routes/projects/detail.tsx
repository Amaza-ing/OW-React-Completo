import type { Route } from "./+types/detail";
import { getProject } from "~/features/projects/api/projectsGraphql.server";
import { projectStatusLabels } from "~/features/projects";
import "~/styles/project-detail.css";

export async function loader({ params }: Route.LoaderArgs) {
  const project = await getProject(params.projectId);

  if (project === null) {
    throw new Response("El proyecto solicitado no existe.", {
      status: 404,
      statusText: "Proyecto no encontrado",
    });
  }

  return {
    project,
  };
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const team = loaderData.project.team ?? [];

  return (
    <div className="project-detail">
      <header className="project-detail__header">
        <div>
          <span>{projectStatusLabels[loaderData.project.status]}</span>
          <h2>{loaderData.project.name}</h2>
          <p>{loaderData.project.description}</p>
        </div>

        <strong>{loaderData.project.progress}%</strong>
      </header>

      <section className="project-team">
        <header>
          <h2>Equipo del proyecto</h2>
          <span>{team.length} integrantes</span>
        </header>

        {team.length === 0 ? (
          <p className="project-team__empty">
            Este proyecto todavía no tiene integrantes.
          </p>
        ) : (
          <ul>
            {team.map((member) => (
              <li key={member.id}>
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
