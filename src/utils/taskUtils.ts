import type { Task, TaskPriority, TaskStatus } from "../types/task";
import { assertNever } from "./assertNever";

export interface TaskSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export function getTaskStatusLabel(status: TaskStatus): string {
  switch (status) {
    case "pending":
      return "Pendiente";

    case "in-progress":
      return "En curso";

    case "completed":
      return "Completada";

    default:
      return assertNever(status);
  }
}

export function getTaskPriorityLabel(priority: TaskPriority): string {
  switch (priority) {
    case "low":
      return "Baja";

    case "medium":
      return "Media";

    case "high":
      return "Alta";

    default:
      return assertNever(priority);
  }
}

export function getTaskSummary(tasks: Task[]): TaskSummary {
  const pending = tasks.filter((task) => task.status === "pending").length;

  const inProgress = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const completed = tasks.filter((task) => task.status === "completed").length;

  return {
    total: tasks.length,
    pending,
    inProgress,
    completed,
  };
}
