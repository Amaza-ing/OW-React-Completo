import { requestGraphQL } from "../../../shared/api/graphqlClient";
import type { ProjectMember } from "../model/projectMember";
import { GET_PROJECT_TEAM_QUERY } from "./projectsOperations";

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
