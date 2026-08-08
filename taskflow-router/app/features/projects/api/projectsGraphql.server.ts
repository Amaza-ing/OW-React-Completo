import type {
  AddProjectMemberInput,
  Project,
  ProjectMember,
} from "~/features/projects/model/project";

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
      team {
        id
        name
        role
      }
    }
  }
`;

const ADD_PROJECT_MEMBER_MUTATION = `
  mutation AddProjectMember(
    $projectId: ID!
    $input: AddProjectMemberInput!
  ) {
    addProjectMember(
      projectId: $projectId
      input: $input
    ) {
      id
      name
      role
    }
  }
`;

type GraphQLError = {
  message: string;
};

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLError[];
};

type GetProjectsData = {
  projects: Project[];
};

type GetProjectData = {
  project: Project | null;
};

type AddProjectMemberData = {
  addProjectMember: ProjectMember;
};

function getGraphQLEndpoint() {
  const endpoint = import.meta.env.VITE_GRAPHQL_API_URL;

  if (endpoint === undefined || endpoint === "") {
    throw new Error("Falta configurar VITE_GRAPHQL_API_URL.");
  }

  return endpoint;
}

async function requestGraphQL<TData>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<TData> {
  const response = await fetch(getGraphQLEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
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
      input: {
        name,
        role,
      },
    },
  );

  return data.addProjectMember;
}
