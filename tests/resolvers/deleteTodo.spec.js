import deleteTodo from "../../src/graphql/resolvers/deleteTodo";
import todos from "../../cypress/fixtures/todos.json";

describe("deleteTodo resolver", () => {
  it("remove an existent todo", async () => {
    const authorization = "6a04f76d-b2b7-45c1-b83d-7fa8852d72bf";
    const { id } = todos[authorization][0];
    const deleted = await deleteTodo(
      null,
      { id },
      { user: Promise.resolve({ authorization }) }
    );
    expect(deleted).toEqual(true);
  });

  it("trying to remove an missing todo, throws an error", async () => {
    const authorization = "6a04f76d-b2b7-45c1-b83d-7fa8852d72bf";
    await expect(
      deleteTodo(
        null,
        { id: "00000000-0000-0000-0000-000000000000" },
        { user: Promise.resolve({ authorization }) }
      )
    ).rejects.toThrow("Todo not found!");
  });
});
