import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/projectsApi";
import { getProjectTeam } from "../graphql/projectsGraphqlApi";
import type { ProjectTeamSource } from "../model/projectMember";
import { getProjectById } from "../utils/projectUtils";

const projectRootQueryKey = ["projects"] as const;

export const projectQueryKeys = {
  all: projectRootQueryKey,

  list: () => [...projectRootQueryKey, "list"] as const,

  teamRoot: (projectId: string) =>
    [...projectRootQueryKey, "team", projectId] as const,

  team: (projectId: string, source: ProjectTeamSource) =>
    [...projectQueryKeys.teamRoot(projectId), source] as const,
};

export const projectsQueryOptions = queryOptions({
  queryKey: projectQueryKeys.list(),
  queryFn: getProjects,
});

export function useProjectsQuery() {
  return useQuery(projectsQueryOptions);
}

export function useProjectQuery(projectId: string | undefined) {
  return useQuery({
    ...projectsQueryOptions,

    select: (projects) =>
      projectId === undefined ? undefined : getProjectById(projects, projectId),
  });
}

export function useProjectTeamQuery(
  projectId: string | undefined,
  source: ProjectTeamSource,
) {
  return useQuery({
    queryKey: projectQueryKeys.team(projectId ?? "", source),

    queryFn: ({ signal }) => {
      if (projectId === undefined) {
        throw new Error("Falta el identificador del proyecto.");
      }

      if (source === "graphql") {
        return getProjectTeam(projectId, signal);
      }
    },

    enabled: projectId !== undefined,
  });
}
