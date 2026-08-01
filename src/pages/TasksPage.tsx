import { Profiler, useCallback, useMemo, useState } from "react";
import type { ProfilerOnRenderCallback } from "react";
import { projects } from "../features/projects";
import {
  TaskForm,
  TaskItem,
  TaskSearch,
  useOptimisticTasks,
} from "../features/tasks";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";
import "./TasksPage.css";

const handleTaskListRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
) => {
  console.table({
    id,
    phase,
    actualDuration: Number(actualDuration.toFixed(2)),
    baseDuration: Number(baseDuration.toFixed(2)),
  });
};

function TasksPage() {
  const { tasks, addTask, resetTasks, isSavingTask } = useOptimisticTasks();

  const [search, setSearch] = useState("");

  const projectNamesById = useMemo(
    () => new Map(projects.map((project) => [project.id, project.name])),
    [],
  );

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch === "") {
      return tasks;
    }

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(normalizedSearch),
    );
  }, [tasks, search]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  return (
    <div className="page tasks-page">
      <title>{`TaskFlow | ${tasks.length} tareas`}</title>

      <meta
        name="description"
        content="Gestiona y consulta las tareas de TaskFlow."
      />

      <PageHeader
        eyebrow="Tareas"
        title="Todas las tareas"
        description="Consulta las tareas pendientes, en curso y completadas."
        badge={`${visibleTasks.length} tareas`}
      />

      <ContentPanel
        eyebrow="Nueva tarea"
        title="Añadir una tarea"
        meta="Estado inicial: pendiente"
      >
        <TaskForm projects={projects} onAddTask={addTask} />
      </ContentPanel>

      <ContentPanel
        eyebrow="Rendimiento"
        title="Buscar tareas"
        meta="El listado conserva únicamente las optimizaciones justificadas por la medición"
      >
        <div className="tasks-page__controls">
          <TaskSearch value={search} onChange={handleSearchChange} />
        </div>
      </ContentPanel>

      <ContentPanel
        ariaLabel="Listado de tareas"
        actions={
          <button
            className="page-action page-action--secondary"
            type="button"
            onClick={resetTasks}
            disabled={isSavingTask}
          >
            Restablecer tareas
          </button>
        }
      >
        {isSavingTask && <p role="status">Guardando la nueva tarea...</p>}

        <Profiler id="TaskList" onRender={handleTaskListRender}>
          <div className="task-list">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                projectName={
                  projectNamesById.get(task.projectId) ??
                  "Proyecto sin identificar"
                }
              />
            ))}
          </div>
        </Profiler>

        {visibleTasks.length === 0 && (
          <p>No hay tareas que coincidan con la búsqueda.</p>
        )}
      </ContentPanel>
    </div>
  );
}

export default TasksPage;
