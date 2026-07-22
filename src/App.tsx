import { useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import { tasks as initialTasks } from "./data/tasks";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import type { ViewName } from "./types/navigation";
import type { NewTask, Task } from "./types/task";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState<ViewName>("dashboard");

  const [taskItems, setTaskItems] = useState<Task[]>(initialTasks);

  function handleNavigate(view: ViewName) {
    setActiveView(view);
  }

  function handleAddTask(taskData: NewTask) {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      status: "pending",
      ...taskData,
    };

    setTaskItems((currentTasks) => [newTask, ...currentTasks]);
  }

  function renderPage() {
    switch (activeView) {
      case "dashboard":
        return <DashboardPage tasks={taskItems} />;

      case "projects":
        return <ProjectsPage />;

      case "tasks":
        return <TasksPage tasks={taskItems} onAddTask={handleAddTask} />;
    }
  }

  return (
    <AppLayout activeView={activeView} onNavigate={handleNavigate}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;
