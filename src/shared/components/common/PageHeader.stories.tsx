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
  argTypes: {
    eyebrow: {
      control: "text",
      description: "Texto breve situado encima del título.",
    },
    title: {
      control: "text",
      description: "Título principal del encabezado.",
    },
    description: {
      control: "text",
      description: "Descripción de la página.",
    },
    badge: {
      control: "text",
      description: "Contenido opcional mostrado a la derecha.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Encabezado reutilizable para las páginas principales de TaskFlow.",
      },
    },
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

export const WithoutBadge: Story = {
  args: {
    badge: "\n",
  },
};
