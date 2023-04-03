import "cypress-localstorage-commands";
import React from "react";
import { ApolloProvider } from "@apollo/client";

import todos from "../fixtures/todos.json";
import AddTodo from "../../src/components/AddTodo/index";
import client from "../../src/graphql/client";

describe("<AddTodo />", () => {
  const bucket = "f1509e28-f292-4eb8-ba07-386fc3bb74d3";

  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.intercept("POST", "/api/graphql", {
      statusCode: 200,
      body: JSON.stringify({ data: { todo: {}, todos: todos[bucket] } }),
    });

    cy.mount(
      <ApolloProvider client={client}>
        <AddTodo />
      </ApolloProvider>
    );
  });

  it("renders", () => {
    cy.get(`div[data-test-tag="AddTodo"] h1`).contains("todo list");
    cy.get(`button[data-test-tag="AddTodo-NewTask"]`).contains("New Task");
  });

  it("opens the form dialog", () => {
    cy.get(`button[data-test-tag="AddTodo-NewTask"]`).click();
    cy.get(`form[data-test-tag="AddTodo-Form"] button`);
  });

  it("adds a todo", () => {
    cy.get(`button[data-test-tag="AddTodo-NewTask"]`).click();
    cy.get(`form[data-test-tag="AddTodo-Form"] input`).type(
      "My Dynamic Todo Title"
    );
    cy.get(`form[data-test-tag="AddTodo-Form"] textarea`).type(
      "My Dynamic Todo Description"
    );
    cy.get(`form[data-test-tag="AddTodo-Form"] button`).click();
  });
});
