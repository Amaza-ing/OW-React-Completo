import type { Task } from "../model/task";

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Preparar propuesta visual",
    project: "Rediseño web",
    status: "DOING",
  },
  {
    id: "task-2",
    title: "Revisar métricas del sprint",
    project: "Panel interno",
    status: "TODO",
  },
  {
    id: "task-3",
    title: "Publicar documentación",
    project: "Design system",
    status: "DONE",
  },
  {
    id: "task-4",
    title: "Validar flujo de registro",
    project: "Onboarding",
    status: "TODO",
  },
];
