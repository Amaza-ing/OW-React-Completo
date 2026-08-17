import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Task } from "../../model/task";
import TaskItem from "./TaskItem";

const baseTask: Task = {
  id: "story-task",
  title: "Preparar propuesta visual",
  projectId: "website-redesign",
  status: "pending",
  priority: "high",
  dueDate: "20 de agosto",
};

function createTask(changes: Partial<Task>): Task {
  return {
    ...baseTask,
    ...changes,
  };
}

const meta = {
  title: "Features/Tasks/TaskItem",
  component: TaskItem,
  args: {
    task: baseTask,
    projectName: "Rediseño web",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Representación visual de una tarea con estado, prioridad, proyecto y fecha objetivo.",
      },
    },
  },
} satisfies Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PendingHighPriority: Story = {};

export const InProgressMediumPriority: Story = {
  args: {
    task: createTask({
      status: "in-progress",
      priority: "medium",
    }),
  },
};

export const CompletedLowPriority: Story = {
  args: {
    task: createTask({
      status: "completed",
      priority: "low",
    }),
  },
};

export const LongTitle: Story = {
  args: {
    task: createTask({
      title:
        "Preparar la documentación completa de componentes reutilizables para la revisión de diseño del próximo sprint",
    }),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comprueba que un título mucho más largo que los datos habituales continúa adaptándose al espacio disponible.",
      },
    },
  },
};

export const UnknownProject: Story = {
  args: {
    projectName: "Proyecto sin identificar",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Representa el fallback que TaskFlow utiliza cuando no puede resolver el nombre del proyecto.",
      },
    },
  },
};
