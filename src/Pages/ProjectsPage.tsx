import type { ChangeEventHandler } from "react";
import { useSearchParams } from "react-router";
import { ProjectCard, projects } from "../features/projects";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

type SearchChangeHandler = ChangeEventHandler<HTMLInputElement>;

function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProjects =
    normalizedSearch === ""
      ? projects
      : projects.filter((project) =>
          project.name.toLowerCase().includes(normalizedSearch),
        );

  const handleSearchChange: SearchChangeHandler = (event) => {
    const value = event.currentTarget.value;

    if (value === "") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      search: value,
    });
  };

  return (
    <div className="page">
      <PageHeader
        eyebrow="Proyectos"
        title="Todos los proyectos"
        description="Revisa el estado, el progreso y la fecha objetivo de cada proyecto."
        badge={`${filteredProjects.length} proyectos`}
      />

      <ContentPanel eyebrow="Búsqueda" title="Buscar proyectos">
        <label>
          <span>Nombre del proyecto</span>

          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Ej. web"
          />
        </label>
      </ContentPanel>

      <section className="project-grid" aria-label="Listado de proyectos">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      {filteredProjects.length === 0 && (
        <ContentPanel>
          <p>
            No se han encontrado proyectos para: <strong>{search}</strong>
          </p>
        </ContentPanel>
      )}
    </div>
  );
}

export default ProjectsPage;
