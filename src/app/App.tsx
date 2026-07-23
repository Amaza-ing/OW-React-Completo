import { useCallback, useState } from "react";
import { Route, Routes } from "react-router";
import {
  tasks as initialTasks,
  type AddTaskHandler,
  type Task,
} from "../features/tasks";
import DashboardPage from "../pages/DashboardPage";
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

        <Route path="projects" element={<ProjectsPage />} />

        <Route
          path="tasks"
          element={<TasksPage tasks={taskItems} onAddTask={handleAddTask} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
