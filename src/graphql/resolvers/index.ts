import crypto from "crypto";

import todos from "./todos";
import todo from "./todo";
import addTodo from "./addTodo";
import doneTodo from "./doneTodo";
import deleteTodo from "./deleteTodo";

/**
 * GraphQL resolvers
 */
const resolver = {
  /** Queries */
  Query: {
    todos,
    todo,
  },
  /** Mutations */
  Mutation: {
    addTodo,
    doneTodo,
    deleteTodo,
  },
};

export default resolver;
