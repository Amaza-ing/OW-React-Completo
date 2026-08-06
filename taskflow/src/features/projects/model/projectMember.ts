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
