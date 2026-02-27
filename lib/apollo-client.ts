import { HttpLink, ApolloLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { API_GRAPHQL_URL } from "@/constants/api";

const httpLink = new HttpLink({
  uri: API_GRAPHQL_URL,
  fetchOptions: {
    mode: "cors",
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const authData = localStorage.getItem("chat-noir-auth");
  let token = null;
  
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      token = parsed.state?.token;
    } catch (e) {
      console.error("Error parsing auth data from localStorage", e);
    }
  }

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
