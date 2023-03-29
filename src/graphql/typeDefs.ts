import { gql } from "graphql-tag";

const typeDefs = gql`
  # Todo
  type Todo {
    id: ID!
    title: String!
    description: String!
    created: String!
    done: Boolean
  }

  # General query
  type Query {
    todos: [Todo]!
    todo(id: ID!): Todo
  }

  type Mutation {
    addTodo(description: String!, title: String!): Todo
    doneTodo(id: ID!, done: Boolean): Todo
    deleteTodo(id: ID!): Boolean
  }
`;

export default typeDefs;
