import { document } from "@keystone-6/fields-document";
import { componentBlocks } from "../components/document-components";
import "dotenv/config";
import cuid from "cuid";

export function defaultSlug({ context, inputData }: any) {
  // const date = new Date();
  return `${
    inputData?.title
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^\w ]+/g, "")
      ?.replace(/ +/g, "-") ?? ""
  }-${cuid.slug()}`;
}

// formerly:
// ${
//   inputData?.title
//     ?.trim()
//     ?.toLowerCase()
//     ?.replace(/[^\w ]+/g, "")
//     ?.replace(/ +/g, "-") ?? ""
// }-${date?.getFullYear() ?? ""}${date?.getMonth() + 1 ?? ""}${
//   date?.getDate() ?? ""
// }

export const monoDocument = document({
  ui: {
    views: require.resolve("../components/document-components"),
  },
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
  relationships: {
    mention: {
      kind: "inline",
      listKey: "User",
      label: "Mention",
      selection: "id name",
    },
    image: {
      kind: "prop",
      listKey: "Image",
      selection: "id description image { publicUrlTransformed }",
    },
  },
  layouts: [[1, 1]],
  links: true,
  dividers: true,
  componentBlocks,
});
