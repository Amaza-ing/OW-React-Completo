import { Navigate, Route, Routes } from "react-router";
import { TasksProvider } from "../features/tasks";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";
import AppLayout from "../shared/components/layout/AppLayout";

function AppRoutes() {
  return (
    <TasksProvider>
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
    </TasksProvider>
  );
}

export default AppRoutes;
