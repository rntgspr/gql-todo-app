import { useCallback, useMemo, useState } from "react";
import Link from "next/link";

import useList from "/src/hooks/useList";
import useTodo from "/src/hooks/useTodo";
import ListItem from "/src/components/ListItem";
import SearchTodo from "/src/components/SearchTodo";

import styles from "./styles.module.scss";

/**
 * List component renders a list of todo items and provides functionality to
 * remove, complete and search them.
 * @returns component render;
 */
const List = () => {
  const [query, setQuery] = useState<string>("");
  const { list, loading, refetch } = useList();

  const searchHandler = useCallback(
    async (query: string) => {
      await refetch({ query });
      setQuery(query);
    },
    [refetch]
  );

  const undoneList = useMemo(() => list.filter((item) => !item.done), [list]);
  const doneList = useMemo(() => list.filter((item) => item.done), [list]);

  const emptyMessage = useMemo(() => {
    if (query && list.length === 0) {
      return "No results found";
    }

    if (list.length === 0) {
      return "List is empty, ready to add new items";
    }

    if (undoneList.length === 0) {
      return "Everything done!";
    }

    return null;
  }, [list, undoneList, query]);

  return (
    <div className={styles.wrapper}>
      <SearchTodo onUpdate={searchHandler} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {emptyMessage ? (
            <div className={styles.message}>{emptyMessage}</div>
          ) : null}
          {list.length > 0 ? (
            <>
              <ul className={styles.list}>
                {undoneList.length > 0
                  ? undoneList.map((item) => (
                      <ListItem key={item.id} item={item} />
                    ))
                  : null}
                {doneList.length > 0
                  ? doneList.map((item) => (
                      <ListItem key={item.id} item={item} />
                    ))
                  : null}
              </ul>
              <div className={styles.message}>
                {`${undoneList.length}/${list.length} item completed`}
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default List;
