const SERVICE_WORKER_VERSION = "taskflow-service-worker-v1";

self.addEventListener("install", () => {
  console.info(`[TaskFlow] Instalando ${SERVICE_WORKER_VERSION}`);
});

self.addEventListener("activate", () => {
  console.info(`[TaskFlow] Activando ${SERVICE_WORKER_VERSION}`);
});
