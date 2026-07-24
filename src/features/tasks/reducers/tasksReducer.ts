import type { Task } from "../model/task";

type TasksAction =
  | {
      type: "task/added";
      payload: Task;
    }
  | {
      type: "tasks/reset";
      payload: Task[];
    };

export function tasksReducer(state: Task[], action: TasksAction): Task[] {
  switch (action.type) {
    case "task/added":
      return [action.payload, ...state];

    case "tasks/reset":
      return action.payload;

    default:
      return state;
  }
}
