import { useMemo, useState } from "react";
import "./App.css";
import TaskCard from "./components/TaskCard";
import { initialTasks } from "./data/tasks";
import {
  taskStatusLabels,
  taskStatusValues,
  type TaskStatus,
} from "./model/task";

type StatusFilter = "ALL" | TaskStatus;

function App() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const visibleTasks = useMemo(() => {
    if (statusFilter === "ALL") {
      return initialTasks;
    }

    return initialTasks.filter((task) => task.status === statusFilter);
  }, [statusFilter]);

  return (
    <main className="taskflow-lite">
      <header className="taskflow-lite__header">
        <div>
          <p className="taskflow-lite__eyebrow">TaskFlow Lite</p>
          <h1>Tareas del equipo</h1>
          <p>Una versión reducida para comparar React y Preact.</p>
        </div>

        <strong>{visibleTasks.length} tareas visibles</strong>
      </header>

      <section className="task-filters" aria-label="Filtrar tareas por estado">
        <button
          type="button"
          className={statusFilter === "ALL" ? "is-active" : ""}
          onClick={() => setStatusFilter("ALL")}
        >
          Todas
        </button>

        {taskStatusValues.map((status) => (
          <button
            key={status}
            type="button"
            className={statusFilter === status ? "is-active" : ""}
            onClick={() => setStatusFilter(status)}
          >
            {taskStatusLabels[status]}
          </button>
        ))}
      </section>

      <section className="task-list">
        {visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </main>
  );
}

export default App;
