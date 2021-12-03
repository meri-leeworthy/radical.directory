import { list } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { defaultSlug } from "./utils";
import { Lists } from ".keystone/types";

export const Tag: Lists.Tag = list({
  // ui: {
  //   isHidden: true,
  // },
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
          return resolvedData.slug || null;
        },
      },
    }),
    posts: relationship({
      ref: "Post.tags",
      many: true,
    }),
    projects: relationship({
      ref: "Project.tags",
      many: true,
    }),
    description: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    subscribers: relationship({
      ref: "User.tagSubs",
      many: true,
    }),
    events: relationship({
      ref: "Event.tags",
      many: true,
    }),
  },
});
