import Head from "next/head";
import Image from "next/image";

import AddTodo from "/src/components/AddTodo";
import List from "/src/components/List";

export default function Home() {
  return (
    <>
      <Head>
        <title>This is your Todo&apos;s</title>
      </Head>
      <>
        <section className="seciton">
          <AddTodo />
          <List />
        </section>
      </>
    </>
  );
}
