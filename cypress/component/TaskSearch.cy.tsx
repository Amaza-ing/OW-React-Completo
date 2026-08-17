/* global describe, it, cy */

import { useState } from "react";
import { mount } from "cypress/react";
import TaskSearch from "../../src/features/tasks/components/TaskSearch/TaskSearch";

function TaskSearchExample() {
  const [value, setValue] = useState("");

  return <TaskSearch value={value} onChange={setValue} />;
}

describe("TaskSearch", () => {
  it("actualiza el valor al escribir", () => {
    mount(<TaskSearchExample />);

    cy.get('[data-cy="task-search"]')
      .type("diseño")
      .should("have.value", "diseño");

    cy.get('[data-cy="task-search"]').clear().should("have.value", "");
  });
});
