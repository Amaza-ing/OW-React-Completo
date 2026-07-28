import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router";
import {
  getProjectStatusLabel,
  projectTeamSourceOptions,
  useAddProjectMemberMutation,
  useProjectQuery,
  useProjectTeamQuery,
} from "../features/projects";
import type { ProjectTeamSource } from "../features/projects";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

function ProjectDetailPage() {
  const { projectId } = useParams();

  const navigate = useNavigate();

  const [projectTeamSource, setProjectTeamSource] =
    useState<ProjectTeamSource>("graphql");

  const [memberName, setMemberName] = useState("");

  const [memberRole, setMemberRole] = useState("");

  const addProjectMemberMutation = useAddProjectMemberMutation();

  const {
    data: project,
    error,
    isError,
    isFetching,
    isPending,
  } = useProjectQuery(projectId);

  const {
    data: projectTeam = [],
    error: projectTeamError,
    isError: isProjectTeamError,
    isFetching: isProjectTeamFetching,
    isPending: isProjectTeamPending,
  } = useProjectTeamQuery(project?.id, projectTeamSource);

  const projectTeamSourceLabel =
    projectTeamSourceOptions.find(
      (option) => option.value === projectTeamSource,
    )?.label ?? "Desconocida";

  function handleAddMember(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (project === undefined) {
      return;
    }

    addProjectMemberMutation.mutate(
      {
        projectId: project.id,
        name: memberName.trim(),
        role: memberRole.trim(),
      },
      {
        onSuccess: () => {
          setMemberName("");
          setMemberRole("");
        },
      },
    );
  }

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

      <ContentPanel
        eyebrow="Comparativa"
        title="Equipo del proyecto"
        meta={
          isProjectTeamFetching
            ? `${projectTeamSourceLabel} · Actualizando...`
            : `${projectTeamSourceLabel} · ${projectTeam.length} miembros`
        }
      >
        <label>
          <span>Fuente de datos</span>

          <select
            value={projectTeamSource}
            onChange={(event) =>
              setProjectTeamSource(event.target.value as ProjectTeamSource)
            }
          >
            {projectTeamSourceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <p>
          {projectTeamSource === "graphql"
            ? "Operación GetProjectTeam enviada a POST /graphql."
            : "Recurso solicitado mediante GET /api/projects/:projectId/team."}
        </p>

        {isProjectTeamPending && <p role="status">Cargando equipo...</p>}

        {isProjectTeamError && (
          <>
            <p role="alert">No se ha podido cargar el equipo.</p>

            <p>{projectTeamError.message}</p>
          </>
        )}

        {!isProjectTeamPending &&
          !isProjectTeamError &&
          projectTeam.length === 0 && (
            <p>El proyecto todavía no tiene miembros asignados.</p>
          )}

        {!isProjectTeamPending &&
          !isProjectTeamError &&
          projectTeam.length > 0 && (
            <ul>
              {projectTeam.map((member) => (
                <li key={member.id}>
                  <strong>{member.name}</strong>
                  {" — "}
                  {member.role}
                </li>
              ))}
            </ul>
          )}
      </ContentPanel>

      <ContentPanel
        eyebrow="Mutación GraphQL"
        title="Añadir miembro"
        meta={
          addProjectMemberMutation.isPending
            ? "Guardando..."
            : "Sin cambios pendientes"
        }
      >
        <form onSubmit={handleAddMember}>
          <label>
            <span>Nombre del miembro</span>

            <input
              type="text"
              value={memberName}
              onChange={(event) => setMemberName(event.target.value)}
              disabled={addProjectMemberMutation.isPending}
              required
            />
          </label>

          <label>
            <span>Rol</span>

            <input
              type="text"
              value={memberRole}
              onChange={(event) => setMemberRole(event.target.value)}
              disabled={addProjectMemberMutation.isPending}
              required
            />
          </label>

          <button
            className="page-action page-action--secondary"
            type="submit"
            disabled={addProjectMemberMutation.isPending}
          >
            {addProjectMemberMutation.isPending
              ? "Añadiendo..."
              : "Añadir al equipo"}
          </button>
        </form>

        {addProjectMemberMutation.isError && (
          <>
            <p role="alert">No se ha podido añadir el miembro.</p>

            <p>{addProjectMemberMutation.error.message}</p>
          </>
        )}

        {addProjectMemberMutation.isSuccess && (
          <p role="status">
            «{addProjectMemberMutation.data.name}» se ha añadido al equipo.
          </p>
        )}
      </ContentPanel>
    </div>
  );
}

export default ProjectDetailPage;
