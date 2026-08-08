import { Link } from "react-router";
import type { Route } from "./+types/index";
import {
  addProjectMember,
  getProjects,
} from "~/features/projects/api/projectsGraphql.server";
import {
  ProjectCard,
  ProjectSearchForm,
  QuickMemberForm,
} from "~/features/projects";
import "~/styles/projects.css";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "TaskFlow Router | Proyectos",
    },
    {
      name: "description",
      content: "Listado de proyectos con búsqueda gestionada desde el loader.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const search = url.searchParams.get("search")?.trim() ?? "";

  const projects = await getProjects();

  const normalizedSearch = search.toLocaleLowerCase("es");

  const filteredProjects =
    normalizedSearch === ""
      ? projects
      : projects.filter((project) => {
          const searchableText =
            `${project.name} ${project.description}`.toLocaleLowerCase("es");

          return searchableText.includes(normalizedSearch);
        });

  return {
    projects: filteredProjects,
    allProjects: projects,
    search,
    totalProjects: projects.length,
  };
}

function getTextField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);

  return typeof value === "string" ? value.trim() : "";
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const projectId = getTextField(formData, "projectId");
  const name = getTextField(formData, "name");
  const role = getTextField(formData, "role");

  if (projectId === "" || name === "" || role === "") {
    return {
      status: "error" as const,
      message: "Completa el proyecto, el nombre y el rol.",
    };
  }

  await addProjectMember({
    projectId,
    name,
    role,
  });

  return {
    status: "success" as const,
    message: `${name} se ha añadido al equipo.`,
  };
}

export default function ProjectsIndex({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="projects-index">
      <ProjectSearchForm search={loaderData.search} />

      <QuickMemberForm
        projects={loaderData.allProjects}
        feedback={actionData}
      />

      <div className="projects-index__summary">
        <p>
          {loaderData.search === ""
            ? "Selecciona un proyecto para consultar su equipo."
            : `Resultados para “${loaderData.search}”.`}
        </p>

        <strong>
          {loaderData.projects.length} de {loaderData.totalProjects}
        </strong>
      </div>

      {loaderData.projects.length === 0 ? (
        <div className="empty-state">
          <strong>No hay coincidencias</strong>
          <p>Prueba con otro nombre o limpia la búsqueda.</p>
        </div>
      ) : (
        <div className="projects-page__grid">
          {loaderData.projects.map((project) => (
            <Link
              className="project-card-link"
              key={project.id}
              to={`/projects/${project.id}`}
            >
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
