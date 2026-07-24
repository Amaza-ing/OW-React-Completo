import { Navigate, Route, Routes } from "react-router";
import type { AddTaskHandler, Task } from "../features/tasks";
import DashboardPage from "../temp/DashboardPage";
import NotFoundPage from "../temp/NotFoundPage";
import ProjectDetailPage from "../temp/ProjectDetailPage";
import ProjectsPage from "../temp/ProjectsPage";
import TasksPage from "../temp/TasksPage";
import AppLayout from "../shared/components/layout/AppLayout";

type AppRoutesProps = {
  tasks: Task[];
  onAddTask: AddTaskHandler;
};

function AppRoutes({ tasks, onAddTask }: AppRoutesProps) {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage tasks={tasks} />} />

        <Route path="dashboard" element={<Navigate to="/" replace />} />

        <Route path="projects" element={<ProjectsPage />} />

        <Route path="projects/:projectId" element={<ProjectDetailPage />} />

        <Route
          path="tasks"
          element={<TasksPage tasks={tasks} onAddTask={onAddTask} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
