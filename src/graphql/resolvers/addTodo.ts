import crypto from "crypto";

import { setItem, getItem } from "../redisClient";

interface Arguments {
  description: Todo["description"];
  title: Todo["title"];
}

/**
 * @madeByAi
 * Adds a new todo item to the cache.
 *
 * @async
 * @param {object} _parent - The parent object, ignored in this function.
 * @param {object} args - The arguments for the function.
 * @param {string} args.title - The title of the new todo item.
 * @param {string} args.description - The description of the new todo item.
 * @param {object} context - The context object containing user authorization information.
 * @param {object} context.user - The user object containing authorization information.
 * @param {string} context.user.authorization - The authorization token for the user.
 * @returns {Promise<Todo>} The newly added todo item.
 */
export default async function addTodo(
  _parent: any,
  args: Arguments,
  context: ResolverContext
): Promise<Todo> {
  const { description, title } = args;
  const { authorization } = await context.user;

  const id = crypto.randomUUID();
  const todo: Todo = {
    id,
    description,
    title,
    created: new Date().toISOString(),
    done: false,
  };

  let todos = (await getItem<Todo[]>(authorization)) ?? ([] as Todo[]);
  todos = [...todos, todo];
  await setItem(authorization, todos);

  return todo;
}
