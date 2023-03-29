type Todo = {
  id: string;
  title: string;
  description: string;
  created: string;
  done: boolean;
};

interface ResolverContext {
  user: Promise<{
    authorization: string;
  }>;
}
