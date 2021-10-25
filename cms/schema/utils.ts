import { document } from "@keystone-next/fields-document";

export function defaultSlug({ context, inputData }: any) {
  const date = new Date();
  return `${
    inputData?.title
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^\w ]+/g, "")
      ?.replace(/ +/g, "-") ?? ""
  }-${date?.getFullYear() ?? ""}${date?.getMonth() + 1 ?? ""}${
    date?.getDate() ?? ""
  }`;
}

export const monoDocument = document({
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
  },
  layouts: [[1, 1]],
  links: true,
  dividers: true,
});
