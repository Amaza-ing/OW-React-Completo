import type { Meta, StoryObj } from "@storybook/react-vite";
import PageHeader from "./PageHeader";

const meta = {
  title: "Shared/PageHeader",
  component: PageHeader,
  args: {
    eyebrow: "Vista general",
    title: "Resumen de trabajo",
    description:
      "Consulta rápidamente el estado de los proyectos y tareas del equipo.",
    badge: "Datos simulados",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};

export const Projects: Story = {
  args: {
    eyebrow: "Proyectos",
    title: "Todos los proyectos",
    description:
      "Revisa el estado, el progreso y la fecha objetivo de cada proyecto.",
    badge: "3 proyectos",
  },
};
