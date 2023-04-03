import "cypress-localstorage-commands";

import todos from "../fixtures/todos.json";

describe("Home", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.viewport(1440, 700);
  });

  it("should navigate to the Home page", () => {
    cy.visit("http://localhost:3000/");

    cy.get(`div[data-test-tag="AddTodo"] h1`).contains("todo list");
    cy.get(`div[data-test-tag="TodoList-Message"]`).contains(
      "List is empty, ready to add new items"
    );
  });

  it("should add a todo", () => {
    cy.visit("http://localhost:3000/");

    cy.get(`button[data-test-tag="AddTodo-NewTask"]`).click();
    cy.get(`form[data-test-tag="AddTodo-Form"] input`).type(
      "My Dynamic Todo Title"
    );
    cy.get(`form[data-test-tag="AddTodo-Form"] textarea`).type(
      "My Dynamic Todo Description"
    );
    cy.get(`form[data-test-tag="AddTodo-Form"] button`).click();
    cy.get(`div[data-test-tag="TodoList"] >ul >li`).contains(
      "My Dynamic Todo Title"
    );
  });

  it("should mark a todo done", () => {
    const bucket = "227959d4-852d-47d4-9ec9-a487fa21642f";
    const todoId = todos[bucket][0].id;

    cy.setLocalStorage("token", bucket);
    cy.visit("http://localhost:3000/");

    cy.get(`button[data-test-tag="ListItem-${todoId}-Done"]`).click();
    cy.get(
      `li[data-test-tag="ListItem-${todoId}"][data-cy="isDone-true"]`
    ).contains(todos[bucket][0].title);
  });

  it("should delete a todo", () => {
    const bucket = "6a04f76d-b2b7-45c1-b83d-7fa8852d72bf";
    const todoId = todos[bucket][0].id;

    cy.setLocalStorage("token", bucket);
    cy.visit("http://localhost:3000/");

    cy.get(`button[data-test-tag="ListItem-${todoId}-Delete"]`).click();
    cy.get(`li[data-test-tag="ListItem-${todoId}"]`).not();
  });

  it("should search for a todo item, empty results", () => {
    const bucket = "f1509e28-f292-4eb8-ba07-386fc3bb74d3";

    cy.setLocalStorage("token", bucket);
    cy.visit("http://localhost:3000/");

    cy.get(`input[data-test-tag="SearchTodo-Field"]`).type("Meeting");
    cy.get(`div[data-test-tag="TodoList-Message"]`).contains(
      "No results found"
    );
  });

  it("should search for a todo item, single result", () => {
    const bucket = "f1509e28-f292-4eb8-ba07-386fc3bb74d3";

    cy.setLocalStorage("token", bucket);
    cy.visit("http://localhost:3000/");

    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 3);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/3 completed"
    );

    cy.get(`input[data-test-tag="SearchTodo-Field"]`).type("002");

    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 1);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/1 completed"
    );
  });

  it("should search for a todo item, multiple results", () => {
    const bucket = "f1509e28-f292-4eb8-ba07-386fc3bb74d3";

    cy.setLocalStorage("token", bucket);
    cy.visit("http://localhost:3000/");

    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 3);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/3 completed"
    );

    cy.get(`input[data-test-tag="SearchTodo-Field"]`).type("T");
    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 2);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/2 completed"
    );
  });

  it("should navigate away from Home, to detail page", () => {
    const bucket = "6ac64af5-d98a-46a7-9841-c0baa59fd1d3";
    const todoId = todos[bucket][0].id;

    cy.setLocalStorage("token", bucket);
    cy.visit("http://localhost:3000/");

    cy.get(`a[data-test-tag="ListItem-${todoId}-Link"]`).click();
    cy.url().should("include", `/todo/${todoId}`);
  });
});
