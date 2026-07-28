import {
  ProjectResults,
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

  const { search, filteredProjects, handleSearchChange } =
    useProjectSearch(projects);

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
