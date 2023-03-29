import { setItem, getItem } from "../redisClient";

export default async function todos(
  _parent: any,
  _args: any,
  context: ResolverContext
): Promise<Todo[]> {
  const { authorization } = await context.user;
  const todos = (await getItem<Todo[]>(authorization)) ?? ([] as Todo[]);
  return todos;
}
