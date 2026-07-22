import TaskItem from "../components/tasks/TaskItem";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";
import { getProjectById } from "../utils/projectUtils";

function TasksPage() {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Tareas</p>
          <h1>Todas las tareas</h1>
          <p>Consulta las tareas pendientes, en curso y completadas.</p>
        </div>

        <span className="page-header__badge">{tasks.length} tareas</span>
      </header>

      <section className="content-panel" aria-label="Listado de tareas">
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
      </section>
    </div>
  );
}

export default TasksPage;
