import "cypress-localstorage-commands";
import React from "react";
import { ApolloProvider } from "@apollo/client";

import todos from "../fixtures/todos.json";
import SearchTodo from "../../src/components/SearchTodo/index";
import client from "../../src/graphql/client";

describe("<SearchTodo />", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it("renders", () => {
    const searchTerm = "Search Term";
    const exposer = (value) => {
      expect(value).equal(searchTerm);
    };
    cy.mount(<SearchTodo onUpdate={exposer} />);
    cy.get('input[data-test-tag="SearchTodo-Field"]').type(searchTerm);
  });

  it("types and clear", () => {
    const searchTerm = "Alternative Search Term";
    cy.mount(<SearchTodo onUpdate={cy.log} />);
    cy.get('input[data-test-tag="SearchTodo-Field"]').type(searchTerm);
    cy.get('button[data-test-tag="SearchTodo-Clear"]').click();
    cy.get('input[data-test-tag="SearchTodo-Field"]')
      .invoke("val")
      .then((value) => {
        expect(value).not.equal(searchTerm);
      });
  });
});
