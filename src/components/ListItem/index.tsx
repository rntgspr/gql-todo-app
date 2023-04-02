import { jn } from "overclass";
import { useCallback } from "react";
import Link from "next/link";

import useTodo from "/src/hooks/useTodo";
import useList from "/src/hooks/useList";

import styles from "./styles.module.scss";

interface Props {
  item: Todo;
}

/**
 * List item component to express Todo title and it's actions;
 * @param item Given Todo item;
 * @returns component render;
 */
const ListItem: React.FC<Props> = ({ item }) => {
  const { refetch } = useList();
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
    <li className={jn(styles.wrapper, !!item.done && styles.wrapperDone)}>
      <button
        className={jn(
          styles.button,
          styles.buttonDone,
          !!item.done && styles.buttonDoneChecked
        )}
        onClick={clickDoneHandler(item.id, !item.done)}
      />
      <Link className={styles.itemLink} href={`/todo/${item.id}`}>
        {item.title}
      </Link>
      <button
        className={styles.buttonDelete}
        onClick={clickDeleteHandler(item.id)}
      />
    </li>
  );
};

export default ListItem;
