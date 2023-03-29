import { gql, useMutation, useQuery } from "@apollo/client";

const GET_TODO = gql`
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      description
      created
      done
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($description: String!, $title: String!) {
    addTodo(description: $description, title: $title) {
      id
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

const DONE_TODO = gql`
  mutation DoneTodo($id: ID!, $done: Boolean!) {
    doneTodo(id: $id, done: $done) {
      id
      done
    }
  }
`;

/**
 * @madeByAi
 * A custom hook for managing a single Todo item, including its query, mutation and deletion.
 * @function useTodo
 * @param {string} [id] - An optional ID for the Todo item.
 * @returns {{
 *   todo: Todo,
 *   addTodo: (title: string, description: string) => Promise<void>,
 *   deleteTodo: (id: string) => Promise<void>,
 *   doneTodo: (id: string, done: boolean) => Promise<void>,
 * }}
 */
const useTodo = (id?: string) => {
  const { data, loading, refetch } = useQuery<{ todo: Todo }>(GET_TODO, {
    variables: { id },
  });
  const [addMutation] = useMutation(ADD_TODO);
  const [deleteMutation] = useMutation(DELETE_TODO);
  const [doneMutation] = useMutation(DONE_TODO);

  /**
   * Adds a new Todo item with the specified title and description.
   * @function addTodo
   * @async
   * @param {string} title - The title of the new Todo item.
   * @param {string} description - The description of the new Todo item.
   * @returns {Promise<void>}
   */
  const addTodo = async (title: string, description: string) =>
    addMutation({ variables: { title, description } });

  /**
   * Deletes the Todo item with the specified ID.
   * @function deleteTodo
   * @async
   * @param {string} id - The ID of the Todo item to delete.
   * @returns {Promise<void>}
   */
  const deleteTodo = async (id: string) =>
    deleteMutation({ variables: { id } });

  /**
   * Modifies the Todo item with the specified ID.
   * @function deleteTodo
   * @async
   * @param {string} id - The ID of the Todo item to modify.
   * @param {boolean} done - The state of the current todo item.
   * @returns {Promise<void>}
   */
  const doneTodo = async (id: string, done: boolean) =>
    doneMutation({ variables: { id, done } });

  return {
    todo: data?.todo,
    addTodo,
    deleteTodo,
    doneTodo,
  };
};

export default useTodo;
