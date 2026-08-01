import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "../pages/DashboardPage";
import AppLayout from "../shared/components/layout/AppLayout";

const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));

const ProjectDetailPage = lazy(() => import("../pages/ProjectDetailPage"));

const TasksPage = lazy(() => import("../pages/TasksPage"));

const NotFoundPage = lazy(() => import("../pages/NotFoundPage"))

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="dashboard" element={<Navigate to="/" replace />} />

        <Route path="projects" element={<ProjectsPage />} />

        <Route path="projects/:projectId" element={<ProjectDetailPage />} />

        <Route path="tasks" element={<TasksPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
