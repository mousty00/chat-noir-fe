import { HttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_GRAPHQL_URL } from "@/constants/api";

const link = new HttpLink({
  uri: API_GRAPHQL_URL,
  fetchOptions: {
    mode: "cors",
  },
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
