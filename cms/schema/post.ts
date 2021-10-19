import { list } from "@keystone-next/keystone";
import {
  text,
  select,
  timestamp,
  relationship,
  virtual,
} from "@keystone-next/keystone/fields";
import { document } from "@keystone-next/fields-document";
import { graphql } from "@keystone-next/keystone";
import { defaultSlug } from "./utils";

export const Post = list({
  fields: {
    title: text(),
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
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      ui: {
        displayMode: "segmented-control",
      },
    }),
    content: document({
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
    publishDate: timestamp(),
    author: relationship({
      ref: "User.posts",
      many: true,
      //   ui: {
      //     displayMode: "cards",
      //     cardFields: ["name", "email"],
      //     inlineEdit: { fields: ["name", "email"] },
      //     linkToItem: true,
      //     inlineCreate: { fields: ["name", "email"] },
      //   },
    }),
    authorString: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { authors } = await context.query.Post.findOne({
            where: { id: item.id.toString() },
            query: "author { name }",
          });
          //   const authorArray =
          //     authors &&
          //     (Array.isArray(authors)
          //       ? authors[0]
          //         ? authors.map((author) => author.name)
          //         : [""]
          //       : [authors.name]);
          //   //multiple authors rendered as X, Y & Z
          //   const joinedNames =
          //     authorArray &&
          //     authorArray.slice(0, -1).join(", ") +
          //       (authorArray[1] ? " & " : "") +
          //       authorArray.pop();
          //   return joinedNames;
          return authors.toString();
        },
      }),
    }),
    tags: relationship({
      ref: "Tag.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] },
      },
      many: true,
    }),
  },
});
