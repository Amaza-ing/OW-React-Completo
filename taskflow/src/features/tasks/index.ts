export { default as TaskForm } from "./components/TaskForm/TaskForm";
export { default as TaskItem } from "./components/TaskItem/TaskItem";
export { default as TaskSearch } from "./components/TaskSearch/TaskSearch";

export { TasksProvider } from "./context/TasksProvider";

export { tasks } from "./data/tasks";

export { useOptimisticTasks } from "./hooks/useOptimisticTasks";

export { useTasks } from "./hooks/useTasks";

export { useTasksContext } from "./hooks/useTasksContext";

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
