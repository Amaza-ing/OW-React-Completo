import type { ProjectMember } from "../model/projectMember";

type RestProjectMember = {
  id: string;
  name: string;
  role: string;
};

type RestProjectTeamResponse = {
  projectId: string;
  team: RestProjectMember[];
};

type RestErrorResponse = {
  message?: string;
};

function getRestApiUrl(): string {
  const apiUrl = import.meta.env.VITE_REST_API_URL;

  if (typeof apiUrl !== "string" || apiUrl.trim() === "") {
    throw new Error("Falta configurar VITE_REST_API_URL.");
  }

  return apiUrl.replace(/\/$/, "");
}

async function readJson<TData>(response: Response): Promise<TData> {
  try {
    return (await response.json()) as TData;
  } catch {
    throw new Error("La API REST no ha devuelto una respuesta JSON válida.");
  }
}

function mapRestProjectMember(member: RestProjectMember): ProjectMember {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
  };
}

export async function getProjectTeamRest(
  projectId: string,
  signal?: AbortSignal,
): Promise<ProjectMember[]> {
  const response = await fetch(
    `${getRestApiUrl()}/projects/${encodeURIComponent(projectId)}/team`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    },
  );

  if (!response.ok) {
    const error = await readJson<RestErrorResponse>(response);

    throw new Error(
      error.message ??
        `La petición REST ha fallado con estado HTTP ${response.status}.`,
    );
  }

  const data = await readJson<RestProjectTeamResponse>(response);

  return data.team.map(mapRestProjectMember);
}
