import type { Project } from "../model/project";

export const projects: Project[] = [
  {
    id: "website-redesign",
    name: "Rediseño web",
    description:
      "Actualización de la web corporativa y mejora de la experiencia de usuario.",
    status: "active",
    progress: 72,
    dueDate: "15 de agosto",
    members: 4,
  },
  {
    id: "mobile-application",
    name: "Aplicación móvil",
    description:
      "Preparación del prototipo inicial para la aplicación de clientes.",
    status: "planning",
    progress: 24,
    dueDate: "30 de septiembre",
    members: 3,
  },
  {
    id: "internal-dashboard",
    name: "Panel interno",
    description:
      "Centralización de métricas y herramientas para el equipo de operaciones.",
    status: "completed",
    progress: 100,
    dueDate: "20 de junio",
    members: 5,
  },
];
