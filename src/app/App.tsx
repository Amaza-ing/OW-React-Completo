import { useCallback, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import {
  tasks as initialTasks,
  type AddTaskHandler,
  type Task,
} from "../features/tasks";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";
import AppLayout from "../shared/components/layout/AppLayout";
import "./App.css";

function App() {
  const [taskItems, setTaskItems] = useState<Task[]>(initialTasks);

  const handleAddTask = useCallback<AddTaskHandler>((taskData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      status: "pending",
      ...taskData,
    };

    setTaskItems((currentTasks) => [newTask, ...currentTasks]);
  }, []);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage tasks={taskItems} />} />

        <Route path="dashboard" element={<Navigate to="/" replace />} />

        <Route path="projects" element={<ProjectsPage />} />

        <Route path="projects/:projectId" element={<ProjectDetailPage />} />

        <Route
          path="tasks"
          element={<TasksPage tasks={taskItems} onAddTask={handleAddTask} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
