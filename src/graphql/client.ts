import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

export default client;
