import { getProjectById, projects } from "../features/projects";
import { TaskForm, TaskItem, useTasksContext } from "../features/tasks";
import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";

function TasksPage() {
  const { tasks, addTask, resetTasks } = useTasksContext();

  return (
    <div className="page">
      <PageHeader
        eyebrow="Tareas"
        title="Todas las tareas"
        description="Consulta las tareas pendientes, en curso y completadas."
        badge={`${tasks.length} tareas`}
      />

      <ContentPanel
        eyebrow="Nueva tarea"
        title="Añadir una tarea"
        meta="Estado inicial: pendiente"
      >
        <TaskForm projects={projects} onAddTask={addTask} />
      </ContentPanel>

      <ContentPanel
        ariaLabel="Listado de tareas"
        actions={
          <button
            className="page-action page-action--secondary"
            type="button"
            onClick={resetTasks}
          >
            Restablecer tareas
          </button>
        }
      >
        <div className="task-list">
          {tasks.map((task) => {
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
