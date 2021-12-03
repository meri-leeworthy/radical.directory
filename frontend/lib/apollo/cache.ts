import { InMemoryCache, makeVar } from "@apollo/client";

type User = {
  name: string;
  id: string;
};

export const authenticatedUser = makeVar<User>({ name: "", id: "" });

export const cache = new InMemoryCache();
