export const projectTeamSourceOptions = [
  {
    value: "graphql",
    label: "GraphQL",
  },
  {
    value: "rest",
    label: "REST",
  },
] as const satisfies readonly {
  value: string;
  label: string;
}[];

export type ProjectTeamSource =
  (typeof projectTeamSourceOptions)[number]["value"];

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
}

export interface NewProjectMember {
  name: string;
  role: string;
}

export interface AddProjectMemberInput extends NewProjectMember {
  projectId: string;
}
