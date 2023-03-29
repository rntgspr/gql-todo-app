import { setItem, getItem } from "../redisClient";

interface Arguments {
  id: Todo["id"];
}

/**
 * @madeByAi
 * Deletes a todo item.
 * @param {any} _parent - Unused.
 * @param {Object} args - Arguments for the deleteTodo function.
 * @param {string} args.id - The id of the todo item to be deleted.
 * @param {Object} context - The context object containing the user authorization.
 * @param {Object} context.user - The user object containing the authorization token.
 * @returns {Promise<boolean>} A promise that resolves to true if the todo item was deleted successfully.
 * @throws {Error} If the todo item is not found in the user's todos.
 */
export default async function deleteTodo(
  _parent: any,
  args: Arguments,
  context: ResolverContext
): Promise<boolean> {
  const { id } = args;
  const { authorization } = await context.user;

  let todos = (await getItem<Todo[]>(authorization)) ?? ([] as Todo[]);
  const index = todos.findIndex((item) => item.id === id);
  if (index > -1) {
    todos.splice(index, 1);
    await setItem(authorization, todos);
    return true;
  }

  throw Error("Todo not found!");
}
