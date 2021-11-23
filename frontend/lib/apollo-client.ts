import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL + "/api/graphql",
    // credentials: "include",
    // fetchOptions: {
    //   mode: "no-cors",
    // },
  }),
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
});

export default client;
