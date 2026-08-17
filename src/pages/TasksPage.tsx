import {
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
} from "react";
import type { ChangeEventHandler } from "react";
import { projects } from "../features/projects";
import {
  TaskForm,
  TaskItem,
  TaskSearch,
  useOptimisticTasks,
  type TaskStatus,
} from "../features/tasks";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";
import "./TasksPage.css";

type TaskStatusFilter = "all" | TaskStatus;

const taskStatusFilterOptions = [
  {
    value: "all",
    label: "Todas",
  },
  {
    value: "pending",
    label: "Pendientes",
  },
  {
    value: "in-progress",
    label: "En curso",
  },
  {
    value: "completed",
    label: "Completadas",
  },
] as const satisfies readonly {
  value: TaskStatusFilter;
  label: string;
}[];

function isTaskStatusFilter(value: string): value is TaskStatusFilter {
  return taskStatusFilterOptions.some((option) => option.value === value);
}

function TasksPage() {
  const { tasks, addTask, resetTasks, isSavingTask } = useOptimisticTasks();

  const [search, setSearch] = useState("");

  const deferredSearch = useDeferredValue(search);

  const isSearchPending = search !== deferredSearch;

  const [selectedStatus, setSelectedStatus] = useState<TaskStatusFilter>("all");

  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>("all");

  const [isStatusPending, startTransition] = useTransition();

  const projectNamesById = useMemo(
    () => new Map(projects.map((project) => [project.id, project.name])),
    [],
  );

  const visibleTasks = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch === "" ||
        task.title.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, deferredSearch, statusFilter]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleStatusChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      const nextStatus = event.currentTarget.value;

      if (!isTaskStatusFilter(nextStatus)) {
        return;
      }

      setSelectedStatus(nextStatus);

      startTransition(() => {
        setStatusFilter(nextStatus);
      });
    },
    [],
  );

  const isUpdatingResults = isStatusPending || isSearchPending;

  const hasNoVisibleTasks = visibleTasks.length === 0;

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
        eyebrow="Filtros"
        title="Buscar y filtrar tareas"
        meta="La entrada permanece inmediata aunque el listado tarde más en actualizarse"
      >
        <div className="tasks-page__controls">
          <TaskSearch value={search} onChange={handleSearchChange} />

          <label>
            <span>Estado</span>

            <select value={selectedStatus} onChange={handleStatusChange}>
              {taskStatusFilterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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

        {isUpdatingResults && (
          <p className="tasks-page__status" role="status">
            Actualizando los resultados...
          </p>
        )}

        <div className="tasks-page__results" aria-busy={isUpdatingResults}>
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

          <div
            className="tasks-page__empty"
            data-visible={hasNoVisibleTasks}
            aria-hidden={!hasNoVisibleTasks}
            role="status"
          >
            <div>
              <p>No hay tareas para los filtros seleccionados.</p>
            </div>
          </div>
        </div>
      </ContentPanel>
    </div>
  );
}

export default TasksPage;
