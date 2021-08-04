import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError, GraphQLFormattedError } from "graphql";

const errorLink = onError(({ graphqlErrors, networkError }: any) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }: any) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const authMiddleware = new ApolloLink((operation: any, forward: any) => {
  const token = localStorage.getItem("token") || null;
  const headers = {};
  if (token) {
    Object.assign(headers, {
      authorization: token,
    });
  }
  operation.setContext({
    headers,
  });
  return forward(operation);
});

const link = from([
  authMiddleware,
  errorLink,
  new HttpLink({ uri: "http://localhost:4000" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default client;
