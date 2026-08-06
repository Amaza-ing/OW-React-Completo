import type { Project } from "../model/project";
import { projectStatusLabels } from "../model/project";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <header>
        <h2>{project.name}</h2>
        <span className="project-card__status">
          {projectStatusLabels[project.status]}
        </span>
      </header>

      <p>{project.description}</p>

      <dl>
        <div>
          <dt>Progreso</dt>
          <dd>{project.progress}%</dd>
        </div>
        <div>
          <dt>Equipo</dt>
          <dd>{project.members}</dd>
        </div>
        <div>
          <dt>Entrega</dt>
          <dd>{project.dueDate}</dd>
        </div>
      </dl>
    </article>
  );
}
