import ContentPanel from "../shared/components/common/ContentPanel";
import PageHeader from "../shared/components/common/PageHeader";
import SummaryCard from "../shared/components/common/SummaryCard";
import ProjectCard from "../features/projects/components/ProjectCard/ProjectCard";
import TaskItem from "../features/tasks/components/TaskItem/TaskItem";
import { projects } from "../features/projects/data/projects";
import type { Task } from "../features/tasks/model/task";
import { getProjectById, getProjectSummary } from "../features/projects/utils/projectUtils";
import { getTaskSummary } from "../features/tasks/utils/taskUtils";

type DashboardPageProps = {
  tasks: Task[];
};

function DashboardPage({ tasks }: DashboardPageProps) {
  const projectSummary = getProjectSummary(projects);
  const taskSummary = getTaskSummary(tasks);

  const highlightedProjects = projects.slice(0, 2);
  const recentTasks = tasks.slice(0, 3);

  return (
    <div className="page">
      <PageHeader
        eyebrow="Vista general"
        title="Resumen de trabajo"
        description="Consulta rápidamente el estado de los proyectos y tareas del equipo."
        badge="Datos simulados"
      />

      <section className="summary-grid" aria-label="Resumen">
        <SummaryCard label="Proyectos totales" value={projectSummary.total}>
          <p>Proyectos registrados en TaskFlow.</p>
        </SummaryCard>

        <SummaryCard label="Proyectos activos" value={projectSummary.active}>
          <p>Progreso medio: {projectSummary.averageProgress}%.</p>
        </SummaryCard>

        <SummaryCard label="Tareas pendientes" value={taskSummary.pending}>
          <p>{taskSummary.inProgress} tareas se encuentran en curso.</p>
        </SummaryCard>

        <SummaryCard label="Tareas completadas" value={taskSummary.completed}>
          <p>De un total de {taskSummary.total} tareas registradas.</p>
        </SummaryCard>
      </section>

      <ContentPanel
        eyebrow="Proyectos"
        title="Proyectos destacados"
        meta={`${highlightedProjects.length} proyectos`}
      >
        <div className="project-grid project-grid--preview">
          {highlightedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </ContentPanel>

      <ContentPanel
        eyebrow="Actividad"
        title="Tareas recientes"
        meta={`${recentTasks.length} tareas`}
      >
        <div className="task-list">
          {recentTasks.map((task) => {
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

export default DashboardPage;
