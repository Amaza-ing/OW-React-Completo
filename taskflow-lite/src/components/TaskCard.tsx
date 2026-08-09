import { taskStatusLabels, type Task } from "../model/task";

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="task-card">
      <div>
        <p className="task-card__project">{task.project}</p>
        <h2>{task.title}</h2>
      </div>

      <span className="task-card__status" data-status={task.status}>
        {taskStatusLabels[task.status]}
      </span>
    </article>
  );
}

export default TaskCard;
