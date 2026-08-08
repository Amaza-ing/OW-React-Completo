import { Link } from "react-router";
import type { Route } from "./+types/index";
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

export default function ProjectsIndex({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="projects-index">
      <QuickMemberForm projects={loaderData.projects} feedback={actionData} />

      <div className="projects-index__summary">
        <p>Selecciona un proyecto para consultar su equipo.</p>

        <strong>{loaderData.projects.length} proyectos</strong>
      </div>

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
    </div>
  );
}
