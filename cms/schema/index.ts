import { list } from "@keystone-next/keystone";
import { text, integer } from "@keystone-next/keystone/fields";
import { cloudinaryImage } from "@keystone-next/cloudinary";
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
      image: cloudinaryImage({
        cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
          apiKey: process.env.CLOUDINARY_API_KEY || "",
          apiSecret: process.env.CLOUDINARY_API_SECRET || "",
          folder: process.env.CLOUDINARY_API_FOLDER,
        },
      }),
      //Image descriptions are required for all images
      description: text({
        validation: {
          isRequired: true,
        },
      }),
    },
    ui: {
      labelField: "description",
    },
  }),
  Project,
  Event,
};
