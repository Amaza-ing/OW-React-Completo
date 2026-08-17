/* global describe, it, cy */

describe("TaskFlow", () => {
  it("abre la aplicación", () => {
    cy.visit("/");

    cy.location("pathname").should("eq", "/");

    cy.title().should("contain", "taskflow");
  });
});
