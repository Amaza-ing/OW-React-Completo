export type TaskStatus = "pending" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  projectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

export type NewTask = {
  title: string;
  projectId: string;
  priority: TaskPriority;
  dueDate: string;
};

export type AddTaskHandler = (task: NewTask) => void;
