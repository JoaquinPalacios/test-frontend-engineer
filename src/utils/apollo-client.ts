import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/", // This is a public GraphQL API for testing
  cache: new InMemoryCache(),
});