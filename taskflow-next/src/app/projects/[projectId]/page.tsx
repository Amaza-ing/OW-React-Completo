import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/features/projects/api/projectsGraphql";
import AddProjectMemberForm from "@/features/projects/components/AddProjectMemberForm";
import { projectStatusLabels } from "@/features/projects/model/project";

type ProjectDetailPageProps = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProject(projectId);

  return project === null
    ? { title: "Proyecto no encontrado" }
    : { title: project.name, description: project.description };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (project === null) notFound();

  const team = project.team ?? [];

  return (
    <div className="project-detail">
      <Link className="project-detail__back" href="/projects">
        ← Volver a proyectos
      </Link>

      <section className="project-detail__summary">
        <header>
          <div>
            <p className="page__eyebrow">Proyecto</p>
            <h1>{project.name}</h1>
          </div>
          <span className="project-card__status">
            {projectStatusLabels[project.status]}
          </span>
        </header>

        <p>{project.description}</p>
        <label>
          Progreso: {project.progress}%
          <progress value={project.progress} max="100" />
        </label>
        <p>Entrega: {project.dueDate}</p>
      </section>

      <section className="project-detail__team">
        <h2>Equipo · {team.length} miembros</h2>
        <ul>
          {team.map((member) => (
            <li key={member.id}>
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="project-detail__form">
        <h2>Añadir miembro</h2>
        <AddProjectMemberForm projectId={project.id} />
      </section>
    </div>
  );
}
