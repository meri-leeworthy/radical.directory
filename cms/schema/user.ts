import { list } from "@keystone-6/core";
import {
  text,
  password,
  relationship,
  checkbox,
} from "@keystone-6/core/fields";
import { rules, permissions } from "./access";
// import { defaultSlug } from "./utils";
import { Lists } from ".keystone/types";

export const User: Lists.User = list({
  access: {
    operation: {
      create: () => true,
    },
    filter: {
      query: () => true, //anyone can see email addresses rn
      update: rules.canManageUserList,
      delete: rules.canManageUserList,
    },
    item: {
      update: rules.canManageUser,
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
    // idSlug: text({
    //   ui: { createView: { fieldMode: "hidden" } },
    //   isIndexed: "unique",
    //   hooks: {
    //     resolveInput: ({ operation, resolvedData, inputData, context }) => {
    //       if (operation === "create" && !inputData.idSlug) {
    //         return defaultSlug({ context, inputData });
    //       }
    //       return resolvedData.idSlug || null;
    //     },
    //   },
    // }),
  },
});

export const Role = list({
  access: {
    operation: {
      query: ({ session }) => permissions.canManageUsers({ session }), // () => true,
      create: ({ session }) => permissions.canManageUsers({ session }),
      update: ({ session }) => permissions.canManageUsers({ session }),
      delete: ({ session }) => permissions.canManageUsers({ session }),
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
  hooks: {
    resolveInput: (maybeContext) => {
      console.log(maybeContext);
      return maybeContext.resolvedData;
    },
  },
});
