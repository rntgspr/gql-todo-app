import "/src/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import styles from "/src/styles/App.module.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const httpLink = createHttpLink({ uri: "/api/graphql" });
const authLink = setContext((_, { headers }) => {
  // simple stores a token on localstorage to be used after a possible reload
  let token = localStorage.getItem("token");
  if (!token) {
    const tokenUUID = crypto.randomUUID();
    localStorage.setItem("token", tokenUUID);
    token = tokenUUID;
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/**
 * Authorized Apollo client
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ resultCacheMaxSize: 0 }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <meta name="description" content="propdocs todo app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={[styles.main, inter.className].join(" ")}>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}
