import { useCallback, useMemo } from "react";
import Link from "next/link";

import useList from "/src/hooks/useList";
import useTodo from "/src/hooks/useTodo";

import styles from "./styles.module.css";

/**
 * @madeByAi
 * List component renders a list of todo items and provides functionality to remove them.
 * @returns {JSX.Element} React component with a list of todo items.
 */
const List = () => {
  const { list, loading, refetch } = useList();
  const { deleteTodo, doneTodo } = useTodo();

  const clickDeleteHandler = useCallback(
    (id: string) => async () => {
      await deleteTodo(id);
      await refetch();
    },
    [deleteTodo, refetch]
  );

  const clickDoneHandler = useCallback(
    (id: string, done: boolean) => async () => {
      await doneTodo(id, done);
      await refetch();
    },
    [doneTodo, refetch]
  );

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <div>Loading...</div>
      ) : list.length > 0 ? (
        <ul className={styles.list}>
          {list.map((item) => (
            <li key={item.id} className={styles.item}>
              <button onClick={clickDoneHandler(item.id, !item.done)}>
                {item.done ? "✔" : "⭕"}
              </button>
              <Link href={`/todo/${item.id}`}>
                <h2>{item.title}</h2>
              </Link>
              <button onClick={clickDeleteHandler(item.id)}>⨉</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>Quite empty, add a new todo to start!</div>
      )}
    </div>
  );
};

export default List;
