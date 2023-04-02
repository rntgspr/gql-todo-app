import "/src/styles/globals.scss";

import Head from "next/head";
import { Rubik } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import { jn } from "overclass";

import client from "/src/graphql/client";

import type { AppProps } from "next/app";

const rubki = Rubik({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="description" content="propdocs todo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={jn(rubki.className, "main")}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
