/* global describe, it, cy */

import { mount } from "cypress/react";
import TaskItem from "../../src/features/tasks/components/TaskItem/TaskItem";
import type { Task } from "../../src/features/tasks/model/task";

const task: Task = {
  id: "component-task",
  title: "Preparar propuesta visual",
  projectId: "website-redesign",
  status: "pending",
  priority: "high",
  dueDate: "20 de agosto",
};

describe("TaskItem", () => {
  it("muestra los datos de una tarea", () => {
    mount(<TaskItem task={task} projectName="Rediseño web" />);

    cy.get('[data-cy="task-item"]').within(() => {
      cy.contains("Preparar propuesta visual").should("be.visible");

      cy.contains("Rediseño web").should("be.visible");

      cy.contains("Prioridad Alta").should("be.visible");

      cy.contains("Pendiente").should("be.visible");

      cy.contains("20 de agosto").should("be.visible");
    });
  });
});
