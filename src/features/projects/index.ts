export { default as ProjectCard } from "./components/ProjectCard/ProjectCard";
export { default as ProjectList } from "./components/ProjectList/ProjectList";
export { default as ProjectResults } from "./components/ProjectResults/ProjectResults";
export { projects } from "./data/projects";

export type { Project, ProjectStatus } from "./model/project";

export {
  getProjectById,
  getProjectStatusLabel,
  getProjectSummary,
} from "./utils/projectUtils";
