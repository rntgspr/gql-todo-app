import todos from "../../src/graphql/resolvers/todos";
import todosJSON from "../../cypress/fixtures/todos.json";

describe("todos resolver", () => {
  const authorization = "f1509e28-f292-4eb8-ba07-386fc3bb74d3";
  const sortItems = (a, b) =>
    new Date(b.created).getMilliseconds() -
    new Date(a.created).getMilliseconds();

  it("gets a list of todos, no query", async () => {
    const query = "";
    const expected = todosJSON[authorization].sort(sortItems);
    const results = await todos(
      null,
      { query },
      { user: Promise.resolve({ authorization }) }
    );
    expect(results).toEqual(expected);
  });

  it("gets a list of todos, query search", async () => {
    const query = "tItLe";
    const expected = todosJSON[authorization].slice(2).sort(sortItems);
    const results = await todos(
      null,
      { query },
      { user: Promise.resolve({ authorization }) }
    );
    expect(results).toEqual(expected);
  });

  it("gets a list of todos, query search, missing", async () => {
    const query = "M3eTinG";
    const expected = [];
    const results = await todos(
      null,
      { query },
      { user: Promise.resolve({ authorization }) }
    );
    expect(results).toEqual(expected);
  });
});
