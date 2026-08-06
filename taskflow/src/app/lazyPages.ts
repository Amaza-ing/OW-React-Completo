import { lazy } from "react";

export const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));

export const ProjectDetailPage = lazy(
  () => import("../pages/ProjectDetailPage"),
);

export const TasksPage = lazy(() => import("../pages/TasksPage"));

export const ArchitecturePage = lazy(() => import("../pages/ArchitecturePage"));

export const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
