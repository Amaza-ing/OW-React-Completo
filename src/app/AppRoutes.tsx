import DashboardPage from "@/pages/DashboardPage";
import AppLayout from "@/shared/components/layout/AppLayout";
import { Navigate, Route, Routes } from "react-router";
import {
  NotFoundPage,
  ProjectDetailPage,
  ProjectsPage,
  TasksPage,
} from "./lazyPages";

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
