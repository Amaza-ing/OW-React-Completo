import "server-only";
import type {
  AddProjectMemberInput,
  Project,
  ProjectMember,
} from "../model/project";

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

const GET_PROJECT_QUERY = `
  query GetProject($projectId: ID!) {
    project(id: $projectId) {
      id
      name
      description
      status
      progress
      dueDate
      members
      team { id name role }
    }
  }
`;

const ADD_PROJECT_MEMBER_MUTATION = `
  mutation AddProjectMember($projectId: ID!, $input: AddProjectMemberInput!) {
    addProjectMember(projectId: $projectId, input: $input) {
      id
      name
      role
    }
  }
`;

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string }[];
};

type GetProjectsData = { projects: Project[] };
type GetProjectData = { project: Project | null };
type AddProjectMemberData = { addProjectMember: ProjectMember };

function getGraphQLEndpoint() {
  const endpoint = process.env.GRAPHQL_API_URL;
  if (endpoint === undefined)
    throw new Error("Falta configurar GRAPHQL_API_URL.");
  return endpoint;
}

async function requestGraphQL<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const response = await fetch(getGraphQLEndpoint(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
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

export async function getProject(projectId: string): Promise<Project | null> {
  const data = await requestGraphQL<GetProjectData>(GET_PROJECT_QUERY, {
    projectId,
  });
  return data.project;
}

export async function addProjectMember({
  projectId,
  name,
  role,
}: AddProjectMemberInput): Promise<ProjectMember> {
  const data = await requestGraphQL<AddProjectMemberData>(
    ADD_PROJECT_MEMBER_MUTATION,
    {
      projectId,
      input: { name, role },
    },
  );
  return data.addProjectMember;
}
