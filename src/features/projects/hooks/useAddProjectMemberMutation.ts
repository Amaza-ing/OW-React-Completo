import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProjectMember } from "../graphql/projectsGraphqlApi";
import type { ProjectMember } from "../model/projectMember";
import { projectQueryKeys } from "./useProjectsQuery";

export function useAddProjectMemberMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProjectMember,

    onSuccess: (member, variables) => {
      queryClient.setQueryData<ProjectMember[]>(
        projectQueryKeys.team(variables.projectId),
        (currentMembers) => {
          const members = currentMembers ?? [];

          const memberAlreadyExists = members.some(
            (currentMember) => currentMember.id === member.id,
          );

          if (memberAlreadyExists) {
            return members;
          }

          return [...members, member];
        },
      );
    },
  });
}
