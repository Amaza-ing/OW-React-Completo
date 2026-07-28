import { queryOptions, useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/projectsApi";
import { getProjectById } from "../utils/projectUtils";

const projectRootQueryKey = ["projects"] as const;

export const projectQueryKeys = {
  all: projectRootQueryKey,
  list: () => [...projectRootQueryKey, "list"] as const,
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
