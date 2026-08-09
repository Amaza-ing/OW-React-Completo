import { useComputed, useSignal } from "@preact/signals";
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
  const statusFilter = useSignal<StatusFilter>("ALL");

  const tasks = useSignal([...initialTasks]);

  const visibleTasks = useComputed(() => {
    if (statusFilter.value === "ALL") {
      return tasks.value;
    }

    return tasks.value.filter((task) => task.status === statusFilter.value);
  });

  const completedTasks = useComputed(
    () => tasks.value.filter((task) => task.status === "DONE").length,
  );

  const toggleTask = (taskId: string) => {
    tasks.value = tasks.value.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      return {
        ...task,
        status: task.status === "DONE" ? "TODO" : "DONE",
      };
    });
  };

  return (
    <main className="taskflow-lite">
      <header className="taskflow-lite__header">
        <div>
          <p className="taskflow-lite__eyebrow">
            TaskFlow Lite · Preact Signals
          </p>
          <h1>Tareas del equipo</h1>
          <p>Estado reactivo y valores derivados con Signals.</p>
        </div>

        <div className="taskflow-lite__metrics">
          <strong>{visibleTasks.value.length} visibles</strong>
          <strong>{completedTasks.value} completadas</strong>
        </div>
      </header>

      <section className="task-filters" aria-label="Filtrar tareas por estado">
        <button
          type="button"
          className={statusFilter.value === "ALL" ? "is-active" : ""}
          onClick={() => {
            statusFilter.value = "ALL";
          }}
        >
          Todas
        </button>

        {taskStatusValues.map((status) => (
          <button
            key={status}
            type="button"
            className={statusFilter.value === status ? "is-active" : ""}
            onClick={() => {
              statusFilter.value = status;
            }}
          >
            {taskStatusLabels[status]}
          </button>
        ))}
      </section>

      <section className="task-list">
        {visibleTasks.value.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </section>
    </main>
  );
}

export default App;
