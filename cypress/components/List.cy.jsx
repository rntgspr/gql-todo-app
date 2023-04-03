import "cypress-localstorage-commands";
import React from "react";
import { ApolloProvider } from "@apollo/client";

import todos from "../fixtures/todos.json";
import List from "../../src/components/List/index";
import client from "../../src/graphql/client";

describe("<List />", () => {
  const bucket = "f1509e28-f292-4eb8-ba07-386fc3bb74d3";

  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.intercept("POST", "/api/graphql", {
      statusCode: 200,
      body: JSON.stringify({ data: { todo: {}, todos: todos[bucket] } }),
    }).as("graphQLBase");

    cy.mount(
      <ApolloProvider client={client}>
        <List />
      </ApolloProvider>
    );
  });

  it("renders", () => {
    cy.get(`input[data-test-tag="SearchTodo-Field"]`);
  });

  it("<SearchTodo /> - search empty results", () => {
    const searchTerm = "Meeting";
    cy.intercept("POST", "/api/graphql", (req) => {
      expect(req.body.operationName).equal("GetTodos");
      expect(req.body.variables.query).equal(searchTerm);
      req.reply({ data: { todos: [] } });
    });
    cy.get(`input[data-test-tag="SearchTodo-Field"]`).type(searchTerm);
    cy.get(`div[data-test-tag="TodoList-Message"]`).contains(
      "No results found"
    );
  });

  it("<SearchTodo /> - search single result", () => {
    const searchTerm = "Title";
    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 3);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/3 completed"
    );

    cy.intercept("POST", "/api/graphql", (req) => {
      console.log("req", req);
      expect(req.body.operationName).equal("GetTodos");
      expect(req.body.variables.query).equal(searchTerm);
      req.reply({ data: { todos: [todos[bucket][2]] } });
    });
    cy.get(`input[data-test-tag="SearchTodo-Field"]`).type(searchTerm);

    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 1);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/1 completed"
    );
  });

  it("<SearchTodo /> - search multiple results", () => {
    const searchTerm = "T";
    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 3);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/3 completed"
    );

    cy.intercept("POST", "/api/graphql", (req) => {
      console.log("req", req);
      expect(req.body.operationName).equal("GetTodos");
      expect(req.body.variables.query).equal(searchTerm);
      req.reply({ data: { todos: [todos[bucket][0], todos[bucket][2]] } });
    });
    cy.get(`input[data-test-tag="SearchTodo-Field"]`).type(searchTerm);

    cy.get('div[data-test-tag="TodoList"] ul')
      .children()
      .should("have.length", 2);
    cy.get('div[data-test-tag="TodoList-Message-Completed"]').contains(
      "0/2 completed"
    );
  });

  it("mark a todo done", () => {
    const todoId = todos[bucket][0].id;

    cy.intercept("POST", "/api/graphql", (req) => {
      if (req.body.operationName === "DoneTodo") {
        expect(req.body.operationName).equal("DoneTodo");
        expect(req.body.variables.id).equal(todoId);
        expect(req.body.variables.done).equal(true);
        req.reply({
          data: {
            doneTodo: {
              ...todos[bucket][0],
              done: true,
            },
          },
        });
      } else if (req.body.operationName === "GetTodos") {
        req.reply({
          data: {
            todos: [
              { ...todos[bucket][0], done: true },
              ...todos[bucket].slice(1),
            ],
          },
        });
      }
    });

    cy.get(`button[data-test-tag="ListItem-${todoId}-Done"]`).click();
    cy.get(
      `li[data-test-tag="ListItem-${todoId}"][data-cy="isDone-true"]`
    ).contains(todos[bucket][0].title);
  });

  it("should delete a todo", () => {
    const todoId = todos[bucket][0].id;

    cy.intercept("POST", "/api/graphql", (req) => {
      if (req.body.operationName === "DeleteTodo") {
        expect(req.body.operationName).equal("DeleteTodo");
        expect(req.body.variables.id).equal(todoId);
        req.reply({
          data: {
            deleteTodo: true,
          },
        });
      } else if (req.body.operationName === "GetTodos") {
        req.reply({
          data: {
            todos: [...todos[bucket].slice(1)],
          },
        });
      }
    });

    cy.get(`button[data-test-tag="ListItem-${todoId}-Delete"]`).click();
    cy.get(`li[data-test-tag="ListItem-${todoId}"]`).not();
  });
});
