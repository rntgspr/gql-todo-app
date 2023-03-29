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
 *
 * @param id
 * @returns
 */
const useTodo = (id?: string) => {
  const { data, loading, refetch } = useQuery<{ todo: Todo }>(GET_TODO, {
    variables: { id },
  });
  const [addMutation] = useMutation(ADD_TODO);
  const [deleteMutation] = useMutation(DELETE_TODO);
  const [doneMutation] = useMutation(DONE_TODO);

  const addTodo = async (title: string, description: string) =>
    addMutation({ variables: { title, description } });

  const deleteTodo = async (id: string) =>
    deleteMutation({ variables: { id } });

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
