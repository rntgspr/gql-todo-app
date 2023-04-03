import "cypress-localstorage-commands";
import React from "react";
import { ApolloProvider } from "@apollo/client";

import todos from "../fixtures/todos.json";
import Detail from "../../src/components/Detail/index";
import client from "../../src/graphql/client";

describe("<Detail />", () => {
  const bucket = "6ac64af5-d98a-46a7-9841-c0baa59fd1d3";
  const todo = todos[bucket][0];

  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.intercept("POST", "/api/graphql", {
      statusCode: 200,
      body: JSON.stringify({ data: { todo } }),
    });

    cy.mount(
      <ApolloProvider client={client}>
        <Detail uuid={todo.id} />
      </ApolloProvider>
    );
  });

  it("renders", () => {
    cy.get('h1[data-test-tag="Details-Title"]').contains(todo.title);
    cy.get('div[data-test-tag="Details-Description"]').contains(
      todo.description
    );
  });
});
