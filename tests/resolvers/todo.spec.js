import todo from "../../src/graphql/resolvers/todo";
import todos from "../../cypress/fixtures/todos.json";

describe("todo resolver", () => {
  it("gets a todo", async () => {
    const authorization = "6ac64af5-d98a-46a7-9841-c0baa59fd1d3";
    const { id, title, description } = todos[authorization][0];
    const resulted = await todo(
      null,
      { id },
      { user: Promise.resolve({ authorization }) }
    );
    expect(resulted.id).toEqual(id);
    expect(resulted.title).toEqual(title);
    expect(resulted.description).toEqual(description);
  });
});
