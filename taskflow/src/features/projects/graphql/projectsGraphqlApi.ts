import { requestGraphQL } from "../../../shared/api/graphqlClient";
import type {
  AddProjectMemberInput,
  ProjectMember,
} from "../model/projectMember";
import {
  ADD_PROJECT_MEMBER_MUTATION,
  GET_PROJECT_TEAM_QUERY,
} from "./projectsOperations";

type GraphQLProjectMember = {
  id: string;
  name: string;
  role: string;
};

type GetProjectTeamData = {
  project: {
    id: string;
    team: GraphQLProjectMember[];
  } | null;
};

type GetProjectTeamVariables = {
  projectId: string;
};

type AddProjectMemberData = {
  addProjectMember: GraphQLProjectMember;
};

type AddProjectMemberVariables = {
  projectId: string;
  input: {
    name: string;
    role: string;
  };
};

function mapProjectMember(member: GraphQLProjectMember): ProjectMember {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
  };
}

export async function getProjectTeam(
  projectId: string,
  signal?: AbortSignal,
): Promise<ProjectMember[]> {
  const data = await requestGraphQL<
    GetProjectTeamData,
    GetProjectTeamVariables
  >({
    query: GET_PROJECT_TEAM_QUERY,
    operationName: "GetProjectTeam",
    variables: {
      projectId,
    },
    signal,
  });

  if (data.project === null) {
    throw new Error("No se ha encontrado el proyecto en la API GraphQL.");
  }

  return data.project.team.map(mapProjectMember);
}

export async function addProjectMember({
  projectId,
  name,
  role,
}: AddProjectMemberInput): Promise<ProjectMember> {
  const data = await requestGraphQL<
    AddProjectMemberData,
    AddProjectMemberVariables
  >({
    query: ADD_PROJECT_MEMBER_MUTATION,
    operationName: "AddProjectMember",
    variables: {
      projectId,
      input: {
        name,
        role,
      },
    },
    backgroundSync: true,
  });

  return mapProjectMember(data.addProjectMember);
}
