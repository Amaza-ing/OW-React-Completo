const PROJECT_MEMBER_FIELDS_FRAGMENT = String.raw`
    fragment ProjectMemberFields
    on ProjectMember {
      id
      name
      role
    }
  `;

export const GET_PROJECT_TEAM_QUERY = String.raw`
    ${PROJECT_MEMBER_FIELDS_FRAGMENT}

    query GetProjectTeam(
      $projectId: ID!
    ) {
      project(id: $projectId) {
        id
        team {
          ...ProjectMemberFields
        }
      }
    }
  `;

export const ADD_PROJECT_MEMBER_MUTATION = String.raw`
    ${PROJECT_MEMBER_FIELDS_FRAGMENT}

    mutation AddProjectMember(
      $projectId: ID!
      $input: AddProjectMemberInput!
    ) {
      addProjectMember(
        projectId: $projectId
        input: $input
      ) {
        ...ProjectMemberFields
      }
    }
  `;
