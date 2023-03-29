import Link from "next/link";

import useTodo from "../../hooks/useTodo";

import styles from "./styles.module.css";

interface Props {
  uuid: string;
}

const Detail: React.FC<Props> = ({ uuid }) => {
  const { todo } = useTodo(uuid);
  return (
    <div className={styles.wrapper}>
      <div className={styles.todo}>
        <h1>{todo?.title}</h1>
        <div>{todo?.description}</div>
      </div>
      <Link href="/" className={styles.back}>
        Back
      </Link>
    </div>
  );
};

export default Detail;
