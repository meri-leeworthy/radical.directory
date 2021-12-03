import { list } from "@keystone-6/core";
import { text, relationship } from "@keystone-6/core/fields";
import { defaultSlug, monoDocument } from "./utils";
import { Lists } from ".keystone/types";

export const Project: Lists.Project = list({
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),
    acronym: text({ db: { isNullable: true } }),
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
    description: monoDocument,
    members: relationship({
      ref: "User.memberOf",
      many: true,
    }),
    subscribers: relationship({
      ref: "User.projectSubs",
      many: true,
    }),
    parents: relationship({
      ref: "Project.children",
      many: true,
    }),
    children: relationship({
      ref: "Project.parents",
      many: true,
    }),
    tags: relationship({
      ref: "Tag.projects",
      many: true,
    }),
    events: relationship({
      ref: "Event.projects",
      many: true,
    }),
    posts: relationship({
      ref: "Post",
      many: true,
    }),
  },
});
