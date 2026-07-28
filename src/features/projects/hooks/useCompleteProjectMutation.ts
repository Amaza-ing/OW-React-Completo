import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeProject } from "../api/projectsApi";
import { projectsQueryKey } from "./useProjectsQuery";

export function useCompleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectsQueryKey,
      });
    },
  });
}
