import ProjectCard from "../components/projects/ProjectCard";
import TaskItem from "../components/tasks/TaskItem";
import { projects } from "../data/projects";
import { tasks } from "../data/tasks";

function DashboardPage() {
  const activeProjects = projects.filter(
    (project) => project.status === "active",
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "completed",
  ).length;

  const highlightedProjects = projects.slice(0, 2);
  const recentTasks = tasks.slice(0, 3);

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-header__eyebrow">Vista general</p>
          <h1>Resumen de trabajo</h1>
          <p>
            Consulta rápidamente el estado de los proyectos y tareas del equipo.
          </p>
        </div>

        <span className="page-header__badge">Datos simulados</span>
      </header>

      <section className="summary-grid" aria-label="Resumen">
        <article className="summary-card">
          <span>Proyectos totales</span>
          <strong>{projects.length}</strong>
          <p>Proyectos registrados en TaskFlow.</p>
        </article>

        <article className="summary-card">
          <span>Proyectos activos</span>
          <strong>{activeProjects}</strong>
          <p>Proyectos que se encuentran en desarrollo.</p>
        </article>

        <article className="summary-card">
          <span>Tareas pendientes</span>
          <strong>{pendingTasks}</strong>
          <p>Tareas pendientes o actualmente en curso.</p>
        </article>

        <article className="summary-card">
          <span>Tareas completadas</span>
          <strong>{completedTasks}</strong>
          <p>Tareas terminadas dentro de los datos actuales.</p>
        </article>
      </section>

      <section className="content-panel">
        <header className="content-panel__header">
          <div>
            <p className="page-header__eyebrow">Proyectos</p>
            <h2>Proyectos destacados</h2>
          </div>

          <span>{highlightedProjects.length} proyectos</span>
        </header>

        <div className="project-grid project-grid--preview">
          {highlightedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="content-panel">
        <header className="content-panel__header">
          <div>
            <p className="page-header__eyebrow">Actividad</p>
            <h2>Tareas recientes</h2>
          </div>

          <span>{recentTasks.length} tareas</span>
        </header>

        <div className="task-list">
          {recentTasks.map((task) => {
            const project = projects.find(
              (currentProject) => currentProject.id === task.projectId,
            );

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

export default DashboardPage;
