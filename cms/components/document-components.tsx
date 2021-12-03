import React from "react";
import {
  component,
  fields,
  NotEditable,
} from "@keystone-6/fields-document/component-blocks";

// naming the export componentBlocks is important because the Admin UI
// expects to find the components like on the componentBlocks export
export const componentBlocks = {
  cloudinaryImage: component({
    component: ({ image }) => {
      const data = image?.value?.data;
      if (!image.value) return <NotEditable>No Image Selected</NotEditable>;
      console.log(image);
      return (
        <NotEditable>
          <img
            src={data?.image?.publicUrlTransformed}
            alt={data?.description}
            style={{ width: "100%" }}
          />
        </NotEditable>
      );
    },
    label: "Image",
    props: {
      image: fields.relationship<"one">({
        label: "Image",
        relationship: "image",
      }),
    },
  }),
};
