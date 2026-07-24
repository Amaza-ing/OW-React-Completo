import {
  ProjectResults,
  projects,
  useProjectSearch,
} from "../features/projects";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";
import SearchField from "../shared/components/common/SearchField";

function ProjectsPage() {
  const { search, filteredProjects, handleSearchChange } =
    useProjectSearch(projects);

  return (
    <div className="page projects-page">
      <PageHeader
        eyebrow="Proyectos"
        title="Todos los proyectos"
        description="Revisa el estado, el progreso y la fecha objetivo de cada proyecto."
        badge={`${filteredProjects.length} proyectos`}
      />

      <ContentPanel eyebrow="Búsqueda" title="Buscar proyectos">
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
