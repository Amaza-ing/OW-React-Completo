import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import AppLayout from "../shared/components/layout/AppLayout";
import { tasks as initialTasks } from "../features/tasks/data/tasks";
import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";
import type { NavigateHandler, ViewName } from "../shared/model/navigation";
import type { AddTaskHandler, Task } from "../features/tasks/model/task";
import { assertNever } from "../shared/utils/assertNever";
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

  function renderPage(view: ViewName): ReactNode {
    switch (view) {
      case "dashboard":
        return <DashboardPage tasks={taskItems} />;

      case "projects":
        return <ProjectsPage />;

      case "tasks":
        return <TasksPage tasks={taskItems} onAddTask={handleAddTask} />;

      default:
        return assertNever(view);
    }
  }

  return (
    <AppLayout activeView={activeView} onNavigate={handleNavigate}>
      {renderPage(activeView)}
    </AppLayout>
  );
}

export default App;
