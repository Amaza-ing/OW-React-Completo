import "server-only";
import type { Project } from "../model/project";

const GET_PROJECTS_QUERY = `
  query GetProjects {
    projects {
      id
      name
      description
      status
      progress
      dueDate
      members
    }
  }
`;

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string }[];
};

type GetProjectsData = {
  projects: Project[];
};

function getGraphQLEndpoint() {
  const endpoint = process.env.GRAPHQL_API_URL;

  if (endpoint === undefined) {
    throw new Error("Falta configurar GRAPHQL_API_URL.");
  }

  return endpoint;
}

async function requestGraphQL<TData>(query: string): Promise<TData> {
  const response = await fetch(getGraphQLEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`La API GraphQL ha respondido con ${response.status}.`);
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join(" "));
  }

  if (payload.data === undefined) {
    throw new Error("La respuesta GraphQL no contiene datos.");
  }

  return payload.data;
}

export async function getProjects(): Promise<Project[]> {
  const data = await requestGraphQL<GetProjectsData>(GET_PROJECTS_QUERY);
  return data.projects;
}
