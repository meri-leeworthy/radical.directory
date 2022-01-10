import { Editor } from "@tiptap/react";
import { MouseEventHandler, RefObject } from "react";
import { FiChevronsDown, FiChevronsUp, FiList } from "react-icons/fi";
import { FloatingMenu } from "./extensions/FloatingMenu";

type Props = {
  editor: Editor;
  editorBox: RefObject<HTMLDivElement>;
};
declare type Level = 1 | 2 | 3 | 4 | 5 | 6;

const StyledFloatingMenu = ({ editor, editorBox }: Props) => {
  // allowed heading levels: [2, 3, 4, 5, 6]
  const headingLevel: Level = editor.getAttributes("heading").level || 0;
  const findPrevHeading = () => {
    const initSelection = editor.state.selection;
    const thisHeadingPos =
      initSelection.$anchor.pos - initSelection.$anchor.parentOffset;
    const { content }: any = editor.state.doc.content;

    let prevHeading = 0;
    let tally = 0;
    content.every((node: any) => {
      tally += node.content.size;
      if (tally > thisHeadingPos) return false;
      if (node.type.name === "heading") prevHeading = node.attrs.level;
      return true;
    });
    return prevHeading;
  };

  const prevHeading = findPrevHeading();

  const incrementHeading: MouseEventHandler<HTMLButtonElement> = () => {
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

    const sameLevel = (old: number) => {
      switch (old) {
        case 3:
          return 3;
        case 4:
          return 4;
        case 5:
          return 5;
        case 6:
          return 6;
        default:
          return 2;
      }
    };

    const decideHeading = () => {
      if (!headingLevel) return prevHeading ? sameLevel(prevHeading) : 2;
      else if (headingLevel === 2) return 2;
      else return incHLevel(headingLevel);
    };

    const decidedHeading = decideHeading();

    editor.chain().focus().toggleHeading({ level: decidedHeading }).run();
  };

  const decrementHeading: MouseEventHandler<HTMLButtonElement> = () => {
    // chevron-down:
    //
    // if !isActive("heading")
    //    disabled
    // if isActive("heading", {level:z})
    //    if z = 6
    //        set !heading
    //    else if prev heading {level: y}
    //        if y = z - 1
    //            set !heading
    //        else set level z + 1
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

    const decideHeading = () => {
      if (!headingLevel || headingLevel === 6) return 6;
      if (prevHeading && prevHeading === headingLevel - 1) return headingLevel;
      else return decHLevel(headingLevel);
    };

    const decidedHeading = decideHeading();
    console.log(headingLevel, decidedHeading);

    editor.chain().focus().toggleHeading({ level: decidedHeading }).run();
  };

  return (
    <FloatingMenu
      editor={editor}
      editorBox={editorBox}
      shouldShow={() => true} //({ editor, view, state, oldState }) => {
      // show the floating within any paragraph
      // return editor.isActive("paragraph"); }
      // tippyOptions={{ }}
      className="floating-menu"
    >
      {!(headingLevel === 2) && (
        <button
          onClick={(e) => incrementHeading(e)}
          // className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        >
          <FiChevronsUp />
        </button>
      )}
      {!!headingLevel && (
        <button
          onClick={(e) => decrementHeading(e)}
          // className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        >
          <FiChevronsDown />
        </button>
      )}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        // className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <FiList />
      </button>
    </FloatingMenu>
  );
};

export default StyledFloatingMenu;
