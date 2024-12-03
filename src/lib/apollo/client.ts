import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  endpoints: {
    fakestore: "https://fakestoreapi.com/",
  },
  uri: "https://fakestoreapi.com/",
  customFetch: fetch,
  fieldNameNormalizer: (key: string) => key,
  typePatcher: {
    Product: (data: any) => {
      if (data.rating) {
        return {
          ...data,
          rating: {
            rate: data.rating.rate,
            count: data.rating.count,
          },
        };
      }
      return data;
    },
  },
});

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
  },
});
