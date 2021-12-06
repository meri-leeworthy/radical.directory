import { ApolloClient, HttpLink, gql } from "@apollo/client";
import { cache } from "./cache";

export const typeDefs = gql`
  type AuthenticatedUser {
    id: String
    name: String
  }

  extend type Query {
    isLoggedIn: Boolean!
    authenticatedUser: AuthenticatedUser
  }
`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    credentials: "include",
    // fetchOptions: {
    //   mode: "no-cors",
    // },
  }),
  ssrMode: typeof window === "undefined",
  cache,
  typeDefs,
});

export default client;
