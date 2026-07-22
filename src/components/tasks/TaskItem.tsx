import type { Task } from "../../types/task";
import {
  getTaskPriorityLabel,
  getTaskStatusLabel,
} from "../../utils/taskUtils";
import "./TaskItem.css";

type TaskItemProps = {
  task: Task;
  projectName: string;
};

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
            Prioridad {getTaskPriorityLabel(task.priority)}
          </span>
        </div>

        <p>{projectName}</p>
      </div>

      <div className="task-item__meta">
        <span>{getTaskStatusLabel(task.status)}</span>
        <strong>{task.dueDate}</strong>
      </div>
    </article>
  );
}

export default TaskItem;
