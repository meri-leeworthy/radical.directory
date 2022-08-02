import { config } from "@keystone-6/core";
import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";
import { lists } from "./schema";
import { insertSeedData } from "./seed";

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "The SESSION_SECRET environment variable must be set in production"
    );
  } else {
    sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: `id name role {
    canManageContent
    canManageUsers
  }`,
  initFirstItem: {
    fields: ["name", "email", "password"],
    itemData: {
      role: {
        create: {
          name: "Super User",
          canManageContent: true,
          canManageUsers: true,
        },
      },
    },
  },
});

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
  // secure: true,
  // path: "/",
  // domain: "localhost",
  // sameSite: "none",
});

export default withAuth(
  config({
    db: {
      provider: "postgresql",
      url:
        process.env.NODE_ENV === "production"
          ? process.env.DATABASE_URL || ""
          : "postgres://postgres:postgres@localhost:5432/rd-keystone",
      useMigrations: true,
      async onConnect(context) {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        }
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
    server: {
      cors: {
        origin: ["http://localhost:4000", "https://radical.directory"],
        credentials: true,
      },
    },
    graphql: {
      apolloConfig: {
        introspection: true, //process.env.NODE_ENV !== "production",
        plugins: [],
      },
    },
  })
);
