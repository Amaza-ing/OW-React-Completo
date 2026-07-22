import type { Task, TaskPriority, TaskStatus } from "../../types/task";
import "./TaskItem.css";

type TaskItemProps = {
  task: Task;
  projectName: string;
};

function getStatusLabel(status: TaskStatus) {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "in-progress":
      return "En curso";
    case "completed":
      return "Completada";
  }
}

function getPriorityLabel(priority: TaskPriority) {
  switch (priority) {
    case "low":
      return "Baja";
    case "medium":
      return "Media";
    case "high":
      return "Alta";
  }
}

function TaskItem({ task, projectName }: TaskItemProps) {
  return (
    <article className="task-item">
      <span
        className={`task-item__indicator task-item__indicator--${task.status}`}
        aria-hidden="true"
      />

      <div className="task-item__content">
        <div className="task-item__heading">
          <h3>{task.title}</h3>

          <span
            className={`task-item__priority task-item__priority--${task.priority}`}
          >
            Prioridad {getPriorityLabel(task.priority)}
          </span>
        </div>

        <p>{projectName}</p>
      </div>

      <div className="task-item__meta">
        <span>{getStatusLabel(task.status)}</span>
        <strong>{task.dueDate}</strong>
      </div>
    </article>
  );
}

export default TaskItem;
