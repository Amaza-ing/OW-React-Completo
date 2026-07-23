export const taskStatuses = ["pending", "in-progress", "completed"] as const;

export const taskPriorities = ["low", "medium", "high"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export type TaskPriority = (typeof taskPriorities)[number];

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
