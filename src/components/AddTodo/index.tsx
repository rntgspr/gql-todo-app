import { jn } from "overclass";
import { useCallback, useState, useRef } from "react";

import useList from "/src/hooks/useList";
import useTodo from "/src/hooks/useTodo";

import styles from "./styles.module.scss";

import type { FormEvent, MouseEvent } from "react";

/**
 * Component responsible for adding new todos, user imputs title and description
 * in a form
 * @returns component render;
 */
const AddTodo = () => {
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [csrf, setCSRF] = useState<string>((Math.random() * 2e8).toString());
  const { refetch } = useList();
  const { addTodo } = useTodo();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const clickBackdropHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        setOpen(false);
      } else {
        setError("");
      }
    },
    [setOpen]
  );

  const clickNewTaskHandler = useCallback(() => {
    setError("");
    setOpen(true);
  }, [setOpen]);

  const clickHandler = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }

      if (title.current?.value && description.current?.value) {
        const nextTitle = title.current?.value;
        const nextDescription = description.current?.value;

        setOpen(false);
        setCSRF((Math.random() * 2e8).toString());

        await addTodo(nextTitle, nextDescription);
        await refetch();
      } else {
        setError("Title and a description are required.");
      }
    },
    [addTodo, refetch, setError]
  );

  return (
    <div className={styles.wrapper}>
      <h1 className="title main-title">Todo list</h1>
      {!open ? (
        <button className="button" onClick={clickNewTaskHandler}>
          New Task
        </button>
      ) : (
        <div onClick={clickBackdropHandler} className="backdrop">
          <div className={jn("card", styles.card)}>
            <h2 className={jn("title", styles.title)}>Add a new Todo:</h2>
            <form key={csrf} className={styles.form} onSubmit={onSubmitHandler}>
              <input
                ref={title}
                type="text"
                placeholder="title"
                className={jn("input", styles.titleField)}
              />
              <textarea
                ref={description}
                data-enable-grammarly="false"
                placeholder="description"
                className={jn("input", styles.descriptionField)}
              />
              <div className={jn(styles.error, !!error && styles.errorShow)}>
                {error ? <span>{error}</span> : null}
              </div>
              <button
                onClick={clickHandler}
                type="button"
                className={jn("button", styles.clearButton)}
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
