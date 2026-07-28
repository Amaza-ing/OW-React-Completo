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
