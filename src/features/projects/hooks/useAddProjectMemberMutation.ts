import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProjectMember } from "../graphql/projectsGraphqlApi";
import { projectQueryKeys } from "./useProjectsQuery";

export function useAddProjectMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProjectMember,

    onSuccess: async (_member, variables) => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryKeys.team(variables.projectId),
        exact: true,
      });
    },
  });
}
