export { default as ProjectCard } from "./components/ProjectCard/ProjectCard";
export { projects } from "./data/projects";

export type { Project, ProjectStatus } from "./model/project";

export {
  getProjectById,
  getProjectStatusLabel,
  getProjectSummary,
} from "./utils/projectUtils";
