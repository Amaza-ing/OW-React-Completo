import { useCallback, useOptimistic } from "react";
import { getProjectById, projects } from "../features/projects";
import {
  TaskForm,
  TaskItem,
  useTasksContext,
  type AddTaskHandler,
  type NewTask,
  type Task,
} from "../features/tasks";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

function simulateTaskSave(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 700);
  });
}

function TasksPage() {
  const { tasks, addTask, resetTasks } = useTasksContext();

  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (currentTasks, optimisticTask: Task): Task[] => [
      optimisticTask,
      ...currentTasks,
    ],
  );

  const isSavingTask = optimisticTasks !== tasks;

  const handleAddTask = useCallback<AddTaskHandler>(
    async (taskData: NewTask) => {
      const optimisticTask: Task = {
        id: `optimistic-${Date.now()}`,
        status: "pending",
        ...taskData,
      };

      addOptimisticTask(optimisticTask);

      await simulateTaskSave();

      addTask(taskData);
    },
    [addOptimisticTask, addTask],
  );

  return (
    <div className="page">
      <title>{`TaskFlow | ${optimisticTasks.length} tareas`}</title>

      <meta
        name="description"
        content="Gestiona y consulta las tareas de TaskFlow."
      />

      <PageHeader
        eyebrow="Tareas"
        title="Todas las tareas"
        description="Consulta las tareas pendientes, en curso y completadas."
        badge={`${optimisticTasks.length} tareas`}
      />

      <ContentPanel
        eyebrow="Nueva tarea"
        title="Añadir una tarea"
        meta="Estado inicial: pendiente"
      >
        <TaskForm projects={projects} onAddTask={handleAddTask} />
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

        <div className="task-list">
          {optimisticTasks.map((task) => {
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
      </ContentPanel>
    </div>
  );
}

export default TasksPage;
