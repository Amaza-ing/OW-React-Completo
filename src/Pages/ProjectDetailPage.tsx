import { useNavigate, useParams } from "react-router";
import {
  getProjectById,
  getProjectStatusLabel,
  projects,
} from "../features/projects";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project =
    projectId === undefined ? undefined : getProjectById(projects, projectId);

  if (project === undefined) {
    return (
      <div className="page">
        <PageHeader
          eyebrow="Proyectos"
          title="Proyecto no encontrado"
          description="No existe ningún proyecto con el identificador indicado."
        />

        <ContentPanel>
          <button type="button" onClick={() => navigate("/projects")}>
            Volver a proyectos
          </button>
        </ContentPanel>
      </div>
    );
  }

  return (
    <div className="page">
      <PageHeader
        eyebrow="Detalle del proyecto"
        title={project.name}
        description={project.description}
        badge={getProjectStatusLabel(project.status)}
      />

      <ContentPanel
        eyebrow="Información"
        title="Resumen del proyecto"
        meta={`${project.progress}% completado`}
      >
        <p>
          <strong>Fecha objetivo:</strong> {project.dueDate}
        </p>

        <p>
          <strong>Miembros:</strong> {project.members}
        </p>

        <p>
          <strong>Progreso:</strong> {project.progress}%
        </p>

        <button type="button" onClick={() => navigate("/projects")}>
          Volver a proyectos
        </button>
      </ContentPanel>
    </div>
  );
}

export default ProjectDetailPage;
