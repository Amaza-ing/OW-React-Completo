import { useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import type { ViewName } from "./types/navigation";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState<ViewName>("dashboard");

  function handleNavigate(view: ViewName) {
    setActiveView(view);
  }

  function renderPage() {
    switch (activeView) {
      case "dashboard":
        return <DashboardPage />;
      case "projects":
        return <ProjectsPage />;
      case "tasks":
        return <TasksPage />;
    }
  }

  return (
    <AppLayout activeView={activeView} onNavigate={handleNavigate}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;
