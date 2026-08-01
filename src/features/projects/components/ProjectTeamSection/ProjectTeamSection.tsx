import { Component, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import ContentPanel from "../../../../shared/components/common/ContentPanel";
import { useAddProjectMemberMutation } from "../../hooks/useAddProjectMemberMutation";
import { useSuspenseProjectTeamQuery } from "../../hooks/useProjectsQuery";

type ProjectTeamSectionProps = {
  projectId: string;
};

type ProjectTeamErrorBoundaryProps = {
  children: ReactNode;
};

type ProjectTeamErrorBoundaryState = {
  error: Error | null;
};

class ProjectTeamErrorBoundary extends Component<
  ProjectTeamErrorBoundaryProps,
  ProjectTeamErrorBoundaryState
> {
  state: ProjectTeamErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): ProjectTeamErrorBoundaryState {
    return {
      error,
    };
  }

  render() {
    if (this.state.error !== null) {
      return (
        <ContentPanel
          eyebrow="GraphQL"
          title="Equipo del proyecto"
          meta="Error"
        >
          <p role="alert">No se ha podido cargar el equipo.</p>

          <p>{this.state.error.message}</p>
        </ContentPanel>
      );
    }

    return this.props.children;
  }
}

function ProjectTeamContent({ projectId }: ProjectTeamSectionProps) {
  const [memberName, setMemberName] = useState("");

  const [memberRole, setMemberRole] = useState("");

  const { data: projectTeam, isFetching: isProjectTeamFetching } =
    useSuspenseProjectTeamQuery(projectId);

  const addProjectMemberMutation = useAddProjectMemberMutation();

  function handleAddMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addProjectMemberMutation.mutate(
      {
        projectId,
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

  return (
    <>
      <ContentPanel
        eyebrow="GraphQL"
        title="Equipo del proyecto"
        meta={
          isProjectTeamFetching
            ? "Actualizando..."
            : `${projectTeam.length} miembros`
        }
      >
        {projectTeam.length === 0 ? (
          <p>El proyecto todavía no tiene miembros asignados.</p>
        ) : (
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
    </>
  );
}

function ProjectTeamSection({ projectId }: ProjectTeamSectionProps) {
  return (
    <ProjectTeamErrorBoundary key={projectId}>
      <ProjectTeamContent projectId={projectId} />
    </ProjectTeamErrorBoundary>
  );
}

export default ProjectTeamSection;
