import doneTodo from "../../src/graphql/resolvers/doneTodo";
import todos from "../../cypress/fixtures/todos.json";

describe("doneTodo resolver", () => {
  it("sets a todo done", async () => {
    const authorization = "227959d4-852d-47d4-9ec9-a487fa21642f";
    const { id } = todos[authorization][0];
    const completed = await doneTodo(
      null,
      { id, done: true },
      { user: Promise.resolve({ authorization }) }
    );
    expect(completed.id).toEqual(id);
    expect(completed.done).toEqual(true);
  });

  it("sets a todo not done", async () => {
    const authorization = "227959d4-852d-47d4-9ec9-a487fa21642f";
    const { id } = todos[authorization][0];
    const completed = await doneTodo(
      null,
      { id, done: false },
      { user: Promise.resolve({ authorization }) }
    );
    expect(completed.id).toEqual(id);
    expect(completed.done).toEqual(false);
  });
});
