import {
  taskPriorityOptions,
  taskStatusOptions,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "../model/task";
import { getOptionLabel } from "../../../shared/utils/optionUtils";

export interface TaskSummary {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export function getTaskStatusLabel(status: TaskStatus): string {
  return getOptionLabel(taskStatusOptions, status);
}

export function getTaskPriorityLabel(priority: TaskPriority): string {
  return getOptionLabel(taskPriorityOptions, priority);
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
