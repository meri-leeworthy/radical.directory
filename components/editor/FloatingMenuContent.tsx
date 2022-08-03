import { Editor } from "@tiptap/react";
import { MouseEventHandler, RefObject } from "react";
import { FiChevronsDown, FiChevronsUp, FiList } from "react-icons/fi";
import { FloatingMenu } from "./extensions/FloatingMenu";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Fragment } from "prosemirror-model";

type Props = {
  editor: Editor;
  editorBox: RefObject<HTMLDivElement>;
};
declare type Level = 1 | 2 | 3 | 4 | 5 | 6;

const StyledFloatingMenu = ({ editor, editorBox }: Props) => {
  const incHLevel = (oldLevel: number) => {
    switch (oldLevel) {
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
        return 4;
      case 6:
        return 5;
      default:
        return 2;
    }
  };

  // const sameLevel = (old: number) => {
  //   switch (old) {
  //     case 3:
  //       return 3;
  //     case 4:
  //       return 4;
  //     case 5:
  //       return 5;
  //     case 6:
  //       return 6;
  //     default:
  //       return 2;
  //   }
  // };

  const decHLevel = (oldLevel: number) => {
    switch (oldLevel) {
      case 2:
        return 3;
      case 3:
        return 4;
      case 4:
        return 5;
      case 5:
        return 6;
      default:
        return 6;
    }
  };

  // allowed heading levels: [2, 3, 4, 5, 6]
  const headingLevel: Level = editor.getAttributes("heading").level || 0;

  type Schema = typeof editor.schema;

  const findPrevHeading = () => {
    const initSelection = editor.state.selection;
    // @ts-ignore: content needs type annotations
    const { content }: Fragment<Schema> = editor.state.doc.content;
    let prevHeading = 0;
    let tally = 0;

    console.log("content", content);

    //where in the document, by character number, does this heading start
    const thisHeadingPos =
      initSelection.$anchor.pos - initSelection.$anchor.parentOffset;

    content.every((node: any) => {
      //
      tally += node.content.size;
      if (tally > thisHeadingPos) return false;
      if (node.type.name === "heading") prevHeading = node.attrs.level;
      return true;
    });

    // @ts-ignore
    // content.forEach((node) => console.log(node));

    // for (let node in content) {
    //   console.log("node", node);
    //   // tally += node.content.size;
    //   // if (tally > thisHeadingPos) break;
    //   // if (node.type.name === "heading") prevHeading = node.attrs.level;
    // }

    console.log("prevHeading", prevHeading);

    return prevHeading;
  };

  const prevHeading = findPrevHeading();

  const incrementHeading: MouseEventHandler<HTMLButtonElement> = () => {
    const decideHeading = () => {
      if (!headingLevel) return prevHeading ? decHLevel(prevHeading) : 2;
      else if (headingLevel === 2) return 2;
      else return incHLevel(headingLevel);
    };

    const decidedHeading = decideHeading();

    //turn off bullet list to allow turning into heading
    editor.isActive("bulletList") &&
      editor.chain().focus().toggleBulletList().run();

    editor.chain().focus().toggleHeading({ level: decidedHeading }).run();
  };

  const decrementHeading: MouseEventHandler<HTMLButtonElement> = () => {
    const decideHeading = () => {
      if (!headingLevel || headingLevel === 6) return 6;
      if ((prevHeading && prevHeading === headingLevel - 1) || !prevHeading)
        return headingLevel;
      else return decHLevel(headingLevel);
    };

    const decidedHeading = decideHeading();

    //to remove heading, call toggleHeading with the same heading level as the block already has
    editor.chain().focus().toggleHeading({ level: decidedHeading }).run();
  };

  return (
    <FloatingMenu
      editor={editor}
      editorBox={editorBox}
      shouldShow={() => true}
      className="floating-menu"
    >
      {/* (Increase) Heading */}
      {!(headingLevel === 2) && (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button id="increment-heading" onClick={(e) => incrementHeading(e)}>
              <FiChevronsUp />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content asChild sideOffset={5} side="top">
            <div className="tooltip">
              <label htmlFor="increment-heading">
                {!!headingLevel && "Increase "}Heading
              </label>
            </div>
          </Tooltip.Content>
        </Tooltip.Root>
      )}
      {/* Decrease or Remove Heading */}
      {!!headingLevel && (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button id="decrement-heading" onClick={(e) => decrementHeading(e)}>
              <FiChevronsDown />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content asChild sideOffset={5} side="top">
            <div className="tooltip">
              <label htmlFor="decrement-heading">
                {headingLevel === 6 ||
                (prevHeading && prevHeading === headingLevel - 1) ||
                !prevHeading
                  ? "Remove "
                  : "Decrease "}{" "}
                Heading
              </label>
            </div>
          </Tooltip.Content>
        </Tooltip.Root>
      )}
      {/* Toggle Bullet List */}
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            id="bullet-list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <FiList />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content asChild sideOffset={5} side="top">
          <div className="tooltip">
            <label htmlFor="bullet-list">
              {editor.isActive("bulletList") && "Remove "}Bullet List
            </label>
          </div>
        </Tooltip.Content>
      </Tooltip.Root>
    </FloatingMenu>
  );
};

export default StyledFloatingMenu;
