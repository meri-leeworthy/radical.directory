import { createSchema, list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  password,
  timestamp,
  checkbox,
  select,
} from "@keystone-next/fields";
import { document } from "@keystone-next/fields-document";
import { permissions, rules } from "./access";

function defaultSlug({ originalInput }: any) {
  const date = new Date();
  return `${
    originalInput?.title
      ?.trim()
      ?.toLowerCase()
      ?.replace(/[^\w ]+/g, "")
      ?.replace(/ +/g, "-") ?? ""
  }-${date?.getFullYear() ?? ""}${date?.getMonth() + 1 ?? ""}${
    date?.getDate() ?? ""
  }`;
}

export const lists = createSchema({
  User: list({
    access: {
      create: true,
      read: true,
      update: rules.canManageUserList,
      delete: rules.canManageUserList,
    },
    ui: {
      hideCreate: (context) => !permissions.canManageUsers(context),
      hideDelete: (context) => !permissions.canManageUsers(context),
      itemView: {
        defaultFieldMode: (context) =>
          permissions.canManageUsers(context) ? "edit" : "hidden",
      },
      listView: {
        initialColumns: ["name", "posts"],
        defaultFieldMode: (context) =>
          permissions.canManageUsers(context) ? "read" : "hidden",
      },
    },
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
      posts: relationship({ ref: "Post.author", many: true }),
      //i am going to try to add some fields now - surname avatar pronouns bio town website
      surname: text(),
      avatar: text(),
      pronouns: text(),
      bio: text(),
      town: text(),
      website: text(),
      role: relationship({
        ref: "Role.users",
        access: permissions.canManageUsers,
      }),
    },
  }),
  Role: list({
    access: permissions.canManageUsers,
    ui: {
      isHidden: (context) => !permissions.canManageUsers(context),
    },
    fields: {
      name: text(),
      canManageContent: checkbox({ defaultValue: false }),
      canManageUsers: checkbox({ defaultValue: false }),
      users: relationship({ ref: "User.role", many: true }),
    },
  }),
  Post: list({
    fields: {
      title: text(),
      slug: text({
        defaultValue: defaultSlug,
        ui: { createView: { fieldMode: "hidden" } },
        isUnique: true,
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
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineCreate: { fields: ["name", "email"] },
        },
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
  }),
  Tag: list({
    // ui: {
    //   isHidden: true,
    // },
    fields: {
      name: text(),
      posts: relationship({
        ref: "Post.tags",
        many: true,
      }),
    },
  }),
});
