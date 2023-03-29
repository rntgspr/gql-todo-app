import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import Detail from "/src/components/Detail";

export default function Todo() {
  const {
    query: { uuid },
  } = useRouter();
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <>
        {uuid ? (
          <Detail uuid={!Array.isArray(uuid) ? uuid : uuid?.join("")} />
        ) : null}
      </>
    </>
  );
}
