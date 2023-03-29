import { setItem, getItem } from "../redisClient";

interface Arguments {
  id: Todo["id"];
}

/**
 * @madeByAi
 * Retrieves a single todo item from the Redis data store.
 *
 * @param {any} _parent Unused argument.
 * @param {Arguments} args Arguments passed to the resolver function. Requires an "id" property.
 * @param {ResolverContext} context Context object that contains the user's authorization token.
 *
 * @returns {Promise<Todo>} Returns a Promise that resolves with a single todo item that matches the specified ID.
 *
 * @throws {Error} If no todo item is found with the specified ID.
 */
export default async function todo(
  _parent: any,
  args: Arguments,
  context: ResolverContext
): Promise<Todo> {
  const { id } = args;
  const { authorization } = await context.user;
  const todos = (await getItem<Todo[]>(authorization)) ?? ([] as Todo[]);
  const found = todos.find((item) => item.id === id);
  if (found) {
    return found;
  }

  throw Error("Todo not found!");
}
