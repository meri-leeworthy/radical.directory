import { InMemoryCache, makeVar } from "@apollo/client";

let userId: string | null = "";
if (typeof window !== "undefined") userId = localStorage.getItem("userId");

type User = {
  name: string;
  id: string | null;
};

export const authenticatedUserVar = makeVar<User>({
  name: "",
  id: userId,
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        authenticatedUser: {
          read() {
            return authenticatedUserVar();
          },
        },
      },
    },
  },
});
