import {
  ProjectResults,
  projects,
  useProjectSearch,
} from "../features/projects";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

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
        <label className="project-search">
          <span>Nombre del proyecto</span>

          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Ej. web"
          />
        </label>
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
