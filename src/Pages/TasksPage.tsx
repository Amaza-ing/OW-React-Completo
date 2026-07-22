import ContentPanel from "../components/common/ContentPanel";
import PageHeader from "../components/common/PageHeader";
import TaskItem from "../components/tasks/TaskItem";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";
import { getProjectById } from "../utils/projectUtils";

function TasksPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Tareas"
        title="Todas las tareas"
        description="Consulta las tareas pendientes, en curso y completadas."
        badge={`${tasks.length} tareas`}
      />

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
