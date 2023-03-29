import { setItem, getItem } from "../redisClient";

interface Arguments {
  id: Todo["id"];
}

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
