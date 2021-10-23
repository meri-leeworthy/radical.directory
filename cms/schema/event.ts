import { list } from "@keystone-next/keystone";
import {
  text,
  timestamp,
  float,
  json,
  relationship,
} from "@keystone-next/keystone/fields";
import { document } from "@keystone-next/fields-document";
import { defaultSlug } from "./utils";

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
