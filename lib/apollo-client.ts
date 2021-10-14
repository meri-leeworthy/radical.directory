import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.API_URL + "/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
