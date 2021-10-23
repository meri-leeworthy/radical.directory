import { list } from "@keystone-next/keystone";
import { text, relationship } from "@keystone-next/keystone/fields";
import { document } from "@keystone-next/fields-document";
import { defaultSlug } from "./utils";

export const Project = list({
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
          return resolvedData.slug;
        },
      },
    }),
    description: document({
      formatting: {
        inlineMarks: {
          bold: true,
          italic: true,
          code: true,
        },
        listTypes: {
          ordered: true,
          unordered: true,
        },
        alignment: {},
        headingLevels: [1, 2, 3],
        blockTypes: {
          blockquote: true,
          code: true,
        },
        softBreaks: true,
      },
      layouts: [[1, 1]],
      links: true,
      dividers: true,
    }),
    //todo: add relationships!
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
