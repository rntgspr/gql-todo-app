import "cypress-localstorage-commands";

import todos from "../fixtures/todos.json";

describe("Details", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport(1440, 700);
  });

  it("should navigate to the Details page", () => {
    const bucket = "6ac64af5-d98a-46a7-9841-c0baa59fd1d3";
    const todoId = todos[bucket][0].id;

    cy.setLocalStorage("token", bucket);
    cy.visit(`http://localhost:3000/todo/${todoId}`);

    cy.get(`h1[data-test-tag="Details-Title"]`).contains(
      todos[bucket][0].title
    );
    cy.get(`div[data-test-tag="Details-Description"]`).contains(
      todos[bucket][0].description
    );
  });

  it("should navigate back to Home", () => {
    const bucket = "6ac64af5-d98a-46a7-9841-c0baa59fd1d3";
    const todoId = todos[bucket][0].id;

    cy.setLocalStorage("token", bucket);
    cy.visit(`http://localhost:3000/todo/${todoId}`);

    cy.get(`a[data-test-tag="Details-Back"]`).click();
  });
});
