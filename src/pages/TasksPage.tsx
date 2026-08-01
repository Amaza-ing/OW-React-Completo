import { Profiler, useState } from "react";
import type { ChangeEventHandler, ProfilerOnRenderCallback } from "react";
import { getProjectById, projects } from "../features/projects";
import { TaskForm, TaskItem, useOptimisticTasks } from "../features/tasks";
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

  const normalizedSearch = search.trim().toLowerCase();

  const visibleTasks =
    normalizedSearch === ""
      ? tasks
      : tasks.filter((task) =>
          task.title.toLowerCase().includes(normalizedSearch),
        );

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
  };

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
        eyebrow="Medición"
        title="Buscar y medir el listado"
        meta="Observa cada actualización desde React DevTools o la consola"
      >
        <div className="tasks-page__controls">
          <label>
            <span>Buscar por título</span>

            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Ej. diseño"
            />
          </label>
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
            {visibleTasks.map((task) => {
              const project = getProjectById(projects, task.projectId);

              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  projectName={project?.name ?? "Proyecto sin identificar"}
                />
              );
            })}
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
