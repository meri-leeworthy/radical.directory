import { list } from "@keystone-next/keystone";
import {
  text,
  relationship,
  password,
  timestamp,
  checkbox,
  select,
  integer,
  float,
  json,
} from "@keystone-next/keystone/fields";
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

// database schema is defined here
export const lists = {
  User: list({
    access: {
      operation: {
        create: () => true,
      },
      filter: {
        query: () => true,
        update: rules.canManageUserList,
        delete: rules.canManageUserList,
      },
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
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: "Post.author", many: true }),
      surname: text({ db: { isNullable: true } }),
      avatar: text({ db: { isNullable: true } }),
      pronouns: text({ db: { isNullable: true } }),
      bio: text({ db: { isNullable: true } }),
      postcode: text({ db: { isNullable: true } }),
      website: text({ db: { isNullable: true } }),
      role: relationship({
        ref: "Role.users",
        access: permissions.canManageUsers,
      }),
      memberOf: relationship({
        ref: "Project.members",
        many: true,
      }),
      eventSubs: relationship({
        ref: "Event.subscribers",
        many: true,
      }),
      projectSubs: relationship({
        ref: "Project.subscribers",
        many: true,
      }),
      tagSubs: relationship({
        ref: "Tag.subscribers",
        many: true,
      }),
    },
  }),
  Role: list({
    access: {
      operation: {
        query: ({ session }) => permissions.canManageUsers({ session }),
      },
    },
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
  }),
  Image: list({
    fields: {
      filesize: integer(),
      filename: text(),
      url: text(),
      mimetype: text(),
      description: text(),
    },
  }),
  Project: list({
    fields: {
      name: text({
        validation: {
          isRequired: true,
        },
      }),
      acronym: text({ db: { isNullable: true } }),
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
  }),
  Event: list({
    fields: {
      name: text(),
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
      eventStart: timestamp({
        validation: {
          isRequired: true,
        },
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
  }),
};
