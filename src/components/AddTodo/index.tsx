import { useCallback, useState, useRef } from "react";

import useList from "/src/hooks/useList";
import useTodo from "/src/hooks/useTodo";

import styles from "./styles.module.css";

/**
 * @madeByAi
 * Component for adding new todos
 * @component
 */
const AddTodo = () => {
  const { refetch } = useList();
  const [csrf, setCSRF] = useState<string>((Math.random() * 2e8).toString());
  const { addTodo } = useTodo();
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);

  const clickHandler = useCallback(async () => {
    if (title.current?.value && description.current?.value) {
      setCSRF((Math.random() * 2e8).toString());
      await addTodo(title.current?.value, description.current?.value);
      await refetch();
    }
  }, [addTodo, refetch]);

  return (
    <div className={styles.wrapper}>
      <h1>Add a new Todo:</h1>
      <form key={csrf} className={styles.form}>
        <label className={styles.label}>
          <span>Title</span>
          <input ref={title} type="text" />
        </label>
        <label className={styles.label}>
          <span>Description</span>
          <textarea ref={description} data-enable-grammarly="false" />
        </label>
        <label className={styles.label}>
          <button onClick={clickHandler} type="button">
            Add
          </button>
        </label>
      </form>
    </div>
  );
};

export default AddTodo;
