import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";
import TaskForm from "../features/tasks/components/TaskForm/TaskForm";
import TaskItem from "../features/tasks/components/TaskItem/TaskItem";
import { projects } from "../features/projects/data/projects";
import type { AddTaskHandler, Task } from "../features/tasks/model/task";
import { getProjectById } from "../features/projects";

type TasksPageProps = {
  tasks: Task[];
  onAddTask: AddTaskHandler;
};

function TasksPage({ tasks, onAddTask }: TasksPageProps) {
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
        <TaskForm projects={projects} onAddTask={onAddTask} />
      </ContentPanel>

      <ContentPanel ariaLabel="Listado de tareas">
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
