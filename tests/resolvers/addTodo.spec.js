import crypto from "crypto";
import addTodo from "../../src/graphql/resolvers/addTodo";

describe("addTodo resolver", () => {
  const authorization = crypto.randomUUID();

  it("adds a new todo, new bucket", async () => {
    const description = "My Todo Resolver Description";
    const title = "My Todo Resolver Title";
    const added = await addTodo(
      null,
      { description, title },
      { user: Promise.resolve({ authorization }) }
    );
    expect(added.title).toEqual(title);
    expect(added.description).toEqual(description);
  });

  it("adds a new todo, existent bucket", async () => {
    const description = "My Todo Resolver Description Existent";
    const title = "My Todo Resolver Title Existent";
    const added = await addTodo(
      null,
      { description, title },
      { user: Promise.resolve({ authorization }) }
    );
    expect(added.title).toEqual(title);
    expect(added.description).toEqual(description);
  });
});
