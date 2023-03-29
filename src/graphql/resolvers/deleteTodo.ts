import { setItem, getItem } from "../redisClient";

interface Arguments {
  id: Todo["id"];
}

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
