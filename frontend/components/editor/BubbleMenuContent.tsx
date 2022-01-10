import { BubbleMenu, Editor } from "@tiptap/react";
import { FiBold, FiItalic } from "react-icons/fi";

type Props = {
  editor: Editor;
};

const StyledBubbleMenu = ({ editor }: Props) => {
  return (
    <BubbleMenu
      editor={editor}
      // tippyOptions={{ placement: "right-end" }}
      className="bubble-menu"
    >
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <FiBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <FiItalic />
      </button>
    </BubbleMenu>
  );
};

export default StyledBubbleMenu;
