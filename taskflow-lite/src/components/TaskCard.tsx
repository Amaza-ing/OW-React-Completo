import { taskStatusLabels, type Task } from "../model/task";

type TaskCardProps = {
  task: Task;
  onToggle: (taskId: string) => void;
};

function TaskCard({ task, onToggle }: TaskCardProps) {
  const isDone = task.status === "DONE";

  return (
    <article className="task-card">
      <div>
        <p className="task-card__project">{task.project}</p>
        <h2>{task.title}</h2>
      </div>

      <div className="task-card__actions">
        <span className="task-card__status" data-status={task.status}>
          {taskStatusLabels[task.status]}
        </span>

        <button type="button" onClick={() => onToggle(task.id)}>
          {isDone ? "Reabrir" : "Completar"}
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
