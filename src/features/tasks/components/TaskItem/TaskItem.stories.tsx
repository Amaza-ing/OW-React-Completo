import type { Meta, StoryObj } from "@storybook/react-vite";
import type { Task } from "../../model/task";
import TaskItem from "./TaskItem";

const task: Task = {
  id: "story-task",
  title: "Preparar propuesta visual",
  projectId: "website-redesign",
  status: "pending",
  priority: "high",
  dueDate: "20 de agosto",
};

const meta = {
  title: "Features/Tasks/TaskItem",
  component: TaskItem,
  args: {
    task,
    projectName: "Rediseño web",
  },
} satisfies Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pending: Story = {};

export const Completed: Story = {
  args: {
    task: {
      ...task,
      status: "completed",
      priority: "low",
    },
  },
};
