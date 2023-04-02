import { setItem, getItem } from "../redisClient";

interface Arguments {
  query: string;
}

/**
 * @madeByAi
 * todos function is a resolver function that returns a list of all todos for the current user.
 * @param _parent The parent object, which refers to the parent of the current object. Not used in this function.
 * @param args The arguments passed to the resolver. Not used in this function.
 * @param context The context object that is passed to all resolvers in a GraphQL API. It contains information about the current user and other context information.
 * @returns A Promise that resolves to an array of todos belonging to the current user.
 */
export default async function todos(
  _parent: any,
  args: Arguments,
  context: ResolverContext
): Promise<Todo[]> {
  const { query } = args;
  const { authorization } = await context.user;
  let todos = (await getItem<Todo[]>(authorization)) ?? ([] as Todo[]);
  todos = todos.sort(
    (a, b) =>
      new Date(b.created).getMilliseconds() -
      new Date(a.created).getMilliseconds()
  );
  if (query) {
    todos = todos.filter((item) =>
      item.title.toLowerCase().startsWith(query.toLowerCase())
    );
  }
  return todos;
}
