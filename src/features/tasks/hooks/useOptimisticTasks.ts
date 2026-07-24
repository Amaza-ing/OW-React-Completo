import { useCallback, useOptimistic } from "react";
import type { AddTaskHandler, Task } from "../model/task";
import { useTasksContext } from "./useTasksContext";

const OPTIMISTIC_TASK_PREFIX = "optimistic-";

function addTaskToStart(currentTasks: Task[], newTask: Task): Task[] {
  return [newTask, ...currentTasks];
}

function simulateTaskSave(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 700);
  });
}

export function useOptimisticTasks() {
  const { tasks, addTask, resetTasks } = useTasksContext();

  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    addTaskToStart,
  );

  const isSavingTask = optimisticTasks.some((task) =>
    task.id.startsWith(OPTIMISTIC_TASK_PREFIX),
  );

  const addTaskOptimistically = useCallback<AddTaskHandler>(
    async (taskData) => {
      const optimisticTask: Task = {
        id: `${OPTIMISTIC_TASK_PREFIX}${Date.now()}`,
        status: "pending",
        ...taskData,
      };

      addOptimisticTask(optimisticTask);

      await simulateTaskSave();
      await addTask(taskData);
    },
    [addOptimisticTask, addTask],
  );

  return {
    tasks: optimisticTasks,
    addTask: addTaskOptimistically,
    resetTasks,
    isSavingTask,
  };
}
