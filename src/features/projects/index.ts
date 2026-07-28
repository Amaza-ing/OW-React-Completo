export { completeProject, getProjects } from "./api/projectsApi";
export { default as ProjectCard } from "./components/ProjectCard/ProjectCard";
export { default as ProjectList } from "./components/ProjectList/ProjectList";
export { default as ProjectResults } from "./components/ProjectResults/ProjectResults";
export { projects } from "./data/projects";
export { GET_PROJECTS_QUERY } from "./graphql/projectsOperations";
export { useCompleteProjectMutation } from "./hooks/useCompleteProjectMutation";
export { useProjectSearch } from "./hooks/useProjectSearch";

export {
  projectQueryKeys,
  projectsQueryOptions,
  useProjectQuery,
  useProjectsQuery,
} from "./hooks/useProjectsQuery";

export type { Project, ProjectStatus } from "./model/project";

export {
  getProjectById,
  getProjectStatusLabel,
  getProjectSummary,
} from "./utils/projectUtils";
