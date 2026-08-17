/* global describe, it, beforeEach, cy */

describe("Gestión de tareas", () => {
  beforeEach(() => {
    cy.visit("/tasks");
  });

  it("abre la página desde la navegación principal", () => {
    cy.visit("/");

    cy.contains("a", "Tareas").click();

    cy.location("pathname").should("eq", "/tasks");

    cy.contains("h1", "Todas las tareas").should("be.visible");
  });

  it("añade una nueva tarea", () => {
    const taskTitle = "Revisar pruebas Cypress";

    cy.get('[data-cy="task-title"]').type(taskTitle);

    cy.get('[data-cy="task-due-date"]').type("Viernes");

    cy.get('[data-cy="task-submit"]').click();

    cy.contains('[data-cy="task-item"]', taskTitle).should("be.visible");

    cy.contains("Tarea añadida correctamente.").should("be.visible");
  });

  it("filtra el listado mediante la búsqueda", () => {
    cy.get('[data-cy="task-item"]')
      .its("length")
      .then((initialTaskCount) => {
        cy.get('[data-cy="task-search"]').type("texto-que-no-existe");

        cy.get('[data-cy="task-item"]').should("not.exist");

        cy.contains("No hay tareas para los filtros seleccionados.").should(
          "be.visible",
        );

        cy.get('[data-cy="task-search"]').clear();

        cy.get('[data-cy="task-item"]').should("have.length", initialTaskCount);
      });
  });
});
