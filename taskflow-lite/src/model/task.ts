export const taskStatusValues = ["TODO", "DOING", "DONE"] as const;

export type TaskStatus = (typeof taskStatusValues)[number];

export interface Task {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
}

export const taskStatusLabels = {
  TODO: "Pendiente",
  DOING: "En progreso",
  DONE: "Completada",
} satisfies Record<TaskStatus, string>;
