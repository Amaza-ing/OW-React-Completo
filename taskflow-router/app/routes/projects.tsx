import type { Route } from "./+types/projects";
import {
  addProjectMember,
  getProjects,
} from "~/features/projects/api/projectsGraphql.server";
import ProjectCard from "~/features/projects/components/ProjectCard";
import QuickMemberForm from "~/features/projects/components/QuickMemberForm";
import "~/styles/projects.css";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "TaskFlow Router | Proyectos",
    },
    {
      name: "description",
      content: "Listado y mutación de proyectos mediante loaders y actions.",
    },
  ];
}

export async function loader() {
  const projects = await getProjects();

  return {
    projects,
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

export default function Projects({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="page projects-page">
      <header className="projects-page__header">
        <div>
          <p className="page__eyebrow">Loader y action</p>
          <h1>Proyectos</h1>
          <p className="page__lead">
            La misma ruta obtiene datos, procesa el formulario y vuelve a cargar
            el listado después de la mutación.
          </p>
        </div>

        <strong>{loaderData.projects.length} proyectos</strong>
      </header>

      <QuickMemberForm projects={loaderData.projects} feedback={actionData} />

      <div className="projects-page__grid">
        {loaderData.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
