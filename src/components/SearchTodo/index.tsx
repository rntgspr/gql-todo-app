import { jn } from "overclass";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";

import useList from "/src/hooks/useList";

import styles from "./styles.module.scss";

import type { ChangeEvent } from "react";

interface Props {
  onUpdate: (query: string) => void;
}

/**
 * Search component, update backwards a debounced and defered value from the
 * current search field;
 * @param onUpdate Function that will receive on isolation the saerch query;
 * @returns search component;
 */
const SearchTodo: React.FC<Props> = ({ onUpdate }) => {
  const debounce = useRef<NodeJS.Timeout | null>(null);
  const [query, setQuery] = useState<string>("");
  const defQuery = useDeferredValue(query);

  const clickClearHandler = useCallback(() => {
    setQuery("");
  }, [setQuery]);

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value ?? ""),
    [setQuery]
  );

  useEffect(() => {
    if (debounce.current !== null) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(
      (timedDefQuery, timedOnUpdate) => {
        timedOnUpdate(timedDefQuery);
      },
      333,
      defQuery,
      onUpdate
    );

    return () => {
      if (debounce.current !== null) {
        clearTimeout(debounce.current);
      }
    };
  }, [defQuery, onUpdate]);

  return (
    <div className={styles.wrapper}>
      <input
        className={jn("input", styles.field)}
        value={query}
        onChange={changeHandler}
        placeholder="search"
      />
      <button
        className={jn("button", styles.clearButton)}
        onClick={clickClearHandler}
        disabled={!query}
      >
        ⨉
      </button>
    </div>
  );
};

export default SearchTodo;
