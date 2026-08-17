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

    cy.dataCy("task-title").type(taskTitle);

    cy.dataCy("task-due-date").type("Viernes");

    cy.dataCy("task-submit").click();

    cy.dataCy("task-item").should("contain.text", taskTitle);

    cy.contains("Tarea añadida correctamente.").should("be.visible");
  });

  it("filtra el listado mediante la búsqueda", () => {
    cy.dataCy("task-item")
      .its("length")
      .then((initialTaskCount) => {
        cy.dataCy("task-search").type("texto-que-no-existe");

        cy.dataCy("task-item").should("not.exist");

        cy.contains("No hay tareas para los filtros seleccionados.").should(
          "be.visible",
        );

        cy.dataCy("task-search").clear();

        cy.dataCy("task-item").should("have.length", initialTaskCount);
      });
  });
});
