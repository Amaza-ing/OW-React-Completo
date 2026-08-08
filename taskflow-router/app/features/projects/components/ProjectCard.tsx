import {
  projectStatusLabels,
  type Project,
} from "~/features/projects/model/project";

function formatDueDate(dueDate: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dueDate));
}

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <header>
        <div>
          <span>{projectStatusLabels[project.status]}</span>
          <h2>{project.name}</h2>
        </div>

        <strong>{project.progress}%</strong>
      </header>

      <p>{project.description}</p>

      <dl>
        <div>
          <dt>Entrega</dt>
          <dd>{formatDueDate(project.dueDate)}</dd>
        </div>

        <div>
          <dt>Equipo</dt>
          <dd>{project.members} miembros</dd>
        </div>
      </dl>

      <div
        className="project-card__progress"
        aria-label={`Progreso del proyecto: ${project.progress}%`}
      >
        <span
          style={{
            width: `${project.progress}%`,
          }}
        />
      </div>
    </article>
  );
}

export default ProjectCard;
