export { default as TaskForm } from "./components/TaskForm/TaskForm";
export { default as TaskItem } from "./components/TaskItem/TaskItem";
export { tasks } from "./data/tasks";
export { useTasks } from "./hooks/useTasks";

export type {
  AddTaskHandler,
  NewTask,
  Task,
  TaskFormFeedback,
  TaskPriority,
  TaskStatus,
} from "./model/task";

export {
  getTaskPriorityLabel,
  getTaskStatusLabel,
  getTaskSummary,
} from "./utils/taskUtils";
