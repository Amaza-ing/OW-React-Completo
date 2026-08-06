import { showPersistentNotification } from "./showPersistentNotification";

export async function showTaskReminder(openTaskCount: number) {
  if (openTaskCount <= 0) {
    throw new Error("No hay tareas abiertas que recordar.");
  }

  const body =
    openTaskCount === 1
      ? "Tienes 1 tarea abierta en TaskFlow."
      : `Tienes ${openTaskCount} tareas abiertas en TaskFlow.`;

  await showPersistentNotification({
    title: "Recordatorio de TaskFlow",
    body,
    tag: "taskflow-task-reminder",
  });
}
