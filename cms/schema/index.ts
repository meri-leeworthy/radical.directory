import { list } from "@keystone-next/keystone";
import { text, integer } from "@keystone-next/keystone/fields";
import { User, Role } from "./user";
import { Post } from "./post";
import { Event } from "./event";
import { Project } from "./project";
import { Tag } from "./tag";

// database schema is defined here
export const lists = {
  User,
  Role,
  Post,
  Tag,
  Image: list({
    fields: {
      filesize: integer(),
      filename: text(),
      url: text(),
      mimetype: text(),
      description: text(),
    },
  }),
  Project,
  Event,
};
