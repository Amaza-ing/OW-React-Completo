import { Link } from "react-router";
import type { Project } from "../../model/project";
import { getProjectStatusLabel } from "../../utils/projectUtils";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__header">
        <span
          className={`project-card__status project-card__status--${project.status}`}
        >
          {getProjectStatusLabel(project.status)}
        </span>

        <span className="project-card__members">
          {project.members} miembros
        </span>
      </div>

      <div className="project-card__content">
        <h3>
          <Link
            className="project-card__title-link"
            to={`/projects/${project.id}`}
          >
            {project.name}
          </Link>
        </h3>

        <p>{project.description}</p>
      </div>

      <div className="project-card__progress">
        <div className="project-card__progress-header">
          <span>Progreso</span>
          <strong>{project.progress}%</strong>
        </div>

        <div
          className="project-card__progress-track"
          aria-label={`Progreso de ${project.name}: ${project.progress}%`}
        >
          <span
            className="project-card__progress-value"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <p className="project-card__date">
        Fecha objetivo: <strong>{project.dueDate}</strong>
      </p>
    </article>
  );
}

export default ProjectCard;
