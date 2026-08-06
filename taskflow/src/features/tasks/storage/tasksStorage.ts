import type { Task } from "../model/task";

const TASKS_STORAGE_KEY = "taskflow.tasks";

export function loadTasks(defaultTasks: Task[]): Task[] {
  try {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);

    if (storedTasks === null) {
      return defaultTasks;
    }

    const parsedTasks: unknown = JSON.parse(storedTasks);

    if (!Array.isArray(parsedTasks)) {
      return defaultTasks;
    }

    return parsedTasks as Task[];
  } catch {
    return defaultTasks;
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // La aplicación puede seguir funcionando
    // con el estado disponible en memoria.
  }
}
