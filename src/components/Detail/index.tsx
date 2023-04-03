import { jn } from "overclass";
import Link from "next/link";

import useTodo from "/src/hooks/useTodo";

import styles from "./styles.module.scss";
import testTag from "/src/utils/testTag";

interface Props {
  uuid: string;
}

/**
 * Detail component, displays the details of a todo item and provides a link to
 * go back.
 * @param uuid - Given Todo uuid;
 * @returns component render;
 */
const Detail: React.FC<Props> = ({ uuid }) => {
  const { todo } = useTodo(uuid);
  return (
    <div className={styles.wrapper}>
      <div className={styles.todo}>
        <h1
          data-test-tag={testTag`Details-Title`}
          className={jn("title", styles.title)}
        >
          {todo?.title}
        </h1>
        <div
          data-test-tag={testTag`Details-Description`}
          className={styles.description}
        >
          {todo?.description}
        </div>
      </div>
      <Link
        data-test-tag={testTag`Details-Back`}
        href="/"
        className={jn("button", styles.back)}
      >
        Back
      </Link>
    </div>
  );
};

export default Detail;
