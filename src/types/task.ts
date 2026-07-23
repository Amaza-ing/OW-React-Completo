export const taskStatusOptions = [
  {
    value: "pending",
    label: "Pendiente",
  },
  {
    value: "in-progress",
    label: "En curso",
  },
  {
    value: "completed",
    label: "Completada",
  },
] as const satisfies readonly {
  value: string;
  label: string;
}[];

export const taskPriorityOptions = [
  {
    value: "low",
    label: "Baja",
  },
  {
    value: "medium",
    label: "Media",
  },
  {
    value: "high",
    label: "Alta",
  },
] as const satisfies readonly {
  value: string;
  label: string;
}[];

export type TaskStatusOption = (typeof taskStatusOptions)[number];
export type TaskStatus = TaskStatusOption["value"];

export type TaskPriorityOption = (typeof taskPriorityOptions)[number];
export type TaskPriority = TaskPriorityOption["value"];

export interface NewTask {
  title: string;
  projectId: string;
  priority: TaskPriority;
  dueDate: string;
}

export interface Task extends NewTask {
  id: string;
  status: TaskStatus;
}

export type AddTaskHandler = (task: NewTask) => void;

export type TaskFormFeedback =
  | {
      type: "idle";
    }
  | {
      type: "error";
      message: string;
    }
  | {
      type: "success";
      message: string;
    };

export function isTaskPriority(value: string): value is TaskPriority {
  return taskPriorityOptions.some((option) => option.value === value);
}
