/* global describe, it, cy */

type ProjectTeamResponse = {
  data: {
    project: {
      id: string;
      team: {
        id: string;
        name: string;
        role: string;
      }[];
    };
  };
};

describe("Equipo de proyecto", () => {
  it("muestra el equipo recibido desde GraphQL", () => {
    cy.fixture<ProjectTeamResponse>("project-team").then((response) => {
      cy.intercept("POST", "**/graphql", (request) => {
        if (request.body?.operationName === "GetProjectTeam") {
          request.alias = "getProjectTeam";

          request.reply({
            body: response,
          });
        }
      });
    });

    cy.visit("/projects/website-redesign");

    cy.wait("@getProjectTeam");

    cy.contains("Ana Cypress").should("be.visible");

    cy.contains("QA").should("be.visible");

    cy.contains("Beatriz Test").should("be.visible");

    cy.contains("Frontend").should("be.visible");
  });
});
