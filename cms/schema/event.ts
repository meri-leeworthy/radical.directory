import { list } from "@keystone-next/keystone";
import {
  text,
  timestamp,
  float,
  json,
  relationship,
} from "@keystone-next/keystone/fields";
import { defaultSlug, monoDocument } from "./utils";

export const Event = list({
  fields: {
    name: text(),
    slug: text({
      ui: { createView: { fieldMode: "hidden" } },
      isIndexed: "unique",
      hooks: {
        resolveInput: ({ operation, resolvedData, inputData, context }) => {
          if (operation === "create" && !inputData.slug) {
            return defaultSlug({ context, inputData });
          }
          return resolvedData.slug;
        },
      },
    }),
    description: monoDocument,
    eventEnd: timestamp(),
    latitude: float(),
    longitude: float(),
    location: json(),
    url: text(),
    projects: relationship({
      ref: "Project.events",
      many: true,
    }),
    posts: relationship({
      ref: "Post",
      many: true,
    }),
    subscribers: relationship({
      ref: "User.eventSubs",
      many: true,
    }),
    tags: relationship({
      ref: "Tag.events",
      many: true,
    }),
  },
});
