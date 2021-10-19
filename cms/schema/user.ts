import { list } from "@keystone-next/keystone";
import {
  text,
  password,
  relationship,
  checkbox,
} from "@keystone-next/keystone/fields";
import { rules } from "./access";

export const User = list({
  access: {
    operation: {
      create: () => true,
    },
    filter: {
      query: () => true,
      // update: rules.canManageUserList,
      delete: rules.canManageUserList,
    },
  },
  ui: {
    // hideCreate: (context) => !permissions.canManageUsers(context),
    // hideDelete: (context) => !permissions.canManageUsers(context),
    // itemView: {
    //   defaultFieldMode: (context) =>
    //     permissions.canManageUsers(context) ? "edit" : "hidden",
    // },
    // listView: {
    //   initialColumns: ["name", "posts"],
    //   defaultFieldMode: (context) =>
    //     permissions.canManageUsers(context) ? "read" : "hidden",
    // },
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
      // access: permissions.canManageUsers,
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
});

export const Role = list({
  access: {
    operation: {
      query: () => true, // ({ session }) => permissions.canManageUsers({ session }),
    },
  },
  ui: {
    isHidden: false, //(context) => !permissions.canManageUsers(context),
  },
  fields: {
    name: text(),
    canManageContent: checkbox({ defaultValue: false }),
    canManageUsers: checkbox({ defaultValue: false }),
    users: relationship({ ref: "User.role", many: true }),
  },
});
