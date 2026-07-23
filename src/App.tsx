import { useCallback, useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import { tasks as initialTasks } from "./data/tasks";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import type { NavigateHandler, ViewName } from "./types/navigation";
import type { AddTaskHandler, Task } from "./types/task";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState<ViewName>("dashboard");

  const [taskItems, setTaskItems] = useState<Task[]>(initialTasks);

  const handleNavigate = useCallback<NavigateHandler>((view) => {
    setActiveView(view);
  }, []);

  const handleAddTask = useCallback<AddTaskHandler>((taskData) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      status: "pending",
      ...taskData,
    };

    setTaskItems((currentTasks) => [newTask, ...currentTasks]);
  }, []);

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
