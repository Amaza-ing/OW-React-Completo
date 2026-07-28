import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProject } from "../api/projectsApi";
import type { Project } from "../model/project";
import { projectsQueryKey } from "./useProjectsQuery";

export function useCompleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeProject,

    onMutate: async (projectId) => {
      await queryClient.cancelQueries({
        queryKey: projectsQueryKey,
      });

      const previousProjects =
        queryClient.getQueryData<Project[]>(projectsQueryKey);

      queryClient.setQueryData<Project[]>(
        projectsQueryKey,
        (currentProjects) => {
          if (currentProjects === undefined) {
            return currentProjects;
          }

          return currentProjects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  status: "completed",
                  progress: 100,
                }
              : project,
          );
        },
      );

      return {
        previousProjects,
      };
    },

    onError: (_error, _projectId, onMutateResult) => {
      if (onMutateResult?.previousProjects !== undefined) {
        queryClient.setQueryData(
          projectsQueryKey,
          onMutateResult.previousProjects,
        );
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectsQueryKey,
      });
    },
  });
}
