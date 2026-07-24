export { default as TaskForm } from "./components/TaskForm/TaskForm";
export { default as TaskItem } from "./components/TaskItem/TaskItem";

export { TasksProvider, useTasksContext } from "./context/TasksContext";

export { tasks } from "./data/tasks";
export { useTasks } from "./hooks/useTasks";

export type {
  AddTaskHandler,
  NewTask,
  ResetTasksHandler,
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
