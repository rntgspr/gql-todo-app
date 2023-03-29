import { setItem, getItem } from "../redisClient";

/**
 * @madeByAi
 * todos function is a resolver function that returns a list of all todos for the current user.
 * @param {any} _parent The parent object, which refers to the parent of the current object. Not used in this function.
 * @param {any} _args The arguments passed to the resolver. Not used in this function.
 * @param {ResolverContext} context The context object that is passed to all resolvers in a GraphQL API. It contains information about the current user and other context information.
 * @returns {Promise<Todo[]>} A Promise that resolves to an array of todos belonging to the current user.
 */
export default async function todos(
  _parent: any,
  _args: any,
  context: ResolverContext
): Promise<Todo[]> {
  const { authorization } = await context.user;
  const todos = (await getItem<Todo[]>(authorization)) ?? ([] as Todo[]);
  return todos;
}
