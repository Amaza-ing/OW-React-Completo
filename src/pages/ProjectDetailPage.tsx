import { lazy, Suspense } from "react";
import { useNavigate, useParams } from "react-router";
import { getProjectStatusLabel, useProjectQuery } from "../features/projects";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

const ProjectTeamSection = lazy(
  () => import("../features/projects/ProjectTeamSection.lazy"),
);

function ProjectDetailPage() {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const {
    data: project,
    error,
    isError,
    isFetching,
    isPending,
  } = useProjectQuery(projectId);

  if (isPending) {
    return (
      <div className="page project-detail-page">
        <PageHeader
          eyebrow="Proyectos"
          title="Cargando proyecto"
          description="Estamos recuperando la información del proyecto."
          badge="Cargando..."
        />

        <ContentPanel ariaLabel="Carga del proyecto">
          <p role="status">Cargando proyecto...</p>
        </ContentPanel>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page project-detail-page">
        <PageHeader
          eyebrow="Proyectos"
          title="Error al cargar el proyecto"
          description="No se ha podido recuperar la información solicitada."
          badge="Error"
        />

        <ContentPanel
          ariaLabel="Error al cargar el proyecto"
          actions={
            <button
              className="page-action page-action--secondary"
              type="button"
              onClick={() => navigate("/projects")}
            >
              Volver a proyectos
            </button>
          }
        >
          <p role="alert">No se ha podido cargar el proyecto.</p>

          <p>{error.message}</p>
        </ContentPanel>
      </div>
    );
  }

  if (project === undefined) {
    return (
      <div className="page project-detail-page">
        <PageHeader
          eyebrow="Proyectos"
          title="Proyecto no encontrado"
          description="No existe ningún proyecto con el identificador indicado."
        />

        <ContentPanel
          actions={
            <button
              className="page-action page-action--secondary"
              type="button"
              onClick={() => navigate("/projects")}
            >
              Volver a proyectos
            </button>
          }
        >
          <p>Revisa la dirección del proyecto.</p>
        </ContentPanel>
      </div>
    );
  }

  return (
    <div className="page project-detail-page">
      <PageHeader
        eyebrow="Detalle del proyecto"
        title={project.name}
        description={project.description}
        badge={getProjectStatusLabel(project.status)}
      />

      <ContentPanel
        eyebrow="Información"
        title="Resumen del proyecto"
        meta={
          isFetching
            ? `${project.progress}% completado · Actualizando...`
            : `${project.progress}% completado`
        }
        actions={
          <button
            className="page-action page-action--secondary"
            type="button"
            onClick={() => navigate("/projects")}
          >
            Volver a proyectos
          </button>
        }
      >
        <div className="project-detail-page__data">
          <p>
            <strong>Fecha objetivo:</strong> {project.dueDate}
          </p>

          <p>
            <strong>Miembros:</strong> {project.members}
          </p>

          <p>
            <strong>Progreso:</strong> {project.progress}%
          </p>
        </div>
      </ContentPanel>

      <Suspense fallback={<p role="status">Cargando equipo del proyecto...</p>}>
        <ProjectTeamSection projectId={project.id} />
      </Suspense>
    </div>
  );
}

export default ProjectDetailPage;
