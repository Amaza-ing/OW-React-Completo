import type { Task } from "../model/task";

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Revisar la propuesta visual",
    projectId: "website-redesign",
    status: "in-progress",
    priority: "high",
    dueDate: "Hoy",
  },
  {
    id: "task-2",
    title: "Preparar los textos de la página principal",
    projectId: "website-redesign",
    status: "pending",
    priority: "medium",
    dueDate: "Mañana",
  },
  {
    id: "task-3",
    title: "Definir las pantallas del prototipo",
    projectId: "mobile-application",
    status: "pending",
    priority: "high",
    dueDate: "Viernes",
  },
  {
    id: "task-4",
    title: "Validar los requisitos con el equipo",
    projectId: "mobile-application",
    status: "completed",
    priority: "medium",
    dueDate: "Completada",
  },
  {
    id: "task-5",
    title: "Documentar las métricas disponibles",
    projectId: "internal-dashboard",
    status: "completed",
    priority: "low",
    dueDate: "Completada",
  },
  {
    id: "task-6",
    title: "Revisar permisos de acceso",
    projectId: "internal-dashboard",
    status: "in-progress",
    priority: "medium",
    dueDate: "Lunes",
  },
];
