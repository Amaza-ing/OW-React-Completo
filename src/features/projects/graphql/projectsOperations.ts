export const GET_PROJECTS_QUERY = String.raw`
    query GetProjects {
      projects {
        id
        name
        description
        status
        progress
        dueDate
        members
      }
    }
  `;

export const GET_PROJECT_TEAM_QUERY = String.raw`
    query GetProjectTeam(
      $projectId: ID!
    ) {
      project(id: $projectId) {
        id
        team {
          id
          name
          role
        }
      }
    }
  `;

export const ADD_PROJECT_MEMBER_MUTATION = String.raw`
    mutation AddProjectMember(
      $projectId: ID!
      $input: AddProjectMemberInput!
    ) {
      addProjectMember(
        projectId: $projectId
        input: $input
      ) {
        id
        name
        role
      }
    }
  `;
