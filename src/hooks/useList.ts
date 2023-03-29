import { gql, useQuery } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      description
      created
      done
    }
  }
`;

/**
 * @madeByAi
 * Represents a hook to fetch a list of todos.
 * @return The list of todos, a boolean indicating if the list is loading, and a function to refetch the list.
 */
const useList = () => {
  const { loading, error, data, refetch } = useQuery<{ todos: Todo[] }>(
    GET_TODOS
  );

  return {
    list: data?.todos ?? ([] as Todo[]),
    loading,
    refetch,
  };
};

export default useList;
