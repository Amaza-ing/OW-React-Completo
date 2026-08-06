import {
  ProjectResults,
  useCompleteProjectMutation,
  useProjectSearch,
  useProjectsQuery,
} from "../features/projects";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";
import SearchField from "../shared/components/common/SearchField";

function ProjectsPage() {
  const {
    data: projects = [],
    error,
    isError,
    isFetching,
    isPending,
  } = useProjectsQuery();

  const completeProjectMutation = useCompleteProjectMutation();

  const { search, filteredProjects, handleSearchChange } =
    useProjectSearch(projects);

  const actionableProjects = filteredProjects.filter(
    (project) =>
      project.status !== "completed" ||
      (completeProjectMutation.isPending &&
        completeProjectMutation.variables === project.id),
  );

  if (isPending) {
    return (
      <div className="page projects-page">
        <PageHeader
          eyebrow="Proyectos"
          title="Todos los proyectos"
          description="Revisa el estado, el progreso y la fecha objetivo de cada proyecto."
          badge="Cargando..."
        />

        <ContentPanel ariaLabel="Carga de proyectos">
          <p role="status">Cargando proyectos...</p>
        </ContentPanel>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page projects-page">
        <PageHeader
          eyebrow="Proyectos"
          title="Todos los proyectos"
          description="Revisa el estado, el progreso y la fecha objetivo de cada proyecto."
          badge="Error"
        />

        <ContentPanel ariaLabel="Error al cargar proyectos">
          <p role="alert">No se han podido cargar los proyectos.</p>

          <p>{error.message}</p>
        </ContentPanel>
      </div>
    );
  }

  return (
    <div className="page projects-page">
      <PageHeader
        eyebrow="Proyectos"
        title="Todos los proyectos"
        description="Revisa el estado, el progreso y la fecha objetivo de cada proyecto."
        badge={`${filteredProjects.length} proyectos`}
      />

      <ContentPanel
        eyebrow="Búsqueda"
        title="Buscar proyectos"
        meta={isFetching ? "Actualizando..." : "Datos sincronizados"}
      >
        <SearchField
          label="Nombre del proyecto"
          value={search}
          onChange={handleSearchChange}
          placeholder="Ej. web"
        />
      </ContentPanel>

      <ContentPanel
        eyebrow="Mutación"
        title="Completar proyectos"
        meta={
          completeProjectMutation.isPending
            ? "Guardando..."
            : "Sin cambios pendientes"
        }
        actions={
          actionableProjects.length > 0 ? (
            actionableProjects.map((project) => (
              <button
                key={project.id}
                className="page-action page-action--secondary"
                type="button"
                onClick={() => {
                  completeProjectMutation.mutate(project.id);
                }}
                disabled={completeProjectMutation.isPending}
              >
                {completeProjectMutation.isPending &&
                completeProjectMutation.variables === project.id
                  ? "Completando..."
                  : `Completar ${project.name}`}
              </button>
            ))
          ) : (
            <span>No hay proyectos pendientes en los resultados.</span>
          )
        }
      >
        <p>
          La caché se actualiza inmediatamente y se restaura si la operación
          falla.
        </p>

        {completeProjectMutation.isError && (
          <p role="alert">{completeProjectMutation.error.message}</p>
        )}

        {completeProjectMutation.isSuccess && (
          <p role="status">
            Proyecto «{completeProjectMutation.data.name}» completado
            correctamente.
          </p>
        )}
      </ContentPanel>

      <ProjectResults projects={filteredProjects}>
        <ContentPanel>
          <p className="projects-page__empty">
            No se han encontrado proyectos para: <strong>{search}</strong>
          </p>
        </ContentPanel>
      </ProjectResults>
    </div>
  );
}

export default ProjectsPage;
