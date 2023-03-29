import { setItem, getItem } from "../redisClient";

interface Arguments {
  id: Todo["id"];
  done: Todo["done"];
}

/**
 * @madeByAi
 * Completes a todo item by updating its "done" field in Redis cache.
 *
 * @async
 * @param {object} _parent - The parent object, ignored in this function.
 * @param {object} args - The arguments for the function.
 * @param {string} args.id - The ID of the todo item to complete.
 * @param {boolean} args.done - The new value for the "done" field.
 * @param {object} context - The context object containing user authorization information.
 * @param {object} context.user - The user object containing authorization information.
 * @param {string} context.user.authorization - The authorization token for the user.
 * @returns {Promise<Todo>} The updated todo item.
 * @throws {Error} If the specified todo item is not found.
 */
export default async function doneTodo(
  _parent: any,
  args: Arguments,
  context: ResolverContext
): Promise<Todo> {
  const { id, done } = args;
  const { authorization } = await context.user;

  const todos = (await getItem<Todo[]>(authorization)) ?? ([] as Todo[]);
  const index = todos.findIndex((item) => item.id === id);

  if (todos?.[index]?.done !== undefined) {
    todos[index].done = done;
    await setItem(authorization, todos);
    return todos[index];
  }

  throw Error("Todo not found!");
}
