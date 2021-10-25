import { list } from "@keystone-next/keystone";
import {
  text,
  select,
  timestamp,
  relationship,
  virtual,
} from "@keystone-next/keystone/fields";
import { graphql } from "@keystone-next/keystone";
import { defaultSlug, monoDocument } from "./utils";
import { Node } from "slate";

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
    content: monoDocument,
    snippet: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { content } = await context.query.Post.findOne({
            where: { id: item.id.toString() },
            query: "content { document }",
          });
          const serialise = (nodes: Node[]) => {
            const shortNodes = nodes.slice(0, 2);
            const stringText = shortNodes.map((n) => Node.string(n)).join("\n");
            // if over 100 char, truncate with "..."
            return (
              stringText.slice(0, 100) + (stringText.length > 100 ? "..." : "")
            );
          };
          return serialise(content.document);
        },
      }),
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
          const { author } = await context.query.Post.findOne({
            where: { id: item.id.toString() },
            query: "author { name }",
          });
          const authorArray =
            author &&
            (Array.isArray(author)
              ? author[0]
                ? author.map((eachAuthor) => eachAuthor.name)
                : [""]
              : [author.name]);
          //multiple authors rendered as X, Y & Z
          const joinedNames =
            authorArray &&
            authorArray.slice(0, -1).join(", ") +
              (authorArray[1] ? " & " : "") +
              authorArray.pop();
          return joinedNames;
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
